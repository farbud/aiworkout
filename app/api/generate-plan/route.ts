import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "Generate a simple AI workout plan";

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY not set");
      return NextResponse.json(
        { error: "GROQ_API_KEY not set" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-70b-versatile",
          messages: [
            { role: "system", content: "You are an expert fitness coach AI." },
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    const data = await response.json();
    const plan = data?.choices?.[0]?.message?.content;

    if (!plan) {
      console.error("No content returned from Groq");
      return NextResponse.json(
        { error: "No content returned from Groq" },
        { status: 500 }
      );
    }

    return NextResponse.json({ plan });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Groq error:", err.message);
    return NextResponse.json(
      { error: "fail to generate plan", details: err.message },
      { status: 500 }
    );
  }
}
