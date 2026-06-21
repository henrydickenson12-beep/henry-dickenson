"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getActivities, BAND_LABELS, ActivityBand } from "@/lib/activities";
import { saveScore } from "@/lib/scores";

interface Props {
  subject: string;
  level: string;
  color: string;
  bg: string;
  onFinish: (score: number, total: number) => void;
}

function normalize(s: string): string {
  return s.toLowerCase().trim().replace(/^the\s+/, "").replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

function isMatch(guess: string, answer: string): boolean {
  const g = normalize(guess), a = normalize(answer);
  if (!g) return false;
  if (g === a) return true;
  return a.length >= 6 && levenshtein(g, a) <= 1; // forgive a typo on longer words
}

export default function VocabularyActivity({ subject, level, color, onFinish }: Props) {
  const clues = useMemo(() => getActivities(subject, "vocabulary"), [subject]);
  const [current, setCurrent] = useState(0);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [state, setState] = useState<"idle" | "correct" | "wrong" | "revealed">("idle");

  const q = clues[current];
  const total = clues.length;
  if (!q) return null;

  function next(scored: number) {
    if (current + 1 >= total) {
      saveScore({ subject, gameType: "vocab", score: scored, total, level });
      onFinish(scored, total);
    } else {
      setCurrent((c) => c + 1);
      setGuess("");
      setAttempts(0);
      setState("idle");
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "correct" || state === "revealed") return;
    if (isMatch(guess, q.vocabAnswer || "")) {
      const newScore = score + 1;
      setScore(newScore);
      setState("correct");
      setTimeout(() => next(newScore), 1100);
    } else {
      setAttempts((a) => a + 1);
      setState("wrong");
    }
  }

  function reveal() {
    setState("revealed");
    setTimeout(() => next(score), 1400);
  }

  const showHint = attempts >= 2 && state === "wrong";
  const answer = q.vocabAnswer || "";
  const hint = answer.replace(/[a-zA-Z]/g, (ch, i) => (i === 0 ? ch : "_")) + ` (${answer.replace(/\s/g, "").length} letters)`;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1 h-2 rounded-full" style={{ background: "#E5E7EB" }}>
          <motion.div className="h-full rounded-full" style={{ background: color }}
            animate={{ width: `${(current / total) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
        <div className="text-sm font-black" style={{ color }}>{current + 1}/{total}</div>
      </div>
      <p className="text-center text-xs font-bold mb-6" style={{ color: "#94A3B8" }}>
        🕵️ {BAND_LABELS[q.ageBand as ActivityBand]} · score {score}
      </p>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
          {/* Clue */}
          <div className="p-7 rounded-3xl text-center mb-5" style={{ background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
            <div className="text-xs font-black mb-3 px-3 py-1 rounded-full inline-block" style={{ background: color + "15", color }}>
              What word is this?
            </div>
            <p className="text-xl font-black leading-relaxed" style={{ color: "#1E1B4B" }}>{q.instructions}</p>
          </div>

          {/* Input */}
          <motion.form onSubmit={submit}
            animate={state === "wrong" ? { x: [-8, 8, -8, 6, -4, 0] } : { x: 0 }} transition={{ duration: 0.4 }}>
            <input
              autoFocus value={guess}
              onChange={(e) => { setGuess(e.target.value); if (state === "wrong") setState("idle"); }}
              disabled={state === "correct" || state === "revealed"}
              placeholder="Type your answer…"
              className="w-full px-5 py-4 rounded-2xl text-lg font-bold outline-none text-center"
              style={{
                background: "white", color: "#1E1B4B",
                border: `2px solid ${state === "correct" ? "#10B981" : state === "wrong" ? "#F43F5E" : color + "40"}`,
              }} />

            <AnimatePresence>
              {state === "correct" && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-3 font-black" style={{ color: "#10B981" }}>
                  ✅ Correct! It&apos;s “{answer}”
                </motion.p>
              )}
              {state === "revealed" && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-3 font-black" style={{ color: color }}>
                  The answer was “{answer}”
                </motion.p>
              )}
              {state === "wrong" && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-3 font-bold" style={{ color: "#F43F5E" }}>
                  Not quite — try again!{showHint && <span className="block mt-1 font-mono text-sm" style={{ color: "#64748B" }}>Hint: {hint}</span>}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex gap-3 mt-5">
              <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                disabled={state === "correct" || state === "revealed" || !guess.trim()}
                className="flex-1 py-3.5 rounded-2xl text-white font-black text-lg"
                style={{ background: color, opacity: !guess.trim() ? 0.5 : 1 }}>
                Check
              </motion.button>
              {attempts >= 1 && state !== "correct" && (
                <motion.button type="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={reveal}
                  className="px-5 py-3.5 rounded-2xl font-black border-2"
                  style={{ color, borderColor: color, background: "white" }}>
                  Reveal
                </motion.button>
              )}
            </div>
          </motion.form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
