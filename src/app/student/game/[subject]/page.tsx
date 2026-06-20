"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { mathQuestions, scienceQuestions } from "@/lib/gameQuestions";
import { GameQuestion } from "@/lib/types";

const confettiColors = ["#7C3AED", "#F59E0B", "#10B981", "#F43F5E", "#06B6D4"];

function ConfettiPiece({ color, i }: { color: string; i: number }) {
  return (
    <motion.div
      className="fixed w-3 h-3 rounded-sm pointer-events-none"
      style={{ background: color, top: "-20px", left: `${10 + i * 8}%`, zIndex: 9999 }}
      animate={{ y: "110vh", rotate: 720, x: Math.sin(i) * 100 }}
      transition={{ duration: 2 + Math.random(), ease: "easeIn", delay: Math.random() * 0.3 }}
    />
  );
}

const subjectConfig: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  math: { label: "Maths", icon: "🔢", color: "#7C3AED", bg: "#F3F0FF" },
  science: { label: "Science", icon: "🔬", color: "#059669", bg: "#ECFDF5" },
  english: { label: "English", icon: "📚", color: "#D97706", bg: "#FFFBEB" },
  history: { label: "History", icon: "🏛️", color: "#DC2626", bg: "#FFF1F2" },
  geography: { label: "Geography", icon: "🌍", color: "#0891B2", bg: "#ECFEFF" },
};

