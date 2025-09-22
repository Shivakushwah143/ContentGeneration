

import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { systemPrompt } from "@/app/lib/prompt";
import clerk from "@clerk/clerk-sdk-node";
dotenv.config();

const client = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
          points: 100,
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

async function getContent(userPrompt: string, platform: string) {
  const prompt = `${systemPrompt}prompt: ${userPrompt} platform: ${platform}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function POST(req: NextRequest) {
  try {
    
    const { userId } = await auth();

    const { prompt, platform } = await req.json();
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
    
    const user = await getUser(email, clerkId);
    if (!user) {
      return NextResponse.json(
        { error: "User account could not be created" },
        { status: 400 }
      );
    }

    
    if (user.points <= 0) {
      return NextResponse.json(
        { error: "Not enough points" },
        { status: 402 }
      );
    }


    // Generate content 
    const content = await getContent(prompt, platform);

    await client.content.create({
      data: {
        title: prompt,
        platform,
        content,
        userId: user.id,
      },
    });

    // reduct point from users account
    const updatedUser = await client.user.update({
      where: { id: user.id },
      data: { points: user.points - 10 },
    });

    
    return NextResponse.json({
      success: true,
      content,
      remainingPoints: updatedUser.points,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
