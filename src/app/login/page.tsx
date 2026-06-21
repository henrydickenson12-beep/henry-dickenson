"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Child, ParentUser, findParent, PARENT_HANDOFF_KEY } from "@/lib/parents";

// ─── Types ────────────────────────────────────────────────────────────────────
type Mode = "pick" | "parent-login" | "child-pick" | "child-draw" | "child-pin";
type OwlState = "idle" | "watching" | "hidden" | "peeking" | "success" | "error";

// ─── Owl SVG ──────────────────────────────────────────────────────────────────
const L_EYE = { cx: 72, cy: 90 };
const R_EYE = { cx: 128, cy: 90 };
const MAX_PUPIL = 8;

function pupilOffset(mx: number, my: number, el: SVGSVGElement | null, cx: number, cy: number) {
  if (!el) return { x: 0, y: 0 };
  const r = el.getBoundingClientRect();
  if (!r.width) return { x: 0, y: 0 };
  const sx = ((mx - r.left) / r.width) * 200;
  const sy = ((my - r.top) / r.height) * 240;
  const dx = sx - cx, dy = sy - cy;
  const d = Math.sqrt(dx * dx + dy * dy) || 1;
  const c = Math.min(d, MAX_PUPIL) / d;
  return { x: dx * c, y: dy * c };
}

