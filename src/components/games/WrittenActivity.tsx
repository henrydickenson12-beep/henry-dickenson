"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getActivity, levelToBand, ACTIVITY_BANDS, BAND_LABELS, ActivityBand } from "@/lib/activities";
import { saveScore } from "@/lib/scores";

interface Props {
  subject: string;
  level: string;
  color: string;
  bg: string;
  onFinish?: (score: number, total: number) => void;
}

const CHECKS = [
  "I answered the whole prompt",
  "I used full sentences",
  "I checked my spelling",
];

export default function WrittenActivity({ subject, level, color }: Props) {
  const [band, setBand] = useState<ActivityBand>(levelToBand(level));
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const [checks, setChecks] = useState<boolean[]>([false, false, false]);

  const activity = getActivity(subject, "written", band);
  const storageKey = `tm_written_${subject}_${band}`;

  // Load any saved draft when the band changes.
  useEffect(() => {
    setDone(false);
    setChecks([false, false, false]);
    try { setText(localStorage.getItem(storageKey) || ""); } catch { setText(""); }
  }, [storageKey]);

  if (!activity) return null;

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const canSubmit = words >= 3;

  function submit() {
    try { localStorage.setItem(storageKey, text); } catch { /* ignore */ }
    saveScore({ subject, gameType: "written", score: 1, total: 1, level: band });
    setDone(true);
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }} className="text-7xl mb-3">📝</motion.div>
        <h2 className="text-3xl font-black mb-1" style={{ color }}>Nice writing!</h2>
        <p className="text-gray-500 mb-6">You wrote {words} word{words === 1 ? "" : "s"}. Give it a quick check:</p>

        <div className="p-5 rounded-3xl text-left mb-5" style={{ background: "white", boxShadow: "0 6px 24px rgba(0,0,0,0.07)" }}>
          {CHECKS.map((c, i) => (
            <button key={c} onClick={() => setChecks((p) => p.map((v, j) => (j === i ? !v : v)))}
              className="w-full flex items-center gap-3 py-2 text-left">
              <span className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-black text-white"
                style={{ background: checks[i] ? "#10B981" : "#CBD5E1" }}>{checks[i] ? "✓" : ""}</span>
              <span className="font-bold" style={{ color: "#1E1B4B" }}>{c}</span>
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl text-left mb-6" style={{ background: color + "0D", border: `1px solid ${color}33` }}>
          <p className="text-xs font-black mb-2" style={{ color }}>YOUR ANSWER</p>
          <p className="whitespace-pre-wrap" style={{ color: "#1E1B4B" }}>{text}</p>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setDone(false)}
            className="px-7 py-3.5 rounded-2xl font-black border-2" style={{ color, borderColor: color, background: "white" }}>
            ✏️ Edit
          </motion.button>
          <Link href="/student">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-2xl text-white font-black" style={{ background: color }}>
              🏠 Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Band picker */}
      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {ACTIVITY_BANDS.map((b) => (
          <button key={b} onClick={() => setBand(b)}
            className="px-3 py-1.5 rounded-full text-xs font-black transition-colors"
            style={{ background: band === b ? color : "white", color: band === b ? "white" : color, border: `2px solid ${color}` }}>
            {BAND_LABELS[b]}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={band} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <div className="p-6 rounded-3xl mb-4" style={{ background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
            <h2 className="text-xl font-black mb-2" style={{ color: "#1E1B4B" }}>{activity.title}</h2>
            <p className="leading-relaxed" style={{ color: "#475569" }}>{activity.instructions}</p>
            {activity.estimatedTime && (
              <p className="text-xs font-bold mt-3" style={{ color: "#94A3B8" }}>⏱ About {activity.estimatedTime}</p>
            )}
          </div>

          <textarea value={text} onChange={(e) => setText(e.target.value)}
            placeholder="Write your answer here…" rows={8}
            className="w-full p-4 rounded-3xl outline-none resize-y text-base leading-relaxed"
            style={{ background: "white", color: "#1E1B4B", border: `2px solid ${color}33`, minHeight: 180 }} />

          <div className="flex items-center justify-between mt-3">
            <span className="text-sm font-bold" style={{ color: "#94A3B8" }}>{words} word{words === 1 ? "" : "s"}</span>
            <motion.button whileHover={canSubmit ? { scale: 1.04 } : {}} whileTap={canSubmit ? { scale: 0.97 } : {}}
              onClick={submit} disabled={!canSubmit}
              className="px-7 py-3 rounded-2xl text-white font-black"
              style={{ background: color, opacity: canSubmit ? 1 : 0.5, cursor: canSubmit ? "pointer" : "not-allowed" }}>
              Submit my answer →
            </motion.button>
          </div>
          {!canSubmit && <p className="text-xs text-right mt-1" style={{ color: "#CBD5E1" }}>Write a little more to submit</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
