"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import { students, gameResults, classrooms, weeklyProgress, colors } from "@/lib/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const } }),
};

const subjectScores = [
  { subject: "Math", avg: 62, fill: "#6366F1" },
  { subject: "Science", avg: 88, fill: "#10B981" },
  { subject: "English", avg: 78, fill: "#F59E0B" },
  { subject: "History", avg: 71, fill: "#EF4444" },
  { subject: "Geography", avg: 65, fill: "#06B6D4" },
];

const recentResults = gameResults.slice(0, 6).map((r) => ({
  ...r,
  studentName: students.find((s) => s.id === r.studentId)?.name || "Unknown",
  scorePct: Math.round((r.score / r.totalQuestions) * 100),
}));

const radarData = [
  { subject: "Math", score: 62 },
  { subject: "Science", score: 88 },
  { subject: "English", score: 78 },
  { subject: "History", score: 71 },
  { subject: "Geography", score: 65 },
];

export default function BackofficeDashboard() {
  const totalStudents = students.length;
  const totalGamesThisWeek = gameResults.filter((r) => {
    const d = new Date(r.completedAt);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;
  const avgScore = Math.round(gameResults.reduce((acc, r) => acc + (r.score / r.totalQuestions) * 100, 0) / gameResults.length);

  return (
    <div className="p-8" style={{ color: "#F8FAFC" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Good morning, Sarah 👋</h1>
        <p style={{ color: "#94A3B8" }}>Here&apos;s how your students are doing today — Friday, 20 June 2026</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Students", value: totalStudents, icon: "👥", color: "#6366F1", sub: "across 2 classrooms" },
          { label: "Games This Week", value: totalGamesThisWeek, icon: "🎮", color: "#10B981", sub: "+3 since yesterday" },
          { label: "Average Score", value: `${avgScore}%`, icon: "📊", color: "#F59E0B", sub: "across all subjects" },
          { label: "AI Suggestions", value: "3", icon: "🤖", color: "#F43F5E", sub: "pending review" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} custom={i} initial="hidden" animate="visible" variants={fadeUp}
            className="p-5 rounded-2xl" style={{ background: "#1E293B", border: "1px solid #334155" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{kpi.icon}</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: kpi.color + "20", color: kpi.color }}>
                Live
              </span>
            </div>
            <div className="text-3xl font-black text-white mb-1">{kpi.value}</div>
            <div className="text-sm font-semibold" style={{ color: "#94A3B8" }}>{kpi.label}</div>
            <div className="text-xs mt-1" style={{ color: "#475569" }}>{kpi.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Weekly performance line chart */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
          className="lg:col-span-2 p-6 rounded-2xl" style={{ background: "#1E293B", border: "1px solid #334155" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Weekly Performance</h2>
            <div className="flex gap-3 text-xs">
              {Object.entries(colors).slice(0, 3).map(([subj, c]) => (
                <span key={subj} className="flex items-center gap-1 capitalize" style={{ color: "#94A3B8" }}>
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: c }} />
                  {subj}
                </span>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyProgress}>
              <XAxis dataKey="day" stroke="#475569" tick={{ fill: "#94A3B8", fontSize: 12 }} />
              <YAxis stroke="#475569" tick={{ fill: "#94A3B8", fontSize: 12 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 12, color: "#F8FAFC" }} />
              <Line type="monotone" dataKey="math" stroke={colors.math} strokeWidth={2} dot={{ fill: colors.math }} />
              <Line type="monotone" dataKey="science" stroke={colors.science} strokeWidth={2} dot={{ fill: colors.science }} />
              <Line type="monotone" dataKey="english" stroke={colors.english} strokeWidth={2} dot={{ fill: colors.english }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Radar chart */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}
          className="p-6 rounded-2xl" style={{ background: "#1E293B", border: "1px solid #334155" }}>
          <h2 className="font-bold text-white mb-4">Class Average by Subject</h2>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#94A3B8", fontSize: 11 }} />
              <Radar dataKey="score" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Subject bar chart */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}
          className="p-6 rounded-2xl" style={{ background: "#1E293B", border: "1px solid #334155" }}>
          <h2 className="font-bold text-white mb-4">Average by Subject</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={subjectScores} layout="vertical">
              <XAxis type="number" stroke="#475569" tick={{ fill: "#94A3B8", fontSize: 12 }} domain={[0, 100]} />
              <YAxis type="category" dataKey="subject" stroke="#475569" tick={{ fill: "#94A3B8", fontSize: 12 }} width={65} />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 12, color: "#F8FAFC" }} />
              <Bar dataKey="avg" radius={[0, 4, 4, 0]} fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent results */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          className="lg:col-span-2 p-6 rounded-2xl" style={{ background: "#1E293B", border: "1px solid #334155" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Recent Game Results</h2>
            <Link href="/backoffice/students" className="text-sm font-semibold hover:underline" style={{ color: "#6366F1" }}>View all →</Link>
          </div>
          <div className="space-y-3">
            {recentResults.map((r) => (
              <div key={r.id} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #1E293B30" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
                    style={{ background: (colors[r.subject] || "#6366F1") + "20", color: colors[r.subject] || "#6366F1" }}>
                    {r.studentName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{r.studentName}</p>
                    <p className="text-xs capitalize" style={{ color: "#64748B" }}>{r.subject} · {r.topic}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-2 rounded-full overflow-hidden" style={{ background: "#334155" }}>
                    <div className="h-full rounded-full" style={{ width: `${r.scorePct}%`, background: r.scorePct >= 70 ? "#10B981" : r.scorePct >= 50 ? "#F59E0B" : "#EF4444" }} />
                  </div>
                  <span className="text-sm font-bold min-w-10 text-right" style={{ color: r.scorePct >= 70 ? "#10B981" : r.scorePct >= 50 ? "#F59E0B" : "#EF4444" }}>
                    {r.scorePct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Classrooms quick view */}
      <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
        className="p-6 rounded-2xl" style={{ background: "#1E293B", border: "1px solid #334155" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-white">My Classrooms</h2>
          <Link href="/admin/classrooms" className="text-sm font-semibold hover:underline" style={{ color: "#6366F1" }}>Manage →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {classrooms.slice(0, 4).map((c) => (
            <Link href={`/backoffice/students?classroom=${c.id}`} key={c.id}>
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-xl cursor-pointer transition-all"
                style={{ background: "#0F172A", border: "1px solid #334155" }}>
                <div className="text-2xl mb-2">🏫</div>
                <p className="font-bold text-white text-sm mb-1">{c.name}</p>
                <p className="text-xs" style={{ color: "#64748B" }}>{c.studentIds.length} students · {c.ageGroup}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
