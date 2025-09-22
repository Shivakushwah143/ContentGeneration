
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

type PlanName = "BASIC" | "PREMIUM";
const PLAN_PRICES: Record<PlanName, number> = {
  BASIC: 50000,  // ₹500 in paise
  PREMIUM: 90000 // ₹900 in paise
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan }: { plan: PlanName } = await req.json();

    // Validate plan type
    if (!PLAN_PRICES[plan]) {
      return NextResponse.json(
        { error: "Invalid plan specified" },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await client.user.findUnique({ 
      where: { clerkId: userId } 
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: PLAN_PRICES[plan],
      currency: "INR",
      notes: {
        userId,
        plan,
      },
    });

    // Create payment record in database
    await client.payment.create({
      data: {
        userId: user.id,
        amount: PLAN_PRICES[plan],
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
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}