"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTFQuestions, TFQuestion } from "@/lib/gameQuestions";
import { saveScore } from "@/lib/scores";

interface Props {
  subject: string;
  level: string;
  color: string;
  bg: string;
  onFinish: (score: number, total: number) => void;
}

export default function TrueFalseGame({ subject, level, color, bg, onFinish }: Props) {
  const allQ = getTFQuestions(subject, level);
  const [questions] = useState<TFQuestion[]>(() => [...allQ].sort(() => Math.random() - 0.5));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(8);
  const [combo, setCombo] = useState(0);

  const q = questions[current];
  const total = questions.length;

  const advance = useCallback((wasCorrect: boolean) => {
    setCombo((c) => wasCorrect ? c + 1 : 0);
    setTimeout(() => {
      setResult(null);
      if (current + 1 >= total) {
        setFinished(true);
        saveScore({ subject, gameType: "tf", score: wasCorrect ? score + 1 : score, total, level });
        onFinish(wasCorrect ? score + 1 : score, total);
      } else {
        setCurrent((c) => c + 1);
        setTimeLeft(8);
      }
    }, 900);
  }, [current, total, score, subject, level, onFinish]);

  // Timer
  useEffect(() => {
    if (finished || result) return;
    if (timeLeft <= 0) {
      setResult("wrong");
      advance(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, finished, result, advance]);

  function answer(val: boolean) {
    if (result || finished) return;
    const correct = val === q.answer;
    if (correct) setScore((s) => s + 1);
    setResult(correct ? "correct" : "wrong");
    advance(correct);
  }

  const pct = Math.round((score / total) * 100);

  if (finished) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 max-w-md mx-auto">
        <div className="text-7xl mb-4">{pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "💪"}</div>
        <h2 className="text-3xl font-black mb-2" style={{ color }}>
          {pct >= 80 ? "Incredible!" : pct >= 60 ? "Well Done!" : "Keep Trying!"}
        </h2>
        <p className="text-gray-500 text-lg mb-6">You got {score} out of {total} correct!</p>
        <div className="text-6xl font-black mb-2" style={{ color }}>{pct}%</div>
      </motion.div>
    );
  }

  const timerPct = (timeLeft / 8) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress + timer */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 rounded-full" style={{ background: "#E5E7EB" }}>
          <motion.div className="h-full rounded-full" style={{ background: color }}
            animate={{ width: `${((current) / total) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
        <div className="text-sm font-black" style={{ color }}>{current + 1}/{total}</div>
      </div>

      {/* Timer bar */}
      <div className="h-2 rounded-full mb-6 overflow-hidden" style={{ background: "#E5E7EB" }}>
        <motion.div className="h-full rounded-full"
          style={{ background: timeLeft <= 2 ? "#EF4444" : timeLeft <= 4 ? "#F59E0B" : "#10B981" }}
          animate={{ width: `${timerPct}%` }}
          transition={{ duration: 0.9, ease: "linear" }} />
      </div>

      {/* Combo */}
      <AnimatePresence>
        {combo >= 2 && (
          <motion.div key={combo} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center mb-3">
            <span className="text-lg font-black px-4 py-1.5 rounded-full"
              style={{ background: color + "20", color }}>
              🔥 {combo}x Combo!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={current}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}>
          <div className="p-8 rounded-3xl text-center mb-6"
            style={{ background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
            <div className="text-xs font-black mb-3 px-3 py-1 rounded-full inline-block"
              style={{ background: color + "15", color }}>
              {q?.topic}
            </div>
            <p className="text-xl font-black leading-relaxed" style={{ color: "#1E1B4B" }}>
              {q?.statement}
            </p>
            <div className="mt-4 text-4xl font-black" style={{ color: result === "correct" ? "#10B981" : result === "wrong" ? "#EF4444" : color }}>
              {timeLeft}s
            </div>
          </div>

          {/* True / False */}
          <div className="grid grid-cols-2 gap-4">
            {[true, false].map((val) => (
              <motion.button key={String(val)}
                onClick={() => answer(val)}
                disabled={!!result}
                whileHover={!result ? { scale: 1.05, y: -3 } : {}}
                whileTap={!result ? { scale: 0.95 } : {}}
                animate={
                  result
                    ? val === q?.answer
                      ? { scale: [1, 1.1, 1], background: "#ECFDF5" }
                      : { background: "#FFF1F2" }
                    : {}
                }
                transition={{ duration: 0.3 }}
                className="py-6 rounded-2xl font-black text-3xl transition-all"
                style={{
                  background: val ? "#ECFDF5" : "#FFF1F2",
                  border: `3px solid ${val ? "#10B981" : "#F43F5E"}`,
                  color: val ? "#10B981" : "#F43F5E",
                  boxShadow: `0 6px 20px ${val ? "#10B98130" : "#F43F5E30"}`,
                }}>
                {val ? "✅ TRUE" : "❌ FALSE"}
              </motion.button>
            ))}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-4 p-4 rounded-2xl text-center"
                style={{ background: result === "correct" ? "#ECFDF5" : "#FFF1F2", border: `1px solid ${result === "correct" ? "#A7F3D0" : "#FECDD3"}` }}>
                <p className="font-bold text-gray-700 text-sm">
                  {result === "correct" ? "✅ " : "❌ "}
                  {q?.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
