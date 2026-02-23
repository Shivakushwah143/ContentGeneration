import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { RAZORPAY_PRICES } from "@/app/lib/plans";

const client = new PrismaClient();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

type PlanName = keyof typeof RAZORPAY_PRICES;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan }: { plan: PlanName } = await req.json();

    if (!RAZORPAY_PRICES[plan]) {
      return NextResponse.json(
        { error: "Invalid plan specified" },
        { status: 400 }
      );
    }

    const user = await client.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const order = await razorpay.orders.create({
      amount: RAZORPAY_PRICES[plan],
      currency: "INR",
      notes: {
        userId,
        plan,
      },
    });

    await client.payment.create({
      data: {
        userId: user.id,
        amount: RAZORPAY_PRICES[plan],
        currency: "INR",
        status: "pending",
        provider: "razorpay",
        plan,
        orderId: order.id,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      {
        error: "Payment processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
