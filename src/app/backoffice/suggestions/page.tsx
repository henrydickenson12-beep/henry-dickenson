"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { students, aiSuggestions } from "@/lib/mockData";
import { AISuggestion } from "@/lib/types";

const typeIcon: Record<string, string> = { game: "🎮", homework: "📝", focus: "🎯" };
const typeLabel: Record<string, string> = { game: "Assign Game", homework: "Set Homework", focus: "Focus Area" };
const priorityColor: Record<string, string> = { high: "#EF4444", medium: "#F59E0B", low: "#10B981" };

function SuggestionCard({ sug, onAction }: { sug: AISuggestion; onAction: (id: string) => void }) {
  const student = students.find((s) => s.id === sug.studentId);
  const [done, setDone] = useState(false);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, x: 40 }}
          className="p-6 rounded-2xl" style={{ background: "#1E293B", border: "1px solid #334155" }}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{typeIcon[sug.type]}</div>
              <div>
                <p className="font-bold text-white">{sug.title}</p>
                <p className="text-sm capitalize" style={{ color: "#64748B" }}>{sug.subject} · {student?.name}</p>
              </div>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full font-black uppercase flex-shrink-0"
              style={{ background: priorityColor[sug.priority] + "20", color: priorityColor[sug.priority] }}>
              {sug.priority}
            </span>
          </div>

          <p className="text-sm mb-3 leading-relaxed" style={{ color: "#CBD5E1" }}>{sug.description}</p>

          <div className="p-3 rounded-xl mb-4" style={{ background: "#0F172A", border: "1px solid #1E293B" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "#6366F1" }}>💡 Why this is suggested:</p>
            <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{sug.reason}</p>
          </div>

          <div className="flex gap-3">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => { setDone(true); onAction(sug.id); }}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white transition-all"
              style={{ background: "linear-gradient(135deg, #6366F1, #7C3AED)" }}>
              ✓ {typeLabel[sug.type]}
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setDone(true)}
              className="px-4 py-2.5 rounded-xl font-bold text-sm transition-all"
              style={{ background: "#334155", color: "#94A3B8" }}>
              Dismiss
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const mockNewSuggestion: AISuggestion = {
  id: "ai-new", studentId: "s2", type: "game", subject: "science",
  title: "Assign Space Explorer Quiz", description: "Lila is ready for more advanced science topics.",
  reason: "82% average in science with consistent upward trend — time to introduce astronomy.",
  priority: "medium", generatedAt: new Date().toISOString(),
};

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([...aiSuggestions]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [done, setDone] = useState<string[]>([]);

  function handleAction(id: string) {
    setDone((p) => [...p, id]);
  }

  async function generateMore() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSuggestions((prev) => [...prev, { ...mockNewSuggestion, id: `ai-${Date.now()}` }]);
    setLoading(false);
  }

  return (
    <div className="p-8" style={{ color: "#F8FAFC" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">💡 Insights</h1>
          <p style={{ color: "#94A3B8" }}>Personalised recommendations based on each student&apos;s performance data.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Active Suggestions", value: suggestions.length - done.length, color: "#6366F1" },
            { label: "Actioned This Week", value: done.length, color: "#10B981" },
            { label: "Students Covered", value: new Set(suggestions.map((s) => s.studentId)).size, color: "#F59E0B" },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl text-center" style={{ background: "#1E293B", border: "1px solid #334155" }}>
              <div className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs font-semibold" style={{ color: "#64748B" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Ask for a custom suggestion */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl mb-8" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(124,58,237,0.1))", border: "1px solid #6366F140" }}>
          <h2 className="font-bold text-white mb-3">💬 Ask for Specific Help</h2>
          <div className="flex gap-3">
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)}
              placeholder='e.g. "Oliver is struggling with fractions, what should I assign?"'
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "#0F172A", border: "1px solid #334155", color: "#F8FAFC" }} />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={generateMore} disabled={loading}
              className="px-6 py-3 rounded-xl font-bold text-white text-sm flex items-center gap-2 transition-all"
              style={{ background: "linear-gradient(135deg, #6366F1, #7C3AED)", opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>⚙️</motion.span>
              ) : "💡"} {loading ? "Thinking..." : "Get suggestion"}
            </motion.button>
          </div>
          <p className="text-xs mt-2" style={{ color: "#475569" }}>Analyses all student data to give targeted suggestions</p>
        </motion.div>

        {/* Suggestions grid */}
        <div className="space-y-4">
          {suggestions.map((sug) => (
            <SuggestionCard key={sug.id} sug={sug} onAction={handleAction} />
          ))}
          {suggestions.every((s) => done.includes(s.id)) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-16" style={{ color: "#64748B" }}>
              <div className="text-5xl mb-4">🎉</div>
              <p className="font-bold text-white mb-2">All caught up!</p>
              <p className="text-sm">No pending suggestions. Check back after students play more games.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
