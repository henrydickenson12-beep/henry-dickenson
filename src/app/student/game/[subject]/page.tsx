"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { getQuizQuestions } from "@/lib/gameQuestions";
import { saveScore } from "@/lib/scores";
import { GameQuestion } from "@/lib/types";

const MatchGame = dynamic(() => import("@/components/games/MatchGame"), { ssr: false });
const TrueFalseGame = dynamic(() => import("@/components/games/TrueFalseGame"), { ssr: false });
const VocabularyActivity = dynamic(() => import("@/components/games/VocabularyActivity"), { ssr: false });
const WrittenActivity = dynamic(() => import("@/components/games/WrittenActivity"), { ssr: false });
const VisualActivity = dynamic(() => import("@/components/games/VisualActivity"), { ssr: false });

type GameType = "pick" | "quiz" | "match" | "tf" | "vocab" | "written" | "visual";

const confettiColors = ["#7C3AED", "#F59E0B", "#10B981", "#F43F5E", "#06B6D4"];

function ConfettiPiece({ color, i }: { color: string; i: number }) {
  return (
    <motion.div className="fixed w-3 h-3 rounded-sm pointer-events-none"
      style={{ background: color, top: "-20px", left: `${10 + i * 8}%`, zIndex: 9999 }}
      animate={{ y: "110vh", rotate: 720, x: Math.sin(i) * 100 }}
      transition={{ duration: 2 + Math.random(), ease: "easeIn", delay: Math.random() * 0.3 }} />
  );
}

const subjectConfig: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  math:      { label: "Maths",     icon: "🔢", color: "#1E3888", bg: "#EBF0F9" },
  science:   { label: "Science",   icon: "🔬", color: "#47A8BD", bg: "#E8F4F7" },
  english:   { label: "English",   icon: "📚", color: "#C27400", bg: "#FFF5E0" },
  history:   { label: "History",   icon: "🏛️", color: "#9C3848", bg: "#F5E8EA" },
  geography: { label: "Geography", icon: "🌍", color: "#1A6B7A", bg: "#E5F3F6" },
};