function Owl({ state, mx, my }: { state: OwlState; mx: number; my: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [lp, setLp] = useState({ x: 0, y: 0 });
  const [rp, setRp] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (state === "watching" || state === "idle") {
      setLp(pupilOffset(mx, my, svgRef.current, L_EYE.cx, L_EYE.cy));
      setRp(pupilOffset(mx, my, svgRef.current, R_EYE.cx, R_EYE.cy));
    } else { setLp({ x: 0, y: 0 }); setRp({ x: 0, y: 0 }); }
  }, [mx, my, state]);

  useEffect(() => {
    const t = setInterval(() => {
      if (state === "idle" || state === "watching") {
        setBlink(true);
        setTimeout(() => setBlink(false), 120);
      }
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(t);
  }, [state]);

  const lidClosed = state === "hidden" || blink;
  const lidHalf = state === "peeking";
  const handY = state === "hidden" ? 78 : state === "peeking" ? 108 : 185;
  const angryBrows = state === "error";
  const happyBrows = state === "success";

  return (
    <motion.svg ref={svgRef} viewBox="0 0 200 240" width="180" height="216"
      style={{ overflow: "visible", filter: "drop-shadow(0 12px 32px rgba(30,56,136,0.18))" }}
      animate={state === "error" ? { x: [-10, 10, -10, 8, -6, 4, -2, 0] } : { x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}>
      <defs>
        <clipPath id="lec"><circle cx={L_EYE.cx} cy={L_EYE.cy} r="22" /></clipPath>
        <clipPath id="rec"><circle cx={R_EYE.cx} cy={R_EYE.cy} r="22" /></clipPath>
      </defs>
      <ellipse cx="100" cy="198" rx="54" ry="40" fill="#9B7040" />
      <ellipse cx="100" cy="205" rx="34" ry="26" fill="#F5DEB3" />
      <ellipse cx="52" cy="195" rx="22" ry="32" fill="#7A5528" transform="rotate(-12 52 195)" />
      <ellipse cx="148" cy="195" rx="22" ry="32" fill="#7A5528" transform="rotate(12 148 195)" />
      <circle cx="100" cy="92" r="72" fill="#C8996E" />
      <ellipse cx="100" cy="96" rx="50" ry="54" fill="#FFF3DC" />
      <polygon points="58,28 46,4 76,20" fill="#A67845" />
      <polygon points="142,28 154,4 124,20" fill="#A67845" />
      <polygon points="60,30 50,10 74,24" fill="#C8996E" />
      <polygon points="140,30 150,10 126,24" fill="#C8996E" />
      <circle cx={L_EYE.cx} cy={L_EYE.cy} r="22" fill="white" />
      <circle cx={R_EYE.cx} cy={R_EYE.cy} r="22" fill="white" />
      <circle cx={L_EYE.cx} cy={L_EYE.cy} r="22" fill="none" stroke="#E8C89A" strokeWidth="3" />
      <circle cx={R_EYE.cx} cy={R_EYE.cy} r="22" fill="none" stroke="#E8C89A" strokeWidth="3" />

      {state === "success" ? (
        <>
          <g transform={`translate(${L_EYE.cx}, ${L_EYE.cy})`}>
            <path d="M0,-6 C-2,-10 -10,-10 -10,-4 C-10,2 0,10 0,10 C0,10 10,2 10,-4 C10,-10 2,-10 0,-6Z" fill="#9C3848" transform="scale(0.8)" />
          </g>
          <g transform={`translate(${R_EYE.cx}, ${R_EYE.cy})`}>
            <path d="M0,-6 C-2,-10 -10,-10 -10,-4 C-10,2 0,10 0,10 C0,10 10,2 10,-4 C10,-10 2,-10 0,-6Z" fill="#9C3848" transform="scale(0.8)" />
          </g>
          <text x="30" y="60" fontSize="18" opacity="0.9">⭐</text>
          <text x="148" y="60" fontSize="18" opacity="0.9">⭐</text>
        </>
      ) : (
        <>
          <motion.circle cx={L_EYE.cx + lp.x} cy={L_EYE.cy + lp.y} r="10" fill="#1A0800"
            animate={{ cx: L_EYE.cx + lp.x, cy: L_EYE.cy + lp.y }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }} />
          <motion.circle cx={R_EYE.cx + rp.x} cy={R_EYE.cy + rp.y} r="10" fill="#1A0800"
            animate={{ cx: R_EYE.cx + rp.x, cy: R_EYE.cy + rp.y }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }} />
          <motion.circle cx={L_EYE.cx + lp.x + 3} cy={L_EYE.cy + lp.y - 3} r="3.5" fill="white"
            animate={{ cx: L_EYE.cx + lp.x + 3, cy: L_EYE.cy + lp.y - 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }} />
          <motion.circle cx={R_EYE.cx + rp.x + 3} cy={R_EYE.cy + rp.y - 3} r="3.5" fill="white"
            animate={{ cx: R_EYE.cx + rp.x + 3, cy: R_EYE.cy + rp.y - 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }} />
        </>
      )}

      <motion.rect x={L_EYE.cx - 22} y={L_EYE.cy - 22} width="44" rx="8" fill="#C8996E"
        style={{ clipPath: "url(#lec)" }}
        animate={{ height: lidClosed ? 48 : lidHalf ? 26 : 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }} />
      <motion.rect x={R_EYE.cx - 22} y={R_EYE.cy - 22} width="44" rx="8" fill="#C8996E"
        style={{ clipPath: "url(#rec)" }}
        animate={{ height: lidClosed ? 48 : lidHalf ? 26 : 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }} />

      <motion.path
        d={angryBrows ? "M50 68 Q66 74 82 66" : happyBrows ? "M50 64 Q66 56 82 60" : "M50 66 Q66 60 82 64"}
        stroke="#7A5528" strokeWidth="3.5" fill="none" strokeLinecap="round"
        animate={{ d: angryBrows ? "M50 68 Q66 74 82 66" : happyBrows ? "M50 64 Q66 56 82 60" : "M50 66 Q66 60 82 64" }}
        transition={{ duration: 0.2 }} />
      <motion.path
        d={angryBrows ? "M150 68 Q134 74 118 66" : happyBrows ? "M150 64 Q134 56 118 60" : "M150 66 Q134 60 118 64"}
        stroke="#7A5528" strokeWidth="3.5" fill="none" strokeLinecap="round"
        animate={{ d: angryBrows ? "M150 68 Q134 74 118 66" : happyBrows ? "M150 64 Q134 56 118 60" : "M150 66 Q134 60 118 64" }}
        transition={{ duration: 0.2 }} />

      <path d="M100 112 L90 126 Q100 130 110 126 Z" fill="#F4A422" />
      <ellipse cx="100" cy="113" rx="6" ry="4" fill="#F4A422" />
      <motion.path fill="none" strokeLinecap="round" strokeWidth="2.5" stroke="#7A5528"
        animate={{ d: state === "success" ? "M84 138 Q100 150 116 138" : state === "error" ? "M84 142 Q100 135 116 142" : "M88 136 Q100 141 112 136" }}
        transition={{ duration: 0.25 }} />

      <motion.g animate={{ y: handY - 185 }} transition={{ type: "spring", stiffness: 180, damping: 18 }}>
        <rect x="34" y="170" width="42" height="48" rx="14" fill="#9B7040" />
        <rect x="36" y="160" width="10" height="18" rx="5" fill="#9B7040" />
        <rect x="50" y="156" width="10" height="22" rx="5" fill="#9B7040" />
        <rect x="62" y="158" width="10" height="20" rx="5" fill="#9B7040" />
        <rect x="37" y="172" width="38" height="3" rx="2" fill="#B8864E" />
      </motion.g>
      <motion.g animate={{ y: handY - 185 }} transition={{ type: "spring", stiffness: 180, damping: 18 }}>
        <rect x="124" y="170" width="42" height="48" rx="14" fill="#9B7040" />
        <rect x="126" y="158" width="10" height="20" rx="5" fill="#9B7040" />
        <rect x="140" y="156" width="10" height="22" rx="5" fill="#9B7040" />
        <rect x="154" y="160" width="10" height="18" rx="5" fill="#9B7040" />
        <rect x="125" y="172" width="38" height="3" rx="2" fill="#B8864E" />
      </motion.g>

      {state === "error" && (
        <motion.ellipse cx="155" cy="75" rx="5" ry="8" fill="#60CBFF"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} />
      )}
    </motion.svg>
  );
}

