import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { gender, age, height, weight, goal, level, equipment, days } = body;

    const prompt = `
You are a professional fitness coach & nutrition expert.
Generate a weekly workout & nutrition plan in STRICT JSON ONLY.
User profile:
- Gender: ${gender}
- Age: ${age}
- Height: ${height} cm
- Weight: ${weight} kg
- Goal: ${goal}
- Level: ${level}
- Equipment: ${equipment.join(", ")}
- Days per week: ${days}

Return JSON ONLY with days, workout, nutrition, weekly_summary, general_tips
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const data = completion.choices[0].message.content;
    return NextResponse.json(JSON.parse(data!));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate plan." },
      { status: 500 }
    );
  }
}