// ─── Quiz Component ────────────────────────────────────────────────────────────
function QuizGame({ subject, level, color, bg, isChallenge, onFinish }: {
  subject: string; level: string; color: string; bg: string; isChallenge: boolean;
  onFinish: (score: number, total: number) => void;
}) {
  const allQuestions = getQuizQuestions(subject, level);
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(isChallenge ? 60 : 999);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const finish = useCallback((finalScore: number, finalTotal: number) => {
    setFinished(true);
    saveScore({ subject, gameType: "quiz", score: finalScore, total: finalTotal, level });
    onFinish(finalScore, finalTotal);
  }, [subject, level, onFinish]);

  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 8);
    setQuestions(shuffled);
  }, [subject, level]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isChallenge || finished) return;
    if (timeLeft <= 0) { finish(score, totalAnswered || 1); return; }
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [isChallenge, timeLeft, finished, finish, score, totalAnswered]);

  function handleAnswer(opt: string) {
    if (selected || finished) return;
    setSelected(opt);
    setTotalAnswered((p) => p + 1);
    const correct = opt === questions[current]?.correctAnswer;
    let newScore = score;
    if (correct) { newScore = score + 1; setScore(newScore); }
    setShowResult(true);

    setTimeout(() => {
      setSelected(null);
      setShowResult(false);
      if (current + 1 >= questions.length) {
        finish(newScore, questions.length);
      } else {
        setCurrent((p) => p + 1);
      }
    }, isChallenge ? 800 : 1500);
  }

  const q = questions[current];
  if (!q) return null;

  return (
    <>
      {/* Progress bar */}
      <div className="w-full h-3 rounded-full bg-white mb-6 overflow-hidden" style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)" }}>
        <motion.div className="h-full rounded-full" style={{ background: color }}
          animate={{ width: `${(current / Math.max(questions.length, 1)) * 100}%` }}
          transition={{ duration: 0.4 }} />
      </div>

      <div className="text-center text-sm font-bold text-gray-400 mb-6">
        Question {current + 1} of {questions.length}
        {q && <span className="ml-2 px-2 py-0.5 rounded-full text-xs" style={{ background: color + "20", color }}>{q.topic}</span>}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current}
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}>
          <motion.div className="p-8 rounded-3xl text-center mb-8"
            style={{ background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
            <p className="text-2xl font-black leading-relaxed" style={{ color: "#1E1B4B" }}>{q?.question}</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {q?.options.map((opt) => {
              const isCorrect = opt === q.correctAnswer;
              const isSelected = opt === selected;
              let bgC = "white", border = "transparent";
              if (showResult && isCorrect) { bgC = "#ECFDF5"; border = "#10B981"; }
              if (showResult && isSelected && !isCorrect) { bgC = "#FFF1F2"; border = "#F43F5E"; }
              return (
                <motion.button key={opt}
                  whileHover={!selected ? { scale: 1.03, y: -2 } : {}}
                  whileTap={!selected ? { scale: 0.97 } : {}}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selected}
                  className="p-5 rounded-2xl font-bold text-left transition-all"
                  style={{ background: bgC, border: `2px solid ${border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.06)", color: "#1E1B4B", cursor: selected ? "not-allowed" : "pointer" }}>
                  <span className="text-base">{opt}</span>
                  {showResult && isCorrect && <span className="float-right">✅</span>}
                  {showResult && isSelected && !isCorrect && <span className="float-right">❌</span>}
                </motion.button>
              );
            })}
          </div>

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
  );
}

// ─── Results Screen ────────────────────────────────────────────────────────────
function ResultsScreen({ score, total, color, cfg, onReplay }: {
  score: number; total: number; color: string;
  cfg: { label: string; icon: string; color: string; bg: string };
  onReplay: () => void;
}) {
  const pct = total ? Math.round((score / total) * 100) : 0;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        className="text-8xl mb-6">
        {pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "💪"}
      </motion.div>
      <h2 className="text-4xl font-black mb-2" style={{ color: "#1E1B4B" }}>
        {pct >= 80 ? "Amazing!" : pct >= 60 ? "Well Done!" : "Keep Going!"}
      </h2>
      <p className="text-gray-500 text-lg mb-8">You got {score} out of {total} right</p>

      <div className="relative w-40 h-40 mx-auto mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="8" />
          <motion.circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: score / total }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ strokeDasharray: "251.2", strokeDashoffset: 0 }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black" style={{ color }}>{pct}%</span>
          <span className="text-xs font-bold text-gray-400">score</span>
        </div>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: 3 }, (_, i) => (
          <motion.span key={i} initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5 + i * 0.2, type: "spring", stiffness: 300 }}
            className="text-4xl" style={{ filter: i < Math.ceil(pct / 34) ? "none" : "grayscale(1) opacity(0.3)" }}>⭐</motion.span>
        ))}
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          onClick={onReplay}
          className="px-8 py-4 rounded-2xl text-white font-black text-lg"
          style={{ background: `linear-gradient(135deg, ${color}CC, ${color})` }}>
          🔄 Play Again
        </motion.button>
        <Link href="/student">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-2xl font-black text-lg border-2"
            style={{ color, borderColor: color, background: "white" }}>
            🏠 Home
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Game Type Picker ──────────────────────────────────────────────────────────
function GamePicker({ cfg, level, onPick }: {
  cfg: { label: string; icon: string; color: string; bg: string };
  level: string;
  onPick: (g: GameType) => void;
}) {
  const types = [
    { id: "quiz" as GameType, icon: "❓", label: "Quiz", desc: "Answer multiple-choice questions" },
    { id: "vocab" as GameType, icon: "🔤", label: "Word Detective", desc: "Guess the word from its description" },
    { id: "written" as GameType, icon: "✍️", label: "Writing Challenge", desc: "Read the prompt and write your answer" },
    { id: "visual" as GameType, icon: "🎨", label: "Drawing Task", desc: "Draw and create on the canvas" },
    { id: "match" as GameType, icon: "🃏", label: "Memory Match", desc: "Flip cards to find matching pairs" },
    { id: "tf" as GameType, icon: "⚡", label: "True or False", desc: "Race against the clock — True or False?" },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="text-center mb-8">
        <div className="text-7xl mb-3">{cfg.icon}</div>
        <h2 className="text-3xl font-black mb-1" style={{ color: cfg.color }}>{cfg.label}</h2>
        <p className="text-gray-400">Level: {level.charAt(0).toUpperCase() + level.slice(1)}</p>
      </div>
      <h3 className="text-xl font-black text-center mb-5" style={{ color: "#1E1B4B" }}>Pick a Game Type</h3>
      <div className="space-y-4">
        {types.map((t, i) => (
          <motion.button key={t.id}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.03, x: 6 }} whileTap={{ scale: 0.97 }}
            onClick={() => onPick(t.id)}
            className="w-full p-6 rounded-3xl text-left flex items-center gap-5 transition-all"
            style={{ background: "white", border: `2px solid ${cfg.color}30`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <span className="text-4xl">{t.icon}</span>
            <div>
              <p className="font-black text-lg" style={{ color: "#1E1B4B" }}>{t.label}</p>
              <p className="text-sm text-gray-400">{t.desc}</p>
            </div>
            <span className="ml-auto text-xl" style={{ color: cfg.color }}>→</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
function GamePageInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const subject = params.subject as string;
  const level = (searchParams.get("level") || "primary") as "preschool" | "primary" | "secondary";
  const isChallenge = searchParams.get("mode") === "challenge";

  const cfg = subjectConfig[subject] || subjectConfig.math;
  const [gameType, setGameType] = useState<GameType>(isChallenge ? "quiz" : "pick");
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  function handleFinish(score: number, total: number) {
    setFinalScore(score);
    setFinalTotal(total);
    setFinished(true);
    if (score / total >= 0.7) setShowConfetti(true);
  }

  function replay() {
    setFinished(false);
    setShowConfetti(false);
    setGameKey((k) => k + 1);
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
        <div className="flex items-center gap-2 font-bold text-gray-500 hover:text-gray-800 transition-colors">
          {gameType !== "pick" && !finished
            ? <button onClick={() => setGameType("pick")} className="cursor-pointer font-bold text-gray-500 hover:text-gray-800">← Pick Game</button>
            : <Link href="/student">← Back</Link>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{cfg.icon}</span>
          <span className="font-black text-lg" style={{ color: cfg.color }}>{cfg.label}</span>
        </div>
        <div className="w-20" />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {finished ? (
          <ResultsScreen score={finalScore} total={finalTotal} color={cfg.color} cfg={cfg} onReplay={replay} />
        ) : gameType === "pick" ? (
          <GamePicker cfg={cfg} level={level} onPick={setGameType} />
        ) : gameType === "quiz" ? (
          <QuizGame key={gameKey} subject={subject} level={level} color={cfg.color} bg={cfg.bg} isChallenge={isChallenge} onFinish={handleFinish} />
        ) : gameType === "match" ? (
          <MatchGame key={gameKey} subject={subject} level={level} color={cfg.color} bg={cfg.bg} onFinish={handleFinish} />
        ) : gameType === "tf" ? (
          <TrueFalseGame key={gameKey} subject={subject} level={level} color={cfg.color} bg={cfg.bg} onFinish={handleFinish} />
        ) : gameType === "vocab" ? (
          <VocabularyActivity key={gameKey} subject={subject} level={level} color={cfg.color} bg={cfg.bg} onFinish={handleFinish} />
        ) : gameType === "written" ? (
          <WrittenActivity key={gameKey} subject={subject} level={level} color={cfg.color} bg={cfg.bg} onFinish={handleFinish} />
        ) : gameType === "visual" ? (
          <VisualActivity key={gameKey} subject={subject} level={level} color={cfg.color} bg={cfg.bg} onFinish={handleFinish} />
        ) : null}
      </div>
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FFF8F0" }}>
        <div className="text-center"><div className="text-5xl animate-spin mb-4">⚙️</div><p className="font-bold text-gray-500">Loading...</p></div>
      </div>
    }>
      <GamePageInner />
    </Suspense>
  );
}