// ─── Parent Login ─────────────────────────────────────────────────────────────
function ParentLoginScreen({ onSuccess, onBack }: { onSuccess: (p: ParentUser) => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [focus, setFocus] = useState<"email" | "password" | null>(null);
  const [owlState, setOwlState] = useState<OwlState>("idle");
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fn = (e: MouseEvent) => { setMx(e.clientX); setMy(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useEffect(() => {
    if (owlState === "success" || owlState === "error") return;
    if (focus === "email") setOwlState("watching");
    else if (focus === "password") setOwlState(showPw ? "peeking" : "hidden");
    else setOwlState("idle");
  }, [focus, showPw, owlState]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1000));
    const parent = findParent(email, password);
    if (parent) {
      setOwlState("success");
      setTimeout(() => onSuccess(parent), 1200);
    } else {
      setOwlState("error");
      setError("Email or password incorrect. Try: sarah@teachmore.io / any 4+ chars");
      setTimeout(() => setOwlState(focus === "password" ? (showPw ? "peeking" : "hidden") : "idle"), 1500);
    }
    setLoading(false);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 font-bold mb-6 hover:opacity-70 transition-opacity"
        style={{ color: "#1E3888" }}>
        ← Back
      </button>

      <div className="flex flex-col items-center mb-6">
        <Owl state={owlState} mx={mx} my={my} />
        <AnimatePresence mode="wait">
          <motion.p key={owlState} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-3 text-sm font-bold text-center"
            style={{ color: owlState === "error" ? "#9C3848" : owlState === "success" ? "#1A6B7A" : "#64748B" }}>
            {owlState === "idle" && "👋 Hi! I'm Ollie the Owl."}
            {owlState === "watching" && "👀 I see you typing..."}
            {owlState === "hidden" && "🙈 Not peeking! Your password is safe!"}
            {owlState === "peeking" && "👀 Okay... just a little peek..."}
            {owlState === "success" && "🎉 Welcome back! Loading your account..."}
            {owlState === "error" && "😤 Hmm, that doesn't look right!"}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="p-8 rounded-2xl" style={{ background: "white", boxShadow: "0 1px 2px rgba(20,30,50,0.04), 0 10px 30px rgba(20,30,50,0.06)" }}>
        <h2 className="text-2xl font-black text-center mb-6" style={{ color: "#000" }}>Parent / Teacher Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ color: "#444" }}>Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocus("email")} onBlur={() => setFocus(null)}
              placeholder="sarah@teachmore.io"
              className="w-full px-4 py-3.5 rounded-2xl text-sm font-semibold outline-none transition-all"
              style={{ background: "#FFF9EF", border: `2px solid ${focus === "email" ? "#1E3888" : "#E2E8F0"}`, color: "#000" }}
              autoComplete="email" />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ color: "#444" }}>Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocus("password")} onBlur={() => setFocus(null)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 pr-14 rounded-2xl text-sm font-semibold outline-none transition-all"
                style={{ background: "#FFF9EF", border: `2px solid ${focus === "password" ? "#1E3888" : "#E2E8F0"}`, color: "#000" }}
                autoComplete="current-password" />
              <button type="button" onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black hover:opacity-70 transition-opacity"
                style={{ color: "#1E3888" }}>
                {showPw ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold px-4 py-2.5 rounded-xl" role="alert"
              style={{ color: "#9C3848", background: "#FCEEF0" }}>
              {error}
            </motion.p>
          )}

          <motion.button type="submit" disabled={loading || owlState === "success"}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl text-white font-black text-lg transition-all"
            style={{ background: "#14A4B4", opacity: loading ? 0.8 : 1 }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>⚙️</motion.span>
                Checking...
              </span>
            ) : owlState === "success" ? "🎉 Welcome!" : "Log In →"}
          </motion.button>
        </form>

        <div className="flex items-center gap-3 mt-5">
          <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
          <span className="text-xs font-semibold text-gray-400">or</span>
          <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
        </div>
        <Link href="/backoffice">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
            className="mt-4 w-full py-3 rounded-2xl text-center font-bold text-sm border-2 cursor-pointer"
            style={{ borderColor: "#1E3888", color: "#1E3888" }}>
            Go straight to Teacher Dashboard →
          </motion.div>
        </Link>
        <p className="text-center text-xs text-gray-400 mt-3">Demo: any email + 4-char password</p>
      </div>
    </motion.div>
  );
}

