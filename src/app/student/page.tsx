"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const students = [
  { id: "s1", name: "Oliver", avatar: "🦊", ageGroup: "primary", stars: 42, streak: 5 },
  { id: "s2", name: "Lila", avatar: "🦋", ageGroup: "primary", stars: 67, streak: 12 },
  { id: "s3", name: "Noah", avatar: "🐢", ageGroup: "primary", stars: 28, streak: 3 },
  { id: "s6", name: "Maja", avatar: "🐱", ageGroup: "preschool", stars: 15, streak: 7 },
];

const subjects = [
  { id: "math", label: "Maths", icon: "🔢", color: "#7C3AED", bg: "#F3F0FF", border: "#DDD6FE" },
  { id: "science", label: "Science", icon: "🔬", color: "#059669", bg: "#ECFDF5", border: "#A7F3D0" },
  { id: "english", label: "English", icon: "📚", color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
  { id: "history", label: "History", icon: "🏛️", color: "#DC2626", bg: "#FFF1F2", border: "#FECDD3" },
  { id: "geography", label: "Geography", icon: "🌍", color: "#0891B2", bg: "#ECFEFF", border: "#A5F3FC" },
];

const achievements = [
  { icon: "⭐", label: "First Game!", unlocked: true },
  { icon: "🔥", label: "5-Day Streak", unlocked: true },
  { icon: "🎯", label: "Perfect Score", unlocked: true },
  { icon: "🚀", label: "Speed Demon", unlocked: false },
  { icon: "🏆", label: "Champion", unlocked: false },
  { icon: "💎", label: "Diamond", unlocked: false },
];

export default function StudentPortal() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-nunito), sans-serif", background: "#FFF8F0" }}>
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(255,248,240,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #F0E8FF" }}>
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">📚</span>
          <span className="text-xl font-black" style={{ color: "#1E1B4B" }}>
            Teach<span style={{ color: "#7C3AED" }}>More</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-500">🔥 5 day streak!</span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ background: "#EDE9FE" }}>🦊</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Welcome */}
        {!selected && (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-black mb-1" style={{ color: "#1E1B4B" }}>
                Hey, <span style={{ color: "#7C3AED" }}>Oliver! 👋</span>
              </h1>
              <p className="text-gray-500 text-lg mb-8">Ready to learn something amazing today?</p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "⭐", val: "42", label: "Stars Earned" },
                  { icon: "🎮", val: "18", label: "Games Played" },
                  { icon: "🔥", val: "5", label: "Day Streak" },
                ].map((s) => (
                  <motion.div key={s.label} whileHover={{ scale: 1.04 }}
                    className="text-center p-4 rounded-2xl"
                    style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-3xl font-black" style={{ color: "#7C3AED" }}>{s.val}</div>
                    <div className="text-xs font-semibold text-gray-400">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Switch student */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="mb-8 p-5 rounded-3xl" style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <h3 className="font-black text-gray-700 mb-3">👥 Switch Student</h3>
              <div className="flex gap-3 flex-wrap">
                {students.map((s) => (
                  <motion.button key={s.id} whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm transition-all"
                    style={{ background: s.id === "s1" ? "#EDE9FE" : "#F8FAFC", color: s.id === "s1" ? "#7C3AED" : "#64748B", border: s.id === "s1" ? "2px solid #7C3AED" : "2px solid transparent" }}>
                    <span className="text-xl">{s.avatar}</span> {s.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Choose subject */}
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="text-2xl font-black mb-4" style={{ color: "#1E1B4B" }}>
              🎮 Choose a Subject
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {subjects.map((subj, i) => (
                <motion.button key={subj.id}
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(subj.id)}
                  className="p-6 rounded-3xl text-left transition-all cursor-pointer"
                  style={{ background: subj.bg, border: `2px solid ${subj.border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
                  <div className="text-5xl mb-3">{subj.icon}</div>
                  <div className="text-lg font-black" style={{ color: subj.color }}>{subj.label}</div>
                  <div className="text-xs font-semibold text-gray-400 mt-1">Tap to play</div>
                </motion.button>
              ))}
            </div>

            {/* Achievements */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-2xl font-black mb-4" style={{ color: "#1E1B4B" }}>🏆 My Achievements</h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {achievements.map((a) => (
                  <motion.div key={a.label} whileHover={{ scale: 1.1 }}
                    className="text-center p-4 rounded-2xl"
                    style={{ background: a.unlocked ? "white" : "#F1F5F9", boxShadow: a.unlocked ? "0 4px 16px rgba(0,0,0,0.08)" : "none", opacity: a.unlocked ? 1 : 0.5 }}>
                    <div className="text-3xl mb-1" style={{ filter: a.unlocked ? "none" : "grayscale(1)" }}>{a.icon}</div>
                    <div className="text-xs font-bold" style={{ color: a.unlocked ? "#7C3AED" : "#94A3B8" }}>{a.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* Subject selected - choose game mode */}
        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              {(() => {
                const subj = subjects.find((s) => s.id === selected)!;
                return (
                  <>
                    <button onClick={() => setSelected(null)} className="flex items-center gap-2 font-bold mb-6 text-gray-500 hover:text-gray-800 transition-colors">
                      ← Back
                    </button>
                    <div className="text-center mb-8">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}
                        className="text-7xl mb-3">{subj.icon}</motion.div>
                      <h2 className="text-3xl font-black" style={{ color: subj.color }}>{subj.label}</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {["primary", "secondary", "preschool"].map((level, i) => {
                        const labels: Record<string, { label: string; desc: string; icon: string }> = {
                          preschool: { label: "Easy Mode 🌱", desc: "Ages 5–7 — colours, counting and shapes", icon: "🌱" },
                          primary: { label: "Normal Mode 📖", desc: "Ages 8–11 — core curriculum challenges", icon: "📖" },
                          secondary: { label: "Hard Mode ⚗️", desc: "Ages 12–20 — advanced topics", icon: "⚗️" },
                        };
                        const info = labels[level];
                        return (
                          <motion.div key={level} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <Link href={`/student/game/${subj.id}?level=${level}`}>
                              <motion.div whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.98 }}
                                className="p-8 rounded-3xl cursor-pointer"
                                style={{ background: subj.bg, border: `2px solid ${subj.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                                <div className="text-4xl mb-3">{info.icon}</div>
                                <h3 className="text-xl font-black mb-1" style={{ color: subj.color }}>{info.label}</h3>
                                <p className="text-sm text-gray-500">{info.desc}</p>
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
                            <p className="text-sm text-white/80">Answer as many as you can in 60 seconds</p>
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
