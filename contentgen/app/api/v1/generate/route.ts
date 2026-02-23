

import { PrismaClient, type Content, type User } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import dotenv from "dotenv";
import {
  buildSystemPrompt,
  formatStructureStyle,
  pickStructure,
  type RecentSample,
  type ToneMode,
} from "@/app/lib/prompt";
import clerk from "@clerk/clerk-sdk-node";
import { getPlanCredits, type PlanName } from "@/app/lib/plans";
dotenv.config();

const client = new PrismaClient();
const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_MODEL = "deepseek-chat";
const DEEPSEEK_TIMEOUT_MS = 30000;

async function getUser(email: string, clerkId?: string) {
  let user = await client.user.findUnique({ where: { email } });

  if (!user && clerkId) {
    user = await client.user.findUnique({ where: { clerkId } });
  }

  if (!user) {
    try {
      user = await client.user.create({
        data: {
          email,
          clerkId: clerkId || "",
          creditsRemaining: 50,
          plan: "FREE",
          subscriptionStartDate: new Date(),
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    } catch (e) {
      console.error("User creation error:", e);
      user =
        (await client.user.findUnique({ where: { email } })) ||
        (await client.user.findUnique({ where: { clerkId: clerkId || "" } }));
    }
  }

  return user;
}

async function ensureCreditsCurrent(user: User) {
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
  });
}

type DeepSeekMessage = { role: "system" | "user"; content: string };
type DeepSeekResponse = {
  choices: Array<{ message: { content: string } }>;
};

async function getContent(systemPrompt: string, userPrompt: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEEPSEEK_TIMEOUT_MS);

  try {
    const response = await fetch(DEEPSEEK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        temperature: 0.8,
        max_tokens: 800,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ] as DeepSeekMessage[],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DeepSeek error: ${response.status} ${errorText}`);
    }

    const data = (await response.json()) as DeepSeekResponse;
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("DeepSeek error: empty response");
    }
    return content;
  } finally {
    clearTimeout(timeoutId);
  }
}

function extractLines(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function buildRecentSamples(contents: Content[]): RecentSample[] {
  return contents.map((content) => {
    const lines = extractLines(content.content || "");
    const hook = lines[0] ?? "";
    const cta = lines.length > 1 ? lines[lines.length - 1] : "";
    return {
      hook,
      cta,
      style: content.style ?? null,
    };
  });
}

function parseStyleTokens(styles: Array<string | null | undefined>) {
  const tokens: string[] = [];
  for (const style of styles) {
    if (!style) continue;
    const parts = style.split(";").map((part) => part.trim());
    for (const part of parts) {
      const value = part.split("=")[1];
      if (value) tokens.push(value);
    }
  }
  return tokens;
}

function isToneMode(value: unknown): value is ToneMode {
  return (
    value === "friendly" ||
    value === "confident" ||
    value === "premium" ||
    value === "local-business" ||
    value === "casual" ||
    value === "persuasive"
  );
}

export async function POST(req: NextRequest) {
  try {
    
    const { userId } = await auth();

    const body = (await req.json()) as {
      prompt?: string;
      platform?: string;
      tone?: ToneMode;
    };
    const prompt = body.prompt?.trim();
    const platform = body.platform?.trim();
    const tone = isToneMode(body.tone) ? body.tone : undefined;

    if (!prompt || !platform) {
      return NextResponse.json(
        { error: "Missing prompt or platform" },
        { status: 400 }
      );
    }
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  

    const userObj = await clerk.users.getUser(userId); 
    const email = userObj.emailAddresses[0]?.emailAddress;
    const clerkId = userObj.id;
    console.log(userObj)
    if (!email) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }
    
    
    console.log(prompt, platform)
    console.log(`your email id ${email}`)
    
    let user = await getUser(email, clerkId);
    if (!user) {
      return NextResponse.json(
        { error: "User account could not be created" },
        { status: 400 }
      );
    }

    user = await ensureCreditsCurrent(user);

    if (user.creditsRemaining <= 0) {
      return NextResponse.json(
        { error: "Not enough credits" },
        { status: 402 }
      );
    }


    const recentContents = await client.content.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const recentSamples = buildRecentSamples(recentContents);
    const recentStyles = parseStyleTokens(recentSamples.map((sample) => sample.style));
    const structure = pickStructure(recentStyles);
    const systemPrompt = buildSystemPrompt({
      platform,
      tone,
      structure,
      recentSamples,
    });

    const userPrompt = `Topic/Prompt: ${prompt}\nTarget platform: ${platform}`;
    const content = await getContent(systemPrompt, userPrompt);

    await client.content.create({
      data: {
        title: prompt,
        platform,
        content,
        userId: user.id,
        tone: tone ?? "conversational professional",
        style: formatStructureStyle(structure),
      },
    });

    // Reduce 1 credit per generation
    const updatedUser = await client.user.update({
      where: { id: user.id },
      data: { creditsRemaining: user.creditsRemaining - 1 },
    });

    
    return NextResponse.json({
      success: true,
      content,
      remainingPoints: updatedUser.creditsRemaining,
      plan: updatedUser.plan,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


