

import { NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

type PlanType = "FREE" | "BASIC" | "PREMIUM"; 

export async function POST(req: Request) {
  try {
    // 1. Authentication
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Input Validation
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification data" },
        { status: 400 }
      );
    }

    // 3. Signature Verification
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // 4. Fetch Order Details
    const order = await razorpay.orders.fetch(razorpay_order_id);
    const plan = order.notes?.plan as PlanType | undefined;
    
    if (!plan || !["BASIC", "PREMIUM"].includes(plan)) {
      return NextResponse.json(
        { error: "Invalid or missing plan in payment data" },
        { status: 400 }
      );
    }

    // 5. Database Updates
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    await prisma.$transaction([
      // Update payment record
      prisma.payment.updateMany({
        where: { 
          orderId: razorpay_order_id,
          status: "pending" // Prevent duplicate processing
        },
        data: {
          status: "success",
          paymentId: razorpay_payment_id,
          updatedAt: new Date(),
        },
      }),
      // Update user account
      prisma.user.update({
        where: { id: user.id },
        data: {
          plan,
          points: {
            increment: plan === "BASIC" ? 500 : 1000, // Credit allocation
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      plan,
      creditsAdded: plan === "BASIC" ? 500 : 1000,
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      {
        error: "Payment verification failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}