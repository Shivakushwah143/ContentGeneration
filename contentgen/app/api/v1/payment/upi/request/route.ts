import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@clerk/nextjs/server";
import { UPI_PRICES, type PlanName } from "@/app/lib/plans";

const client = new PrismaClient();

type UpsertPlan = Exclude<PlanName, "FREE">;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as { plan?: UpsertPlan; transactionId?: string };
    const plan = body.plan;
    const transactionId = body.transactionId?.trim();

    if (!plan || !UPI_PRICES[plan]) {
      return NextResponse.json({ error: "Invalid plan specified" }, { status: 400 });
    }

    if (!transactionId || transactionId.length < 6) {
      return NextResponse.json({ error: "Invalid transaction ID" }, { status: 400 });
    }

    const existing = await client.paymentRequest.findUnique({
      where: { transactionId },
    });
    if (existing) {
      return NextResponse.json(
        { error: "This transaction ID is already submitted." },
        { status: 409 }
      );
    }

    const user = await client.user.findUnique({
      where: { clerkId: userId },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const amount = UPI_PRICES[plan];

    const request = await client.paymentRequest.create({
      data: {
        userId: user.id,
        plan,
        amount,
        transactionId,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, requestId: request.id });
  } catch (error) {
    console.error("UPI request error:", error);
    return NextResponse.json(
      { error: "Failed to submit payment request" },
      { status: 500 }
    );
  }
}
