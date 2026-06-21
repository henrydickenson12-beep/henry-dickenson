"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { students, gameResults, subjectPerformance, aiSuggestions, colors, classrooms } from "@/lib/mockData";
import { Student } from "@/lib/types";

const ageGroupBadge: Record<string, string> = {
  preschool: "#10B981", primary: "#7C3AED", middle: "#06B6D4", secondary: "#F59E0B", sixthform: "#F43F5E",
};

function StudentCard({ s, onClick, active }: { s: Student; onClick: () => void; active: boolean }) {
  const results = gameResults.filter((r) => r.studentId === s.id);
  const avg = results.length ? Math.round(results.reduce((a, r) => a + (r.score / r.totalQuestions) * 100, 0) / results.length) : 0;
  const lastActivity = results.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0];

  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClick}
      className="w-full text-left p-5 rounded-2xl transition-all"
      style={{ background: active ? "rgba(99,102,241,0.15)" : "#0F172A", border: active ? "2px solid #6366F1" : "2px solid #334155" }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg"
          style={{ background: (ageGroupBadge[s.ageGroup] || "#6366F1") + "20", color: ageGroupBadge[s.ageGroup] || "#6366F1" }}>
          {s.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white truncate">{s.name}</p>
          <p className="text-xs capitalize" style={{ color: "#64748B" }}>Age {s.age} · {s.ageGroup}</p>
        </div>
        <span className="text-sm font-black" style={{ color: avg >= 70 ? "#10B981" : avg >= 50 ? "#F59E0B" : "#EF4444" }}>
          {avg}%
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#1E293B" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${avg}%`, background: avg >= 70 ? "#10B981" : avg >= 50 ? "#F59E0B" : "#EF4444" }} />
      </div>
      <p className="text-xs mt-2" style={{ color: "#475569" }}>
        {results.length} games · Last: {lastActivity ? new Date(lastActivity.completedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "No activity"}
      </p>
    </motion.button>
  );
}

export default function StudentsPage() {
  const [selectedId, setSelectedId] = useState<string>("s1");
  const [searchQ, setSearchQ] = useState("");

  const filtered = students.filter((s) => s.name.toLowerCase().includes(searchQ.toLowerCase()));
  const student = students.find((s) => s.id === selectedId);
  const perf = student ? (subjectPerformance[student.id] || []) : [];
  const results = student ? gameResults.filter((r) => r.studentId === student.id) : [];
  const suggestions = student ? aiSuggestions.filter((a) => a.studentId === student.id) : [];
  const classroom = student ? classrooms.find((c) => c.id === student.classroomId) : null;

  const chartData = perf.map((p) => ({
    subject: p.subject.charAt(0).toUpperCase() + p.subject.slice(1),
    score: p.averageScore,
    fill: colors[p.subject] || "#6366F1",
  }));

  const recentResults = results.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()).slice(0, 5);

  return (
    <div className="flex h-screen overflow-hidden" style={{ color: "#F8FAFC" }}>
      {/* Student list */}
      <div className="w-72 flex-shrink-0 flex flex-col h-full" style={{ borderRight: "1px solid #334155" }}>
        <div className="p-4" style={{ borderBottom: "1px solid #334155" }}>
          <h2 className="font-bold text-white mb-3">Students</h2>
          <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
            placeholder="🔍 Search students..."
            className="w-full px-3 py-2.5 rounded-xl text-sm font-semibold outline-none transition-all"
            style={{ background: "#0F172A", border: "1px solid #334155", color: "#F8FAFC" }} />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.map((s) => (
            <StudentCard key={s.id} s={s} onClick={() => setSelectedId(s.id)} active={selectedId === s.id} />
          ))}
        </div>
      </div>

      {/* Student detail */}
      <div className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          {student && (
            <motion.div key={selectedId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              {/* Student header */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
                  style={{ background: (ageGroupBadge[student.ageGroup] || "#6366F1") + "20" }}>
                  {student.avatar}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-1">{student.name}</h1>
                  <p style={{ color: "#94A3B8" }}>Age {student.age} · {student.ageGroup} · {classroom?.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black" style={{ color: "#6366F1" }}>
                    {results.length ? Math.round(results.reduce((a, r) => a + (r.score / r.totalQuestions) * 100, 0) / results.length) : 0}%
                  </div>
                  <p className="text-sm" style={{ color: "#64748B" }}>Overall Average</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Performance chart */}
                <div className="p-6 rounded-2xl" style={{ background: "#1E293B", border: "1px solid #334155" }}>
                  <h2 className="font-bold text-white mb-4">Performance by Subject</h2>
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={chartData}>
                        <XAxis dataKey="subject" stroke="#475569" tick={{ fill: "#94A3B8", fontSize: 12 }} />
                        <YAxis stroke="#475569" tick={{ fill: "#94A3B8", fontSize: 12 }} domain={[0, 100]} />
                        <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 12, color: "#F8FAFC" }} />
                        <Bar dataKey="score" radius={[6, 6, 0, 0]} fill="#6366F1" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-40 text-gray-500">No data yet</div>
                  )}
                </div>

                {/* Strengths & Weaknesses */}
                <div className="p-6 rounded-2xl" style={{ background: "#1E293B", border: "1px solid #334155" }}>
                  <h2 className="font-bold text-white mb-4">Strengths & Areas to Improve</h2>
                  <div className="space-y-4">
                    {perf.map((p) => (
                      <div key={p.subject}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold capitalize text-white">{p.subject}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold" style={{ color: colors[p.subject] }}>{p.averageScore}%</span>
                            <span className="text-xs" style={{ color: p.trend === "up" ? "#10B981" : p.trend === "down" ? "#EF4444" : "#F59E0B" }}>
                              {p.trend === "up" ? "↑" : p.trend === "down" ? "↓" : "→"}
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-2 rounded-full" style={{ background: "#334155" }}>
                          <div className="h-full rounded-full" style={{ width: `${p.averageScore}%`, background: colors[p.subject] || "#6366F1" }} />
                        </div>
                        <div className="flex gap-2 mt-1.5 flex-wrap">
                          {p.strongTopics.map((t) => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#ECFDF5", color: "#059669" }}>✓ {t}</span>
                          ))}
                          {p.weakTopics.map((t) => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#FFF1F2", color: "#DC2626" }}>⚠ {t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                    {perf.length === 0 && <p className="text-gray-500 text-sm">No performance data yet.</p>}
                  </div>
                </div>
              </div>

              {/* Insights */}
              {suggestions.length > 0 && (
                <div className="p-6 rounded-2xl mb-6" style={{ background: "#1E293B", border: "1px solid #334155" }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-white">💡 Insights</h2>
                    <Link href="/backoffice/suggestions" className="text-sm font-semibold hover:underline" style={{ color: "#6366F1" }}>View all →</Link>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {suggestions.map((sug) => (
                      <motion.div key={sug.id} whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl" style={{ background: "#0F172A", border: "1px solid #334155" }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{sug.type === "game" ? "🎮" : sug.type === "homework" ? "📝" : "🎯"}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-bold capitalize"
                            style={{ background: sug.priority === "high" ? "#EF444420" : "#F59E0B20", color: sug.priority === "high" ? "#EF4444" : "#F59E0B" }}>
                            {sug.priority}
                          </span>
                        </div>
                        <p className="font-bold text-white text-sm mb-1">{sug.title}</p>
                        <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{sug.reason}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent results */}
              <div className="p-6 rounded-2xl" style={{ background: "#1E293B", border: "1px solid #334155" }}>
                <h2 className="font-bold text-white mb-4">Recent Game Results</h2>
                {recentResults.length > 0 ? (
                  <div className="space-y-3">
                    {recentResults.map((r) => {
                      const pct = Math.round((r.score / r.totalQuestions) * 100);
                      return (
                        <div key={r.id} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #334155" }}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                              style={{ background: (colors[r.subject] || "#6366F1") + "20", color: colors[r.subject] || "#6366F1" }}>
                              {r.subject === "math" ? "🔢" : "🔬"}
                            </div>
                            <div>
                              <p className="font-semibold text-white text-sm capitalize">{r.subject} — {r.topic}</p>
                              <p className="text-xs" style={{ color: "#64748B" }}>
                                {new Date(r.completedAt).toLocaleDateString("en-GB")} · {Math.round(r.timeSpent / 60)}m {r.timeSpent % 60}s · {r.difficulty}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-black text-sm" style={{ color: pct >= 70 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444" }}>
                              {r.score}/{r.totalQuestions}
                            </span>
                            <p className="text-xs" style={{ color: "#475569" }}>{pct}%</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No games played yet.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
