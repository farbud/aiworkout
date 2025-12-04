import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prompt = body.prompt || "Generate a simple AI workout plan";

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY not set");
      return NextResponse.json(
        { error: "GROQ_API_KEY not set" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.groq.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-mini",
        max_output_tokens: 500,
      }),
    });

    const data = await response.json();
    console.log("Groq raw response:", data);

    const plan = data?.completions?.[0]?.text;

    if (!plan) {
      console.error("No content returned from Groq");
      return NextResponse.json(
        { error: "No content returned from Groq", data },
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
