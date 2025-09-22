import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    const user = await client.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: { contents: { orderBy: { createdAt: "desc" } } },
    });
    console.log(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // console.log(user.contents);
    return NextResponse.json({
      content: user.contents,
      remainingPoints: user.points 
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
