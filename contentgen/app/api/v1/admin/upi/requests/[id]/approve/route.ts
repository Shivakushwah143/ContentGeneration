import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@clerk/nextjs/server";
import { requireAdmin } from "@/app/lib/admin";
import { getPlanCredits, type PlanName } from "@/app/lib/plans";

const client = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = await requireAdmin(userId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id: requestId } = await params;

    const paymentRequest = await client.paymentRequest.findUnique({
      where: { id: requestId },
    });
    if (!paymentRequest) {
      return NextResponse.json({ error: "Payment request not found" }, { status: 404 });
    }
    if (paymentRequest.status !== "PENDING") {
      return NextResponse.json(
        { error: "Payment request already processed" },
        { status: 409 }
      );
    }

    const plan = paymentRequest.plan as PlanName;
    const credits = getPlanCredits(plan);
    const now = new Date();
    const next = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    await client.$transaction([
      client.paymentRequest.update({
        where: { id: requestId },
        data: { status: "APPROVED" },
      }),
      client.user.update({
        where: { id: paymentRequest.userId },
        data: {
          plan,
          creditsRemaining: credits,
          subscriptionStartDate: now,
          subscriptionEndDate: next,
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPI approve error:", error);
    return NextResponse.json({ error: "Failed to approve request" }, { status: 500 });
  }
}