// ─── Child Picker ─────────────────────────────────────────────────────────────
function ChildPickScreen({ parent, onPick, onBack }: {
  parent: ParentUser;
  onPick: (c: Child) => void;
  onBack: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-sm mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 font-bold mb-6 hover:opacity-70 transition-opacity"
        style={{ color: "#1E3888" }}>
        ← Back
      </button>

      <div className="text-center mb-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}
          className="text-5xl mb-3">👋</motion.div>
        <h2 className="text-3xl font-black" style={{ color: "#000" }}>
          Hi {parent.name.split(" ")[0]}!
        </h2>
        <p className="text-gray-500 mt-1">Which child is playing today?</p>
      </div>

      <div className="space-y-4 mb-8">
        {parent.children.map((child, i) => (
          <motion.button key={child.id}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03, x: 6 }} whileTap={{ scale: 0.97 }}
            onClick={() => onPick(child)}
            className="w-full p-6 rounded-2xl text-left flex items-center gap-5 transition-all"
            style={{ background: "white", border: "2px solid #E8EEF9", boxShadow: "0 4px 20px rgba(30,56,136,0.08)" }}>
            <span className="text-5xl">{child.avatar}</span>
            <div>
              <p className="font-black text-xl" style={{ color: "#000" }}>{child.name}</p>
              <p className="text-sm text-gray-400 mt-0.5">
                Age {child.age} · {child.age <= 10 ? "✏️ Write your name" : "🔢 Enter your PIN"}
              </p>
            </div>
            <span className="ml-auto text-2xl" style={{ color: "#1E3888" }}>→</span>
          </motion.button>
        ))}
      </div>

      <Link href="/backoffice">
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
          className="w-full py-3 rounded-2xl text-center font-bold text-sm border-2 cursor-pointer"
          style={{ borderColor: "#47A8BD", color: "#47A8BD" }}>
          Teacher Dashboard →
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─── Child Draw Login (age 5–10) ──────────────────────────────────────────────
const PALETTE = ["#1E3888", "#9C3848", "#47A8BD", "#FFAD69", "#F5E663", "#000000"];

