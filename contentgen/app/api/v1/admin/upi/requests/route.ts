import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { requireAdmin } from "@/app/lib/admin";

const client = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = await requireAdmin(userId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const allowed = ["PENDING", "APPROVED", "REJECTED"] as const;
    const statusFilter = allowed.includes(status as (typeof allowed)[number])
      ? (status as (typeof allowed)[number])
      : null;

    const requests = await client.paymentRequest.findMany({
      where: statusFilter ? { status: statusFilter } : undefined,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error("UPI admin list error:", error);
    return NextResponse.json({ error: "Failed to load requests" }, { status: 500 });
  }
}
