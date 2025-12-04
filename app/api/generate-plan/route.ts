import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "Generate a simple AI workout plan";

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not set");
      return NextResponse.json(
        { error: "GEMINI_API_KEY not set" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const plan = result.response.text();

    if (!plan) {
      console.error("No content returned from Gemini");
      return NextResponse.json(
        { error: "No content returned from Gemini" },
        { status: 500 }
      );
    }

    return NextResponse.json({ plan });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Gemini error:", err.message);
    return NextResponse.json(
      { error: "fail to generate plan", details: err.message },
      { status: 500 }
    );
  }
}
