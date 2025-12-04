/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "Generate a simple AI workout plan";

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY not set");
      return NextResponse.json(
        { error: "OPENAI_API_KEY not set" },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const plan = completion.choices?.[0]?.message?.content;
    if (!plan) {
      console.error("No content returned from OpenAI");
      return NextResponse.json(
        { error: "No conttent returned from OpenAI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ plan });
  } catch (err: any) {
    console.error("OpenAI error:", err.message);
    return NextResponse.json(
      { error: "fail to generate plan", details: err.message },
      { status: 500 }
    );
  }
}
