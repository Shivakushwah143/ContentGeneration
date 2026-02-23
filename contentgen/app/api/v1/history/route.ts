import { PrismaClient, type Content, type User } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getPlanCredits, type PlanName } from "@/app/lib/plans";
import clerk from "@clerk/clerk-sdk-node";

const client = new PrismaClient();

type UserWithContents = User & { contents: Content[] };

async function ensureCreditsCurrent(user: UserWithContents) {
  const now = new Date();
  if (user.subscriptionEndDate && now <= user.subscriptionEndDate) {
    return user;
  }

  const newStart = now;
  const newEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const credits = getPlanCredits(user.plan as PlanName);

  return client.user.update({
    where: { id: user.id },
    data: {
      subscriptionStartDate: newStart,
      subscriptionEndDate: newEnd,
      creditsRemaining: credits,
    },
    include: { contents: { orderBy: { createdAt: "desc" } } },
  });
}

async function getOrCreateUser(clerkId: string) {
  let user = await client.user.findUnique({
    where: { clerkId },
    include: { contents: { orderBy: { createdAt: "desc" } } },
  });

  if (user) return user;

  const userObj = await clerk.users.getUser(clerkId);
  const email = userObj.emailAddresses[0]?.emailAddress;
  if (!email) {
    return null;
  }

  const now = new Date();
  const end = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  user = await client.user.create({
    data: {
      clerkId,
      email,
      plan: "FREE",
      creditsRemaining: 50,
      subscriptionStartDate: now,
      subscriptionEndDate: end,
    },
    include: { contents: { orderBy: { createdAt: "desc" } } },
  });

  return user;
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    let user = await getOrCreateUser(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    user = await ensureCreditsCurrent(user as UserWithContents);
    // console.log(user.contents);
    return NextResponse.json({
      content: user.contents,
      remainingPoints: user.creditsRemaining,
      plan: user.plan,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
