import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { codeChanges } = await request.json();

    if (!codeChanges) {
      return NextResponse.json(
        { error: "Code changes are required" },
        { status: 400 }
      );
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that generates professional git commit messages following conventional commits format. Always start with a type (feat, fix, docs, style, refactor, test, chore) followed by a colon and a concise description. Keep it under 50 characters for the first line.",
          },
          {
            role: "user",
            content: `Generate a professional git commit message for these code changes:\n\n${codeChanges}\n\nFollow conventional commits format (e.g., "feat: add user authentication" or "fix: resolve login issue"). Be specific and concise.`,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API Error:", error);
      return NextResponse.json(
        { error: "Failed to generate commit message" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const commitMessage =
      data.choices[0]?.message?.content?.trim() || "Error generating message";

    return NextResponse.json({ commitMessage });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
