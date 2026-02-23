import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { auth } from "@clerk/nextjs/server";
import { requireAdmin } from "@/app/lib/admin";

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

    await client.paymentRequest.update({
      where: { id: requestId },
      data: { status: "REJECTED" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPI reject error:", error);
    return NextResponse.json({ error: "Failed to reject request" }, { status: 500 });
  }
}