export default function GamePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const subject = params.subject as string;
  const level = (searchParams.get("level") || "primary") as "preschool" | "primary" | "secondary";
  const isChallenge = searchParams.get("mode") === "challenge";

  const cfg = subjectConfig[subject] || subjectConfig.math;
  const questionsMap = subject === "science" ? scienceQuestions : mathQuestions;
  const allQuestions: GameQuestion[] = questionsMap[level] || questionsMap.primary;

  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState(isChallenge ? 60 : 999);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const finish = useCallback(() => {
    setFinished(true);
    if (score >= Math.floor(questions.length * 0.7)) setShowConfetti(true);
  }, [score, questions.length]);

  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 8);
    setQuestions(shuffled);
  }, [subject, level]);

  useEffect(() => {
    if (!isChallenge || finished) return;
    if (timeLeft <= 0) { finish(); return; }
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [isChallenge, timeLeft, finished, finish]);

  function handleAnswer(opt: string) {
    if (selected || finished) return;
    setSelected(opt);
    setTotalAnswered((p) => p + 1);
    const correct = opt === questions[current]?.correctAnswer;
    if (correct) setScore((p) => p + 1);
    setShowResult(true);

    setTimeout(() => {
      setSelected(null);
      setShowResult(false);
      if (current + 1 >= questions.length) {
        finish();
      } else {
        setCurrent((p) => p + 1);
      }
    }, isChallenge ? 800 : 1500);
  }

  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const q = questions[current];

  if (!q && !finished) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: cfg.bg, fontFamily: "var(--font-nunito)" }}>
        <div className="text-center">
          <div className="text-5xl animate-spin mb-4">⚙️</div>
          <p className="font-bold text-gray-500">Loading game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-nunito), sans-serif", background: cfg.bg }}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
          {confettiColors.flatMap((c, ci) =>
            Array.from({ length: 5 }, (_, i) => <ConfettiPiece key={`${ci}-${i}`} color={c} i={ci * 5 + i} />)
          )}
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(255,248,240,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #F0E8FF" }}>
        <Link href="/student" className="flex items-center gap-2 font-bold text-gray-500 hover:text-gray-800 transition-colors">
          ← Back
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{cfg.icon}</span>
          <span className="font-black text-lg" style={{ color: cfg.color }}>{cfg.label}</span>
        </div>
        <div className="font-black text-lg" style={{ color: cfg.color }}>
          {isChallenge ? (
            <span className={timeLeft <= 10 ? "text-red-500" : ""}>{timeLeft}s ⏱️</span>
          ) : (
            <span>⭐ {score}/{questions.length}</span>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {!finished ? (
          <>
            {/* Progress bar */}
            <div className="w-full h-3 rounded-full bg-white mb-6 overflow-hidden" style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)" }}>
              <motion.div className="h-full rounded-full" style={{ background: cfg.color }}
                animate={{ width: `${((current) / Math.max(questions.length, 1)) * 100}%` }}
                transition={{ duration: 0.4 }} />
            </div>

            <div className="text-center text-sm font-bold text-gray-400 mb-6">
              Question {current + 1} of {questions.length}
              {q && <span className="ml-2 px-2 py-0.5 rounded-full text-xs" style={{ background: cfg.color + "20", color: cfg.color }}>
                {q.topic}
              </span>}
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div key={current}
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}>
                <motion.div className="p-8 rounded-3xl text-center mb-8"
                  style={{ background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
                  <p className="text-2xl font-black leading-relaxed" style={{ color: "#1E1B4B" }}>{q?.question}</p>
                </motion.div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                  {q?.options.map((opt) => {
                    const isCorrect = opt === q.correctAnswer;
                    const isSelected = opt === selected;
                    let bg = "white";
                    let border = "transparent";
                    if (showResult && isCorrect) { bg = "#ECFDF5"; border = "#10B981"; }
                    if (showResult && isSelected && !isCorrect) { bg = "#FFF1F2"; border = "#F43F5E"; }

                    return (
                      <motion.button key={opt}
                        whileHover={!selected ? { scale: 1.03, y: -2 } : {}}
                        whileTap={!selected ? { scale: 0.97 } : {}}
                        onClick={() => handleAnswer(opt)}
                        disabled={!!selected}
                        className="p-5 rounded-2xl font-bold text-left transition-all"
                        style={{ background: bg, border: `2px solid ${border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.06)", color: "#1E1B4B", cursor: selected ? "not-allowed" : "pointer" }}>
                        <span className="text-base">{opt}</span>
                        {showResult && isCorrect && <span className="float-right">✅</span>}
                        {showResult && isSelected && !isCorrect && <span className="float-right">❌</span>}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-6 p-5 rounded-2xl"
                      style={{ background: selected === q?.correctAnswer ? "#ECFDF5" : "#FFF7F0", border: `1px solid ${selected === q?.correctAnswer ? "#A7F3D0" : "#FED7AA"}` }}>
                      <p className="font-bold text-gray-700">💡 {q?.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* Results Screen */
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              className="text-8xl mb-6">
              {pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "💪"}
            </motion.div>
            <h2 className="text-4xl font-black mb-2" style={{ color: "#1E1B4B" }}>
              {pct >= 80 ? "Amazing!" : pct >= 60 ? "Well Done!" : "Keep Going!"}
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              {isChallenge
                ? `You answered ${totalAnswered} questions in 60 seconds!`
                : `You got ${score} out of ${questions.length} right`}
            </p>

            {/* Score circle */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                <motion.circle cx="50" cy="50" r="40" fill="none" stroke={cfg.color} strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: (isChallenge ? Math.min(totalAnswered / 10, 1) : score / questions.length) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ strokeDasharray: "251.2", strokeDashoffset: 0 }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black" style={{ color: cfg.color }}>{isChallenge ? totalAnswered : pct + "%"}</span>
                <span className="text-xs font-bold text-gray-400">{isChallenge ? "answered" : "score"}</span>
              </div>
            </div>

            {/* Stars earned */}
            <div className="flex justify-center gap-2 mb-8">
              {Array.from({ length: 3 }, (_, i) => (
                <motion.span key={i} initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + i * 0.2, type: "spring", stiffness: 300 }}
                  className="text-4xl" style={{ filter: i < Math.ceil(pct / 34) ? "none" : "grayscale(1) opacity(0.3)" }}>⭐</motion.span>
              ))}
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link href={`/student/game/${subject}?level=${level}${isChallenge ? "&mode=challenge" : ""}`}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-2xl text-white font-black text-lg"
                  onClick={() => { setCurrent(0); setScore(0); setFinished(false); setShowConfetti(false); setTimeLeft(60); setTotalAnswered(0); const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 8); setQuestions(shuffled); }}
                  style={{ background: `linear-gradient(135deg, ${cfg.color}CC, ${cfg.color})` }}>
                  🔄 Play Again
                </motion.button>
              </Link>
              <Link href="/student">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 rounded-2xl font-black text-lg border-2"
                  style={{ color: cfg.color, borderColor: cfg.color, background: "white" }}>
                  🏠 Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