interface RecognizedStudent { id: string; name: string; avatar: string; score: number; }

function ChildDrawScreen({ child, siblingList, onSuccess, onBack }: {
  child: Child;
  siblingList: Child[];
  onSuccess: () => void;
  onBack: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Offscreen layer holding ONLY the child's strokes (no guide lines), used to
  // export a clean black-on-white image the vision model can actually read.
  const inkRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState(PALETTE[0]);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [step, setStep] = useState<"draw" | "recognize" | "confirm" | "done">("draw");
  const [recognized, setRecognized] = useState<RecognizedStudent | null>(null);
  const [allStudents, setAllStudents] = useState<RecognizedStudent[]>([]);

  const drawGuideLines = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);
    [h * 0.22, h * 0.5, h * 0.78].forEach((y, i) => {
      ctx.setLineDash(i === 2 ? [] : [8, 6]);
      ctx.strokeStyle = i === 2 ? "#B8CCE8" : "#D8E8F5";
      ctx.lineWidth = i === 2 ? 2.5 : 1.5;
      ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(w - 20, y); ctx.stroke();
    });
    ctx.setLineDash([]);
  }, []);

  useEffect(() => {
    if (step !== "draw") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawGuideLines(ctx, canvas.width, canvas.height);

    // Match the offscreen ink layer to the visible canvas size (clears it too).
    const ink = inkRef.current ?? document.createElement("canvas");
    ink.width = canvas.width;
    ink.height = canvas.height;
    inkRef.current = ink;
  }, [step, drawGuideLines]);

  function getPos(e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width, scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const t = e.touches[0] || e.changedTouches[0];
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawing.current = true;
    lastPos.current = getPos(e, canvas);
    setHasDrawn(true);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !lastPos.current) return;
    const pos = getPos(e, canvas);
    const from = lastPos.current;
    // Draw the same stroke to the visible canvas and the offscreen ink layer.
    for (const c2 of [ctx, inkRef.current?.getContext("2d")]) {
      if (!c2) continue;
      c2.strokeStyle = color; c2.lineWidth = 12; c2.lineCap = "round"; c2.lineJoin = "round";
      c2.beginPath(); c2.moveTo(from.x, from.y); c2.lineTo(pos.x, pos.y); c2.stroke();
    }
    lastPos.current = pos;
  }

  function stopDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    drawing.current = false; lastPos.current = null;
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    drawGuideLines(ctx, canvas.width, canvas.height);
    const ink = inkRef.current;
    ink?.getContext("2d")?.clearRect(0, 0, ink.width, ink.height);
    setHasDrawn(false);
  }

  async function submitDrawing() {
    const ink = inkRef.current;
    if (!ink) { setStep("confirm"); return; }
    // Flatten the strokes onto a solid white background so the handwriting reads
    // as clean black-on-white (transparent PNGs and guide lines confuse the model).
    const out = document.createElement("canvas");
    out.width = ink.width;
    out.height = ink.height;
    const octx = out.getContext("2d");
    if (!octx) { setStep("confirm"); return; }
    octx.fillStyle = "#FFFFFF";
    octx.fillRect(0, 0, out.width, out.height);
    octx.drawImage(ink, 0, 0);
    const base64 = out.toDataURL("image/png");
    setStep("recognize");
    try {
      const res = await fetch("/api/recognize-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64,
          studentList: siblingList.map((s) => ({ id: s.id, name: s.name, avatar: s.avatar })),
        }),
      });
      const data = await res.json();
      if (data.bestMatch) setRecognized(data.bestMatch);
      setAllStudents(data.allStudents || siblingList.map((s) => ({ ...s, score: 0 })));
    } catch {
      setAllStudents(siblingList.map((s) => ({ ...s, score: 0 })));
    }
    setStep("confirm");
  }

  if (step === "recognize") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-sm mx-auto py-12">
        <motion.div className="text-7xl mb-6"
          animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}>
          🔍
        </motion.div>
        <h2 className="text-2xl font-black mb-2" style={{ color: "#000" }}>Reading your name...</h2>
        <p style={{ color: "#888" }}>Just a moment! ✨</p>
      </motion.div>
    );
  }

  if (step === "confirm") {
    return (
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mx-auto">
        <div className="p-8 rounded-2xl text-center" style={{ background: "white", boxShadow: "0 1px 2px rgba(20,30,50,0.04), 0 10px 30px rgba(20,30,50,0.06)" }}>
          {recognized && recognized.id === child.id ? (
            <>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}
                className="text-8xl mb-4">{child.avatar}</motion.div>
              <h2 className="text-2xl font-black mb-1" style={{ color: "#000" }}>Is this you?</h2>
              <p className="text-4xl font-black mb-6" style={{ color: "#1E3888" }}>{child.name}? 👋</p>
              <div className="flex gap-4">
                <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                  onClick={onSuccess}
                  className="flex-1 py-4 rounded-2xl font-black text-xl text-white"
                  style={{ background: "#14A4B4" }}>
                  Yes, that&apos;s me! 🎉
                </motion.button>
                <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                  onClick={() => { setStep("draw"); setHasDrawn(false); setRecognized(null); }}
                  className="flex-1 py-4 rounded-2xl font-black text-xl border-2"
                  style={{ color: "#9C3848", borderColor: "#9C3848", background: "white" }}>
                  Nope ❌
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">🤔</div>
              <h2 className="text-2xl font-black mb-2" style={{ color: "#000" }}>Hmm, who are you?</h2>
              <p className="text-sm mb-5" style={{ color: "#888" }}>Tap your name!</p>
              <div className="space-y-2 mb-4">
                {allStudents.map((s) => (
                  <motion.button key={s.id} whileHover={{ scale: 1.03, x: 4 }} whileTap={{ scale: 0.97 }}
                    onClick={onSuccess}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl font-bold text-left"
                    style={{ background: "#FFF9EF", color: "#000", border: "2px solid #E8EEF9" }}>
                    <span className="text-3xl">{s.avatar}</span>
                    <span className="text-lg">{s.name}</span>
                  </motion.button>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => { setStep("draw"); setHasDrawn(false); setRecognized(null); }}
                className="w-full py-3 rounded-2xl font-bold text-sm border-2"
                style={{ borderColor: "#1E3888", color: "#1E3888" }}>
                ✏️ Try drawing again
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 font-black mb-4 hover:opacity-70 transition-opacity"
        style={{ color: "#1E3888", fontSize: "1.1rem" }}>← Back</button>

      <div className="p-6 rounded-2xl" style={{ background: "white", boxShadow: "0 1px 2px rgba(20,30,50,0.04), 0 10px 30px rgba(20,30,50,0.06)" }}>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-5xl">{child.avatar}</span>
          <div>
            <h2 className="text-2xl font-black" style={{ color: "#000" }}>Hi {child.name}! ✏️</h2>
            <p className="text-sm" style={{ color: "#888" }}>Write your name with your finger or mouse</p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden mb-4"
          style={{ background: "#FFF9EF", border: "3px solid #E8EEF9", touchAction: "none", height: 180 }}>
          <canvas ref={canvasRef} className="w-full h-full cursor-crosshair block"
            onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
            onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw} />
          {!hasDrawn && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-lg font-bold" style={{ color: "#B8CCE8" }}>draw here...</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-4 justify-center">
          {PALETTE.map((c) => (
            <motion.button key={c} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
              onClick={() => setColor(c)}
              className="w-10 h-10 rounded-full transition-all"
              style={{ background: c, boxShadow: color === c ? `0 0 0 3px white, 0 0 0 5px ${c}` : "none" }}
              aria-label={`Colour ${c}`} />
          ))}
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={clearCanvas}
            className="ml-2 px-4 py-2 rounded-xl font-black text-sm"
            style={{ background: "#F1F5F9", color: "#64748B" }}>
            Clear
          </motion.button>
        </div>

        <motion.button disabled={!hasDrawn}
          whileHover={hasDrawn ? { scale: 1.03 } : {}} whileTap={hasDrawn ? { scale: 0.97 } : {}}
          onClick={submitDrawing}
          className="w-full py-4 rounded-2xl font-black text-xl text-white transition-all"
          style={{ background: hasDrawn ? "#1E3888" : "#E2E8F0", color: hasDrawn ? "white" : "#94A3B8" }}>
          {hasDrawn ? "I'm done! →" : "Draw your name first!"}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Child PIN Login (age 11+) ────────────────────────────────────────────────
function ChildPinScreen({ child, onSuccess, onBack }: {
  child: Child;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  function pressPin(n: string) {
    if (pin.length >= 4 || success) return;
    const next = pin + n;
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        // Demo: any 4 digits work
        setSuccess(true);
        setTimeout(onSuccess, 1000);
      }, 200);
    }
  }

  function clearPin() { setPin(pin.slice(0, -1)); }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="w-full max-w-sm mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 font-black mb-6 hover:opacity-70 transition-opacity"
        style={{ color: "#1E3888", fontSize: "1.1rem" }}>← Back</button>

      <div className="p-8 rounded-2xl" style={{ background: "white", boxShadow: "0 1px 2px rgba(20,30,50,0.04), 0 10px 30px rgba(20,30,50,0.06)" }}>
        <div className="text-center mb-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}
            className="text-7xl mb-3">{child.avatar}</motion.div>
          <h2 className="text-2xl font-black" style={{ color: "#000" }}>Hi {child.name}! 👋</h2>
          <p className="mt-1 text-sm" style={{ color: "#888" }}>Enter your 4-digit PIN</p>
        </div>

        <motion.div className="flex justify-center gap-4 mb-8"
          animate={shake ? { x: [-8, 8, -8, 6, -4, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.div key={i}
              animate={{ scale: pin.length > i ? 1.2 : 1, background: success ? "#47A8BD" : pin.length > i ? "#1E3888" : "#E8EEF9" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-5 h-5 rounded-full" style={{ background: "#E8EEF9" }} />
          ))}
        </motion.div>

        {success ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center text-5xl py-4">🎉</motion.div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((n) => (
              <motion.button key={n}
                whileHover={n ? { scale: 1.08 } : {}} whileTap={n ? { scale: 0.92 } : {}}
                onClick={() => n === "⌫" ? clearPin() : n ? pressPin(n) : null}
                disabled={!n}
                className="aspect-square rounded-2xl font-black text-2xl flex items-center justify-center transition-all"
                style={{
                  background: n === "⌫" ? "#FCEEF0" : n ? "#FFF9EF" : "transparent",
                  color: n === "⌫" ? "#9C3848" : "#000",
                  opacity: n ? 1 : 0,
                }}>
                {n}
              </motion.button>
            ))}
          </div>
        )}
        <p className="text-center text-xs mt-4" style={{ color: "#CBD5E1" }}>Demo: any 4 digits work</p>
      </div>
    </motion.div>
  );
}

