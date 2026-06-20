import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { studentName, subject, weakTopics, strongTopics, recentScores, prompt } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ suggestion: getDemoSuggestion(studentName, subject, weakTopics) });
  }

  const systemPrompt = `You are an educational AI assistant helping teachers and parents identify the best next steps for students.
You analyse student performance data and suggest specific, actionable tasks.
Keep suggestions concise, practical, and age-appropriate.
Respond in JSON with this structure: { "title": "...", "description": "...", "reason": "...", "type": "game|homework|focus", "priority": "high|medium|low" }`;

  const userMessage = prompt || `Student: ${studentName}
Subject: ${subject}
Weak topics: ${weakTopics?.join(", ") || "none identified"}
Strong topics: ${strongTopics?.join(", ") || "none identified"}
Recent scores: ${recentScores?.join(", ") || "no data"}

What is the most important thing this student should work on next?`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || "{}";
    const parsed = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] || "{}");
    return NextResponse.json({ suggestion: parsed });
  } catch {
    return NextResponse.json({ suggestion: getDemoSuggestion(studentName, subject, weakTopics) });
  }
}

function getDemoSuggestion(name: string, subject: string, weakTopics: string[]) {
  return {
    title: `${name}: Focus on ${weakTopics?.[0] || subject}`,
    description: `Assign targeted practice on ${weakTopics?.[0] || subject} to build confidence.`,
    reason: `Based on recent performance data, ${name} would benefit most from reinforcing this area.`,
    type: "game",
    priority: "high",
  };
}
