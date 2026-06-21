"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

const PALETTE = ["#1E3888", "#F43F5E", "#10B981", "#F59E0B", "#7C3AED", "#000000"];
const BRUSHES = [4, 9, 16];

export default function VisualActivity({ subject, level, color }: Props) {
  const [band, setBand] = useState<ActivityBand>(levelToBand(level));
  const [pen, setPen] = useState(PALETTE[0]);
  const [size, setSize] = useState(9);
  const [erasing, setErasing] = useState(false);
  const [done, setDone] = useState(false);
  const [savedImg, setSavedImg] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  const activity = getActivity(subject, "visual", band);
  const storageKey = `tm_drawing_${subject}_${band}`;

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let saved = "";
    try { saved = localStorage.getItem(storageKey) || ""; } catch { saved = ""; }
    if (saved) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.src = saved;
    }
  }, [storageKey]);

  useEffect(() => {
    setDone(false);
    initCanvas();
  }, [initCanvas]);

  function pos(e: React.PointerEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function down(e: React.PointerEvent) {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    drawing.current = true;
    last.current = pos(e);
  }
  function move(e: React.PointerEvent) {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !last.current) return;
    const p = pos(e);
    ctx.strokeStyle = erasing ? "#FFFFFF" : pen;
    ctx.lineWidth = erasing ? 28 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  }
  function up() { drawing.current = false; last.current = null; }

  function clear() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function finish() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL("image/png");
    try { localStorage.setItem(storageKey, data); } catch { /* ignore */ }
    setSavedImg(data);
    saveScore({ subject, gameType: "visual", score: 1, total: 1, level: band });
    setDone(true);
  }

  if (!activity) return null;

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }} className="text-7xl mb-3">🎨</motion.div>
        <h2 className="text-3xl font-black mb-1" style={{ color }}>Masterpiece saved!</h2>
        <p className="text-gray-500 mb-5">{activity.title}</p>
        {savedImg && (
          <img src={savedImg} alt="Your drawing" className="w-full rounded-3xl mb-6" style={{ border: `2px solid ${color}33` }} />
        )}
        <div className="flex gap-3 justify-center flex-wrap">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setDone(false)}
            className="px-7 py-3.5 rounded-2xl font-black border-2" style={{ color, borderColor: color, background: "white" }}>
            ✏️ Keep drawing
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
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {ACTIVITY_BANDS.map((b) => (
          <button key={b} onClick={() => setBand(b)}
            className="px-3 py-1.5 rounded-full text-xs font-black transition-colors"
            style={{ background: band === b ? color : "white", color: band === b ? "white" : color, border: `2px solid ${color}` }}>
            {BAND_LABELS[b]}
          </button>
        ))}
      </div>

      {/* Prompt */}
      <div className="p-5 rounded-3xl mb-4" style={{ background: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
        <h2 className="text-lg font-black mb-1" style={{ color: "#1E1B4B" }}>{activity.title}</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{activity.instructions}</p>
      </div>

      {/* Canvas */}
      <AnimatePresence mode="wait">
        <motion.canvas key={band} ref={canvasRef}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} onPointerCancel={up}
          className="w-full rounded-3xl block touch-none cursor-crosshair"
          style={{ height: 340, background: "white", border: `2px solid ${color}33`, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }} />
      </AnimatePresence>

      {/* Tools */}
      <div className="flex items-center flex-wrap gap-2 mt-4">
        {PALETTE.map((c) => (
          <button key={c} onClick={() => { setPen(c); setErasing(false); }} aria-label={`Colour ${c}`}
            className="w-9 h-9 rounded-full transition-transform"
            style={{ background: c, transform: !erasing && pen === c ? "scale(1.15)" : "scale(1)", boxShadow: !erasing && pen === c ? `0 0 0 3px white, 0 0 0 5px ${c}` : "0 1px 3px rgba(0,0,0,0.2)" }} />
        ))}
        <span className="w-px h-7 mx-1" style={{ background: "#E2E8F0" }} />
        {BRUSHES.map((b) => (
          <button key={b} onClick={() => { setSize(b); setErasing(false); }}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: !erasing && size === b ? color + "20" : "white", border: `2px solid ${!erasing && size === b ? color : "#E2E8F0"}` }}>
            <span className="rounded-full" style={{ width: b, height: b, background: "#1E1B4B", display: "block" }} />
          </button>
        ))}
        <button onClick={() => setErasing(true)}
          className="px-3 h-9 rounded-xl font-black text-sm" style={{ background: erasing ? color + "20" : "white", border: `2px solid ${erasing ? color : "#E2E8F0"}`, color: "#1E1B4B" }}>
          Eraser
        </button>
        <button onClick={clear} className="px-3 h-9 rounded-xl font-black text-sm ml-auto" style={{ background: "#FFF1F2", color: "#9C3848" }}>
          Clear
        </button>
      </div>

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={finish}
        className="w-full mt-4 py-4 rounded-2xl text-white font-black text-lg" style={{ background: color }}>
        I&apos;m done! →
      </motion.button>
    </div>
  );
}