// ─── Mode Picker ──────────────────────────────────────────────────────────────
function ModePicker({ onPick }: { onPick: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-sm mx-auto text-center">
      <motion.div className="text-8xl mb-6"
        animate={{ rotate: [0, 8, -8, 6, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}>
        📚
      </motion.div>
      <h1 className="text-4xl font-black mb-2" style={{ color: "#000" }}>
        Welcome to <span style={{ color: "#1E3888" }}>TeachMore!</span>
      </h1>
      <p className="mb-10 text-lg" style={{ color: "#666" }}>Parents — log in and let your child play!</p>

      <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
        onClick={onPick}
        className="w-full p-7 rounded-2xl text-left flex items-center gap-5 transition-all"
        style={{ background: "white", boxShadow: "0 8px 32px rgba(30,56,136,0.12)", border: "2px solid #E8EEF9" }}>
        <span className="text-5xl">👨‍👩‍👧</span>
        <div>
          <p className="font-black text-xl" style={{ color: "#000" }}>Parent or Teacher</p>
          <p className="text-sm" style={{ color: "#888" }}>Log in to access your children&apos;s games</p>
        </div>
        <span className="ml-auto text-2xl" style={{ color: "#1E3888" }}>→</span>
      </motion.button>

      <div className="mt-6 p-5 rounded-2xl" style={{ background: "#FFF9EF", border: "2px dashed #B8CCE8" }}>
        <p className="text-sm font-bold" style={{ color: "#1E3888" }}>
          🧒 Students — ask your parent or teacher to log in first,<br />then you can pick yourself to play!
        </p>
      </div>

      <Link href="/" className="block mt-8 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: "#888" }}>
        ← Back to home
      </Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("pick");
  const [parent, setParent] = useState<ParentUser | null>(null);
  const [child, setChild] = useState<Child | null>(null);

  // If the parent already logged in on the landing hero, jump straight to picking
  // a child instead of asking them to log in again.
  useEffect(() => {
    const raw = sessionStorage.getItem(PARENT_HANDOFF_KEY);
    if (!raw) return;
    sessionStorage.removeItem(PARENT_HANDOFF_KEY);
    try {
      const p = JSON.parse(raw) as ParentUser;
      setParent(p);
      setMode("child-pick");
    } catch {
      /* ignore malformed handoff */
    }
  }, []);

  function handleParentSuccess(p: ParentUser) {
    setParent(p);
    setMode("child-pick");
  }

  function handleChildPick(c: Child) {
    setChild(c);
    setMode(c.age <= 10 ? "child-draw" : "child-pin");
  }

  function handleChildSuccess() {
    window.location.href = "/student";
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ fontFamily: "var(--font-nunito), sans-serif", background: "#FFF9EF" }}>

<div className="relative z-10 w-full max-w-lg">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "#14A4B4" }}>📚</div>
          <span className="text-3xl font-black" style={{ color: "#000" }}>
            Teach<span style={{ color: "#1E3888" }}>More</span>
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === "pick" && (
            <ModePicker key="pick" onPick={() => setMode("parent-login")} />
          )}
          {mode === "parent-login" && (
            <ParentLoginScreen key="parent-login"
              onSuccess={handleParentSuccess}
              onBack={() => setMode("pick")} />
          )}
          {mode === "child-pick" && parent && (
            <ChildPickScreen key="child-pick"
              parent={parent}
              onPick={handleChildPick}
              onBack={() => setMode("parent-login")} />
          )}
          {mode === "child-draw" && child && (
            <ChildDrawScreen key="child-draw"
              child={child}
              siblingList={parent?.children ?? []}
              onSuccess={handleChildSuccess}
              onBack={() => setMode("child-pick")} />
          )}
          {mode === "child-pin" && child && (
            <ChildPinScreen key="child-pin"
              child={child}
              onSuccess={handleChildSuccess}
              onBack={() => setMode("child-pick")} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
