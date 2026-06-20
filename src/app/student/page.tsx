"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getScores, SavedScore, subjectColors, subjectIcons, gameTypeLabel } from "@/lib/scores";

const subjects = [
  { id: "math",      label: "Maths",     icon: "🔢", color: "#1E3888", bg: "#EBF0F9", border: "#B8CCE8" },
  { id: "science",   label: "Science",   icon: "🔬", color: "#47A8BD", bg: "#E8F4F7", border: "#A8D8E8" },
  { id: "english",   label: "English",   icon: "📚", color: "#C27400", bg: "#FFF5E0", border: "#F8D8A8" },
  { id: "history",   label: "History",   icon: "🏛️", color: "#9C3848", bg: "#F5E8EA", border: "#D8B0B8" },
  { id: "geography", label: "Geography", icon: "🌍", color: "#1A6B7A", bg: "#E5F3F6", border: "#A8D0D8" },
];

const achievements = [
  { icon: "⭐", label: "First Game!",  unlocked: true },
  { icon: "🔥", label: "5-Day Streak", unlocked: true },
  { icon: "🎯", label: "Perfect Score",unlocked: true },
  { icon: "🚀", label: "Speed Demon",  unlocked: false },
  { icon: "🏆", label: "Champion",     unlocked: false },
  { icon: "💎", label: "Diamond",      unlocked: false },
];

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function StudentPortal() {
  const [selected, setSelected] = useState<string | null>(null);
  const [recentScores, setRecentScores] = useState<SavedScore[]>([]);

  useEffect(() => {
    setRecentScores(getScores().slice(0, 6));
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-nunito), sans-serif", background: "#F5F8FF" }}>
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(245,248,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E8EEF9" }}>
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">📚</span>
          <span className="text-xl font-black" style={{ color: "#000" }}>
            Teach<span style={{ color: "#1E3888" }}>More</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold" style={{ color: "#1E3888" }}>🔥 5 day streak!</span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ background: "#EBF0F9" }}>🦊</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {!selected && (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-black mb-1" style={{ color: "#000" }}>
                Hey, <span style={{ color: "#1E3888" }}>Oliver! 👋</span>
              </h1>
              <p className="text-lg mb-8" style={{ color: "#666" }}>Ready to learn something amazing today?</p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "⭐", val: String(recentScores.reduce((a, s) => a + s.score, 0) || 42), label: "Stars Earned", color: "#F5E663" },
                  { icon: "🎮", val: String(recentScores.length || 18), label: "Games Played", color: "#47A8BD" },
                  { icon: "🔥", val: "5", label: "Day Streak", color: "#FFAD69" },
                ].map((s) => (
                  <motion.div key={s.label} whileHover={{ scale: 1.04 }}
                    className="text-center p-4 rounded-2xl"
                    style={{ background: "white", boxShadow: "0 4px 16px rgba(30,56,136,0.07)" }}>
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-3xl font-black" style={{ color: "#1E3888" }}>{s.val}</div>
                    <div className="text-xs font-semibold" style={{ color: "#888" }}>{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Scores */}
            {recentScores.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="mb-8 p-5 rounded-3xl" style={{ background: "white", boxShadow: "0 4px 16px rgba(30,56,136,0.07)" }}>
                <h3 className="font-black mb-4" style={{ color: "#000" }}>🕐 Recent Games</h3>
                <div className="space-y-3">
                  {recentScores.map((s) => (
                    <div key={s.id} className="flex items-center gap-3">
                      <span className="text-2xl">{subjectIcons[s.subject] || "🎮"}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-sm capitalize" style={{ color: subjectColors[s.subject] || "#1E3888" }}>{s.subject}</span>
                          <span className="text-xs" style={{ color: "#888" }}>{gameTypeLabel[s.gameType]}</span>
                          <span className="text-xs ml-auto" style={{ color: "#CCC" }}>{timeAgo(s.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full" style={{ background: "#F0F4F8" }}>
                            <div className="h-full rounded-full transition-all"
                              style={{ width: `${s.pct}%`, background: subjectColors[s.subject] || "#1E3888" }} />
                          </div>
                          <span className="text-xs font-black" style={{ color: subjectColors[s.subject] || "#1E3888" }}>
                            {s.score}/{s.total} · {s.pct}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Choose subject */}
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-2xl font-black mb-4" style={{ color: "#000" }}>
              🎮 Choose a Subject
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {subjects.map((subj, i) => (
                <motion.button key={subj.id}
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(subj.id)}
                  className="p-6 rounded-3xl text-left transition-all cursor-pointer"
                  style={{ background: subj.bg, border: `2px solid ${subj.border}`, boxShadow: "0 4px 16px rgba(30,56,136,0.06)" }}>
                  <div className="text-5xl mb-3">{subj.icon}</div>
                  <div className="text-lg font-black" style={{ color: subj.color }}>{subj.label}</div>
                  <div className="text-xs font-semibold mt-1" style={{ color: "#888" }}>Tap to play</div>
                </motion.button>
              ))}
            </div>

            {/* Achievements */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h2 className="text-2xl font-black mb-4" style={{ color: "#000" }}>🏆 My Achievements</h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {achievements.map((a) => (
                  <motion.div key={a.label} whileHover={{ scale: 1.1 }}
                    className="text-center p-4 rounded-2xl"
                    style={{ background: a.unlocked ? "white" : "#F1F5F9", boxShadow: a.unlocked ? "0 4px 16px rgba(30,56,136,0.08)" : "none", opacity: a.unlocked ? 1 : 0.5 }}>
                    <div className="text-3xl mb-1" style={{ filter: a.unlocked ? "none" : "grayscale(1)" }}>{a.icon}</div>
                    <div className="text-xs font-bold" style={{ color: a.unlocked ? "#1E3888" : "#94A3B8" }}>{a.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* Subject selected */}
        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              {(() => {
                const subj = subjects.find((s) => s.id === selected)!;
                return (
                  <>
                    <button onClick={() => setSelected(null)} className="flex items-center gap-2 font-bold mb-6 transition-opacity hover:opacity-70"
                      style={{ color: "#666" }}>
                      ← Back
                    </button>
                    <div className="text-center mb-8">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}
                        className="text-7xl mb-3">{subj.icon}</motion.div>
                      <h2 className="text-3xl font-black" style={{ color: subj.color }}>{subj.label}</h2>
                      <p className="mt-1" style={{ color: "#888" }}>Pick your difficulty level</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {(["preschool", "primary", "secondary"] as const).map((level, i) => {
                        const labels = {
                          preschool: { label: "Easy 🌱",   desc: "Ages 5–7 — simple and fun",    icon: "🌱" },
                          primary:   { label: "Normal 📖", desc: "Ages 8–11 — core curriculum",   icon: "📖" },
                          secondary: { label: "Hard ⚗️",   desc: "Ages 12–20 — advanced topics",  icon: "⚗️" },
                        };
                        const info = labels[level];
                        return (
                          <motion.div key={level} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <Link href={`/student/game/${subj.id}?level=${level}`}>
                              <motion.div whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.98 }}
                                className="p-8 rounded-3xl cursor-pointer"
                                style={{ background: subj.bg, border: `2px solid ${subj.border}`, boxShadow: "0 4px 20px rgba(30,56,136,0.07)" }}>
                                <div className="text-4xl mb-3">{info.icon}</div>
                                <h3 className="text-xl font-black mb-1" style={{ color: subj.color }}>{info.label}</h3>
                                <p className="text-sm" style={{ color: "#888" }}>{info.desc}</p>
                              </motion.div>
                            </Link>
                          </motion.div>
                        );
                      })}

                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Link href={`/student/game/${subj.id}?level=primary&mode=challenge`}>
                          <motion.div whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.98 }}
                            className="p-8 rounded-3xl cursor-pointer text-white"
                            style={{ background: `linear-gradient(135deg, ${subj.color}CC, ${subj.color})`, boxShadow: `0 8px 32px ${subj.color}40` }}>
                            <div className="text-4xl mb-3">⚡</div>
                            <h3 className="text-xl font-black mb-1">Speed Challenge!</h3>
                            <p className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>Answer as many as you can in 60 seconds</p>
                          </motion.div>
                        </Link>
                      </motion.div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
