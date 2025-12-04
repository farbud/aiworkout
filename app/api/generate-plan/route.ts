import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt =
      body.prompt || "Generate a simple AI workout plan for 7 days";

    const model = "meta-llama/Llama-2-7b-chat-hf";
    const apiUrl = `https://api-inference.huggingface.co/models/${model}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 300 },
      }),
    });

    const data = await response.json();
    console.log("HuggingFace raw response:", data);

    const plan =
      typeof data === "string"
        ? data
        : Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : null;

    if (!plan) {
      console.error("No content returned from HuggingFace", data);
      return NextResponse.json(
        { error: "No content returned from HuggingFace", data },
        { status: 500 }
      );
    }

    return NextResponse.json({ plan });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("HuggingFace error:", err.message);
    return NextResponse.json(
      { error: "fail to generate plan", details: err.message },
      { status: 500 }
    );
  }
}
