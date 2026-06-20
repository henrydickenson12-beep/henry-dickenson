import { NextRequest, NextResponse } from "next/server";

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1].toLowerCase() === b[j - 1].toLowerCase()
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

function similarity(a: string, b: string): number {
  if (!a || !b) return 0;
  const dist = levenshtein(a.trim(), b.trim());
  return 1 - dist / Math.max(a.length, b.length, 1);
}

export async function POST(req: NextRequest) {
  const { imageBase64, studentList } = await req.json() as {
    imageBase64: string;
    studentList: { id: string; name: string; avatar: string }[];
  };

  let recognizedText = "";

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (apiKey) {
    try {
      // Strip data URL prefix if present
      const base64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 32,
          system:
            "You are reading a child's handwritten name from a drawing canvas. " +
            "The writing may be messy, backwards, or incomplete — children aged 5–7 often write this way. " +
            "Look carefully and return ONLY the name you see. No explanation, no punctuation, just the name. " +
            "If you truly cannot read anything, return exactly: UNKNOWN",
          messages: [
            {
              role: "user",
              content: [
                { type: "image", source: { type: "base64", media_type: "image/png", data: base64 } },
                { type: "text", text: "What name has the child written here?" },
              ],
            },
          ],
        }),
      });
      const data = await res.json();
      recognizedText = (data.content?.[0]?.text || "").trim();
    } catch {
      recognizedText = "";
    }
  }

  // Fuzzy-match against student list
  const scored = studentList.map((s) => ({
    ...s,
    score: recognizedText && recognizedText !== "UNKNOWN"
      ? similarity(recognizedText, s.name)
      : 0,
  }));

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  const confident = best && best.score >= 0.55;

  return NextResponse.json({
    recognizedText,
    bestMatch: confident ? best : null,
    confidence: best?.score ?? 0,
    allStudents: scored,
  });
}
