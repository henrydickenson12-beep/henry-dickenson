export interface SavedScore {
  id: string;
  subject: string;
  gameType: "quiz" | "match" | "tf";
  score: number;
  total: number;
  pct: number;
  level: string;
  date: string;
  topic?: string;
}

const KEY = "teachmore_scores";

export function saveScore(s: Omit<SavedScore, "id" | "date" | "pct">): void {
  if (typeof window === "undefined") return;
  const all = getScores();
  const entry: SavedScore = { ...s, id: Date.now().toString(), date: new Date().toISOString(), pct: Math.round((s.score / s.total) * 100) };
  const updated = [entry, ...all].slice(0, 50);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function getScores(): SavedScore[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function clearScores(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export const subjectColors: Record<string, string> = {
  math: "#1E3888",
  science: "#47A8BD",
  english: "#C27400",
  history: "#9C3848",
  geography: "#1A6B7A",
};

export const subjectIcons: Record<string, string> = {
  math: "🔢", science: "🔬", english: "📚", history: "🏛️", geography: "🌍",
};

export const gameTypeLabel: Record<string, string> = {
  quiz: "Quiz", match: "Memory Match", tf: "True/False",
};
