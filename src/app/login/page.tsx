"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
type Mode = "pick" | "teacher" | "preschool" | "student";
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
    } else if (state === "hidden" || state === "error") {
      setLp({ x: 0, y: 0 });
      setRp({ x: 0, y: 0 });
    } else if (state === "success") {
      setLp({ x: 0, y: 0 });
      setRp({ x: 0, y: 0 });
    }
  }, [mx, my, state]);

  // random idle blink
  useEffect(() => {
    const t = setInterval(() => {
      if (state === "idle" || state === "watching") {
        setBlink(true);
        setTimeout(() => setBlink(false), 120);
      }
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(t);
  }, [state]);

  // lid open/close state
  const lidClosed = state === "hidden" || blink;
  const lidHalf = state === "peeking";

  // hand Y: 185 = hidden below, 78 = covering eyes, 108 = peeking height
  const handY = state === "hidden" ? 78 : state === "peeking" ? 108 : 185;

  // eyebrow state
  const angryBrows = state === "error";
  const happyBrows = state === "success";

  return (
    <motion.svg
      ref={svgRef}
      viewBox="0 0 200 240"
      width="200" height="240"
      style={{ overflow: "visible", filter: "drop-shadow(0 12px 32px rgba(124,58,237,0.15))" }}
      animate={state === "error" ? { x: [-10, 10, -10, 8, -6, 4, -2, 0] } : { x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <defs>
        <clipPath id="lec"><circle cx={L_EYE.cx} cy={L_EYE.cy} r="22" /></clipPath>
        <clipPath id="rec"><circle cx={R_EYE.cx} cy={R_EYE.cy} r="22" /></clipPath>
      </defs>

      {/* Body */}
      <ellipse cx="100" cy="198" rx="54" ry="40" fill="#9B7040" />

      {/* Belly */}
      <ellipse cx="100" cy="205" rx="34" ry="26" fill="#F5DEB3" />

      {/* Wing left */}
      <ellipse cx="52" cy="195" rx="22" ry="32" fill="#7A5528" transform="rotate(-12 52 195)" />
      {/* Wing right */}
      <ellipse cx="148" cy="195" rx="22" ry="32" fill="#7A5528" transform="rotate(12 148 195)" />

      {/* Head */}
      <circle cx="100" cy="92" r="72" fill="#C8996E" />

      {/* Face patch */}
      <ellipse cx="100" cy="96" rx="50" ry="54" fill="#FFF3DC" />

      {/* Ear tufts */}
      <polygon points="58,28 46,4 76,20" fill="#A67845" />
      <polygon points="142,28 154,4 124,20" fill="#A67845" />
      <polygon points="60,30 50,10 74,24" fill="#C8996E" />
      <polygon points="140,30 150,10 126,24" fill="#C8996E" />

      {/* Eye sockets */}
      <circle cx={L_EYE.cx} cy={L_EYE.cy} r="22" fill="white" />
      <circle cx={R_EYE.cx} cy={R_EYE.cy} r="22" fill="white" />

      {/* Eye ring (clay border) */}
      <circle cx={L_EYE.cx} cy={L_EYE.cy} r="22" fill="none" stroke="#E8C89A" strokeWidth="3" />
      <circle cx={R_EYE.cx} cy={R_EYE.cy} r="22" fill="none" stroke="#E8C89A" strokeWidth="3" />

      {/* Pupils / special states */}
      {state === "success" ? (
        <>
          {/* Heart eyes using path */}
          <g transform={`translate(${L_EYE.cx}, ${L_EYE.cy})`}>
            <path d="M0,-6 C-2,-10 -10,-10 -10,-4 C-10,2 0,10 0,10 C0,10 10,2 10,-4 C10,-10 2,-10 0,-6Z" fill="#F43F5E" transform="scale(0.8)" />
          </g>
          <g transform={`translate(${R_EYE.cx}, ${R_EYE.cy})`}>
            <path d="M0,-6 C-2,-10 -10,-10 -10,-4 C-10,2 0,10 0,10 C0,10 10,2 10,-4 C10,-10 2,-10 0,-6Z" fill="#F43F5E" transform="scale(0.8)" />
          </g>
          {/* Stars */}
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
          {/* Shine */}
          <motion.circle cx={L_EYE.cx + lp.x + 3} cy={L_EYE.cy + lp.y - 3} r="3.5" fill="white"
            animate={{ cx: L_EYE.cx + lp.x + 3, cy: L_EYE.cy + lp.y - 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }} />
          <motion.circle cx={R_EYE.cx + rp.x + 3} cy={R_EYE.cy + rp.y - 3} r="3.5" fill="white"
            animate={{ cx: R_EYE.cx + rp.x + 3, cy: R_EYE.cy + rp.y - 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }} />
        </>
      )}

      {/* Eyelids (slide from top of eye) */}
      <motion.rect
        x={L_EYE.cx - 22} y={L_EYE.cy - 22} width="44" rx="8"
        fill="#C8996E"
        style={{ clipPath: "url(#lec)" }}
        animate={{ height: lidClosed ? 48 : lidHalf ? 26 : 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
      <motion.rect
        x={R_EYE.cx - 22} y={R_EYE.cy - 22} width="44" rx="8"
        fill="#C8996E"
        style={{ clipPath: "url(#rec)" }}
        animate={{ height: lidClosed ? 48 : lidHalf ? 26 : 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />

      {/* Eyebrows */}
      <motion.path
        d={angryBrows ? "M50 68 Q66 74 82 66" : happyBrows ? "M50 64 Q66 56 82 60" : "M50 66 Q66 60 82 64"}
        stroke="#7A5528" strokeWidth="3.5" fill="none" strokeLinecap="round"
        animate={{ d: angryBrows ? "M50 68 Q66 74 82 66" : happyBrows ? "M50 64 Q66 56 82 60" : "M50 66 Q66 60 82 64" }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d={angryBrows ? "M150 68 Q134 74 118 66" : happyBrows ? "M150 64 Q134 56 118 60" : "M150 66 Q134 60 118 64"}
        stroke="#7A5528" strokeWidth="3.5" fill="none" strokeLinecap="round"
        animate={{ d: angryBrows ? "M150 68 Q134 74 118 66" : happyBrows ? "M150 64 Q134 56 118 60" : "M150 66 Q134 60 118 64" }}
        transition={{ duration: 0.2 }}
      />

      {/* Beak */}
      <path d="M100 112 L90 126 Q100 130 110 126 Z" fill="#F4A422" />
      <ellipse cx="100" cy="113" rx="6" ry="4" fill="#F4A422" />

      {/* Mouth */}
      <motion.path
        fill="none" strokeLinecap="round" strokeWidth="2.5" stroke="#7A5528"
        animate={{ d: state === "success" ? "M84 138 Q100 150 116 138" : state === "error" ? "M84 142 Q100 135 116 142" : "M88 136 Q100 141 112 136" }}
        transition={{ duration: 0.25 }}
      />

      {/* Hands (slide up to cover eyes when password hidden) */}
      <motion.g
        animate={{ y: handY - 185 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      >
        {/* Left hand */}
        <rect x="34" y="170" width="42" height="48" rx="14" fill="#9B7040" />
        {/* Fingers */}
        <rect x="36" y="160" width="10" height="18" rx="5" fill="#9B7040" />
        <rect x="50" y="156" width="10" height="22" rx="5" fill="#9B7040" />
        <rect x="62" y="158" width="10" height="20" rx="5" fill="#9B7040" />
        {/* Knuckle sheen */}
        <rect x="37" y="172" width="38" height="3" rx="2" fill="#B8864E" />
      </motion.g>

      <motion.g
        animate={{ y: handY - 185 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      >
        {/* Right hand */}
        <rect x="124" y="170" width="42" height="48" rx="14" fill="#9B7040" />
        <rect x="126" y="158" width="10" height="20" rx="5" fill="#9B7040" />
        <rect x="140" y="156" width="10" height="22" rx="5" fill="#9B7040" />
        <rect x="154" y="160" width="10" height="18" rx="5" fill="#9B7040" />
        <rect x="125" y="172" width="38" height="3" rx="2" fill="#B8864E" />
      </motion.g>

      {/* Sweat drop on error */}
      {state === "error" && (
        <motion.ellipse cx="155" cy="75" rx="5" ry="8" fill="#60CBFF"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        />
      )}
    </motion.svg>
  );
}

// ─── Teacher Login Form ────────────────────────────────────────────────────────
function TeacherLogin({ onBack }: { onBack: () => void }) {
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
    await new Promise((r) => setTimeout(r, 1200));

    // Demo: any email with "teacher" or correct combo works
    if (email.includes("@") && password.length >= 4) {
      setOwlState("success");
      setTimeout(() => window.location.href = "/backoffice", 1500);
    } else {
      setOwlState("error");
      setError("Wrong email or password. Try: sarah@teachmore.io / any 4+ char password");
      setTimeout(() => setOwlState(focus === "password" ? (showPw ? "peeking" : "hidden") : "idle"), 1500);
    }
    setLoading(false);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 font-bold text-violet-400 hover:text-violet-600 transition-colors mb-6">
        ← Back
      </button>

      {/* Owl */}
      <div className="flex flex-col items-center mb-6">
        <Owl state={owlState} mx={mx} my={my} />
        <AnimatePresence mode="wait">
          <motion.p key={owlState}
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-3 text-sm font-bold text-center"
            style={{ color: owlState === "error" ? "#EF4444" : owlState === "success" ? "#10B981" : "#94A3B8" }}>
            {owlState === "idle" && "👋 Hello! I'm Ollie the Owl."}
            {owlState === "watching" && "👀 I'm watching you type..."}
            {owlState === "hidden" && "🙈 I can't see a thing! Your password is safe!"}
            {owlState === "peeking" && "👀 Okay okay I'm peeking a little..."}
            {owlState === "success" && "🎉 Welcome back! Logging you in..."}
            {owlState === "error" && "😤 Hmm, that doesn't look right!"}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Form */}
      <div className="p-8 rounded-3xl" style={{ background: "white", boxShadow: "0 8px 40px rgba(124,58,237,0.12)" }}>
        <h2 className="text-2xl font-black text-center mb-6" style={{ color: "#1E1B4B" }}>
          Teacher / Parent Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ color: "#64748B" }}>Email address</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocus("email")} onBlur={() => setFocus(null)}
              placeholder="sarah@teachmore.io"
              className="w-full px-4 py-3.5 rounded-2xl text-sm font-semibold outline-none transition-all"
              style={{ background: "#F8FAFC", border: focus === "email" ? "2px solid #7C3AED" : "2px solid #E2E8F0", color: "#1E1B4B" }}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1.5" style={{ color: "#64748B" }}>Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocus("password")} onBlur={() => setFocus(null)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 pr-14 rounded-2xl text-sm font-semibold outline-none transition-all"
                style={{ background: "#F8FAFC", border: focus === "password" ? "2px solid #7C3AED" : "2px solid #E2E8F0", color: "#1E1B4B" }}
                autoComplete="current-password"
              />
              <button type="button" onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black transition-all hover:scale-110"
                style={{ color: "#7C3AED" }}
                aria-label={showPw ? "Hide password" : "Show password"}>
                {showPw ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold text-red-500 bg-red-50 px-4 py-2.5 rounded-xl" role="alert">
              {error}
            </motion.p>
          )}

          <motion.button type="submit" disabled={loading || owlState === "success"}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl text-white font-black text-lg transition-all"
            style={{ background: "linear-gradient(135deg, #7C3AED, #6366F1)", opacity: loading ? 0.8 : 1 }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>⚙️</motion.span>
                Checking...
              </span>
            ) : owlState === "success" ? "🎉 Welcome!" : "Log In →"}
          </motion.button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Demo: use any email + 4-char password
        </p>
      </div>
    </motion.div>
  );
}

// ─── Preschool Drawing Canvas ─────────────────────────────────────────────────
const PALETTE = ["#7C3AED", "#F43F5E", "#10B981", "#F59E0B", "#06B6D4", "#1E1B4B"];
const AVATARS = ["🦊", "🐱", "🐶", "🐻", "🦋", "🐢", "🐸", "🦄"];

function PreschoolLogin({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState(PALETTE[0]);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [step, setStep] = useState<"avatar" | "draw" | "done">("avatar");
  const [hasDrawn, setHasDrawn] = useState(false);

  const drawGuideLines = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);
    // Three guide lines (topline, midline, baseline)
    const lines = [h * 0.22, h * 0.5, h * 0.78];
    lines.forEach((y, i) => {
      ctx.setLineDash(i === 2 ? [] : [8, 6]);
      ctx.strokeStyle = i === 2 ? "#C4B5FD" : "#E0D4FF";
      ctx.lineWidth = i === 2 ? 2.5 : 1.5;
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();
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
  }, [step, drawGuideLines]);

  function getPos(e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
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
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  }

  function stopDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    drawing.current = false;
    lastPos.current = null;
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    drawGuideLines(ctx, canvas.width, canvas.height);
    setHasDrawn(false);
  }

  if (step === "done") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-sm mx-auto">
        <motion.div className="text-8xl mb-4" animate={{ y: [0, -20, 0] }} transition={{ duration: 1, repeat: Infinity }}>
          {avatar}
        </motion.div>
        <h2 className="text-3xl font-black mb-2" style={{ color: "#1E1B4B" }}>Yay! You did it! 🎉</h2>
        <p className="text-gray-500 mb-6">Let&apos;s go learn something fun!</p>
        <Link href="/student">
          <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-3xl text-white font-black text-2xl"
            style={{ background: "linear-gradient(135deg, #7C3AED, #6366F1)", boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}>
            Let&apos;s Go! 🚀
          </motion.button>
        </Link>
      </motion.div>
    );
  }

  if (step === "avatar") {
    return (
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
        className="w-full max-w-sm mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 font-black text-violet-400 mb-6 text-lg">← Back</button>
        <div className="p-8 rounded-3xl text-center" style={{ background: "white", boxShadow: "0 8px 40px rgba(124,58,237,0.12)" }}>
          <div className="text-5xl mb-2">👋</div>
          <h2 className="text-3xl font-black mb-1" style={{ color: "#1E1B4B" }}>Hello!</h2>
          <p className="text-gray-500 mb-6 text-lg">Pick your animal friend!</p>
          <div className="grid grid-cols-4 gap-3 mb-8">
            {AVATARS.map((a) => (
              <motion.button key={a} whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.9 }}
                onClick={() => setAvatar(a)}
                className="aspect-square rounded-2xl text-4xl flex items-center justify-center transition-all"
                style={{ background: avatar === a ? "#EDE9FE" : "#F8FAFC", border: avatar === a ? "3px solid #7C3AED" : "3px solid transparent", boxShadow: avatar === a ? "0 4px 16px rgba(124,58,237,0.2)" : "none" }}>
                {a}
              </motion.button>
            ))}
          </div>
          <motion.button disabled={!avatar} whileHover={avatar ? { scale: 1.05 } : {}} whileTap={avatar ? { scale: 0.97 } : {}}
            onClick={() => setStep("draw")}
            className="w-full py-4 rounded-2xl font-black text-xl text-white transition-all"
            style={{ background: avatar ? "linear-gradient(135deg, #7C3AED, #6366F1)" : "#E2E8F0", color: avatar ? "white" : "#94A3B8" }}>
            {avatar ? `I'm ${avatar}! Next →` : "Pick one first!"}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Draw step
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto">
      <button onClick={() => setStep("avatar")} className="flex items-center gap-2 font-black text-violet-400 mb-4 text-lg">← Back</button>

      <div className="p-6 rounded-3xl" style={{ background: "white", boxShadow: "0 8px 40px rgba(124,58,237,0.12)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{avatar}</span>
          <div>
            <h2 className="text-2xl font-black" style={{ color: "#1E1B4B" }}>Write your name! ✏️</h2>
            <p className="text-sm text-gray-400">Use your finger or mouse to draw it</p>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative rounded-2xl overflow-hidden mb-4"
          style={{ background: "#FAF7FF", border: "3px solid #EDE9FE", touchAction: "none", height: 180 }}>
          <canvas ref={canvasRef} className="w-full h-full cursor-crosshair block"
            onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
            onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
          />
          {!hasDrawn && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-lg font-bold" style={{ color: "#C4B5FD" }}>draw here...</p>
            </div>
          )}
        </div>

        {/* Color palette */}
        <div className="flex items-center gap-2 mb-4 justify-center">
          {PALETTE.map((c) => (
            <motion.button key={c} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
              onClick={() => setColor(c)}
              className="w-10 h-10 rounded-full transition-all"
              style={{ background: c, boxShadow: color === c ? `0 0 0 3px white, 0 0 0 5px ${c}` : "none" }}
              aria-label={`Color ${c}`}
            />
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
          onClick={() => setStep("done")}
          className="w-full py-4 rounded-2xl font-black text-xl text-white transition-all"
          style={{ background: hasDrawn ? "linear-gradient(135deg, #10B981, #059669)" : "#E2E8F0", color: hasDrawn ? "white" : "#94A3B8" }}>
          {hasDrawn ? "I'm done! ✓" : "Draw your name first!"}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Older Student Login ───────────────────────────────────────────────────────
const STUDENT_LIST = [
  { id: "s1", name: "Oliver", avatar: "🦊" },
  { id: "s2", name: "Lila", avatar: "🦋" },
  { id: "s3", name: "Noah", avatar: "🐢" },
  { id: "s4", name: "Freya", avatar: "🦅" },
  { id: "s5", name: "Lucas", avatar: "🦁" },
];

function StudentLogin({ onBack }: { onBack: () => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  function pressPin(n: string) {
    if (pin.length >= 4) return;
    const next = pin + n;
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === "1234" || true) { // demo: any 4-digit pin works
          setSuccess(true);
          setTimeout(() => window.location.href = "/student", 1200);
        } else {
          setShake(true);
          setTimeout(() => { setShake(false); setPin(""); }, 600);
        }
      }, 200);
    }
  }

  function clearPin() { setPin(""); }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="w-full max-w-sm mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 font-black text-violet-400 mb-6 text-lg">← Back</button>

      <div className="p-8 rounded-3xl" style={{ background: "white", boxShadow: "0 8px 40px rgba(124,58,237,0.12)" }}>
        {!picked ? (
          <>
            <h2 className="text-2xl font-black text-center mb-1" style={{ color: "#1E1B4B" }}>Who are you? 👋</h2>
            <p className="text-center text-gray-400 mb-6 text-sm">Tap your name</p>
            <div className="space-y-3">
              {STUDENT_LIST.map((s) => (
                <motion.button key={s.id} whileHover={{ scale: 1.03, x: 4 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setPicked(s.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl font-black text-xl text-left transition-all"
                  style={{ background: "#F3F0FF", color: "#1E1B4B", border: "2px solid #EDE9FE" }}>
                  <span className="text-4xl">{s.avatar}</span>
                  <span>{s.name}</span>
                  <span className="ml-auto" style={{ color: "#7C3AED" }}>→</span>
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button onClick={() => { setPicked(null); setPin(""); }}
              className="font-bold text-violet-400 mb-4 block">← Not you?</button>
            {(() => {
              const s = STUDENT_LIST.find((x) => x.id === picked)!;
              return (
                <>
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-2">{s.avatar}</div>
                    <h2 className="text-2xl font-black" style={{ color: "#1E1B4B" }}>Hi {s.name}! 👋</h2>
                    <p className="text-gray-400 text-sm mt-1">Enter your 4-digit PIN</p>
                  </div>

                  {/* PIN dots */}
                  <motion.div className="flex justify-center gap-4 mb-8"
                    animate={shake ? { x: [-8, 8, -8, 6, -4, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}>
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div key={i}
                        animate={{ scale: pin.length > i ? 1.2 : 1, background: success ? "#10B981" : pin.length > i ? "#7C3AED" : "#E2E8F0" }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="w-5 h-5 rounded-full"
                        style={{ background: "#E2E8F0" }}
                      />
                    ))}
                  </motion.div>

                  {success ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="text-center text-4xl py-4">🎉</motion.div>
                  ) : (
                    /* Numpad */
                    <div className="grid grid-cols-3 gap-3">
                      {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((n) => (
                        <motion.button key={n} whileHover={n ? { scale: 1.08 } : {}} whileTap={n ? { scale: 0.92 } : {}}
                          onClick={() => n === "⌫" ? clearPin() : n ? pressPin(n) : null}
                          disabled={!n}
                          className="aspect-square rounded-2xl font-black text-2xl flex items-center justify-center transition-all"
                          style={{ background: n === "⌫" ? "#FFF1F2" : n ? "#F3F0FF" : "transparent", color: n === "⌫" ? "#EF4444" : "#1E1B4B", opacity: n ? 1 : 0 }}>
                          {n}
                        </motion.button>
                      ))}
                    </div>
                  )}
                  <p className="text-center text-xs text-gray-300 mt-4">Demo: any 4 digits work</p>
                </>
              );
            })()}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── Mode Picker ──────────────────────────────────────────────────────────────
function ModePicker({ onPick }: { onPick: (m: Mode) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-sm mx-auto text-center">
      <motion.div className="text-7xl mb-4"
        animate={{ rotate: [0, 10, -10, 8, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
        📚
      </motion.div>
      <h1 className="text-4xl font-black mb-2" style={{ color: "#1E1B4B" }}>
        Welcome to <span style={{ color: "#7C3AED" }}>TeachMore!</span>
      </h1>
      <p className="text-gray-500 mb-10 text-lg">Who&apos;s logging in today?</p>

      <div className="space-y-4">
        <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
          onClick={() => onPick("teacher")}
          className="w-full p-6 rounded-3xl text-left flex items-center gap-5 transition-all"
          style={{ background: "white", boxShadow: "0 6px 32px rgba(124,58,237,0.12)", border: "2px solid #EDE9FE" }}>
          <span className="text-5xl">👩‍🏫</span>
          <div>
            <p className="font-black text-xl" style={{ color: "#1E1B4B" }}>Teacher or Parent</p>
            <p className="text-sm text-gray-400">Access dashboard and reports</p>
          </div>
          <span className="ml-auto text-2xl" style={{ color: "#7C3AED" }}>→</span>
        </motion.button>

        <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
          onClick={() => onPick("student")}
          className="w-full p-6 rounded-3xl text-left flex items-center gap-5 transition-all"
          style={{ background: "white", boxShadow: "0 6px 32px rgba(16,185,129,0.12)", border: "2px solid #A7F3D0" }}>
          <span className="text-5xl">🎮</span>
          <div>
            <p className="font-black text-xl" style={{ color: "#1E1B4B" }}>Student (age 8+)</p>
            <p className="text-sm text-gray-400">Find your name and enter your PIN</p>
          </div>
          <span className="ml-auto text-2xl" style={{ color: "#10B981" }}>→</span>
        </motion.button>

        <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
          onClick={() => onPick("preschool")}
          className="w-full p-6 rounded-3xl text-left flex items-center gap-5 transition-all"
          style={{ background: "white", boxShadow: "0 6px 32px rgba(245,158,11,0.12)", border: "2px solid #FDE68A" }}>
          <span className="text-5xl">🌱</span>
          <div>
            <p className="font-black text-xl" style={{ color: "#1E1B4B" }}>Little Learner (age 5–7)</p>
            <p className="text-sm text-gray-400">Pick your animal and write your name!</p>
          </div>
          <span className="ml-auto text-2xl" style={{ color: "#F59E0B" }}>→</span>
        </motion.button>
      </div>

      <Link href="/" className="block mt-8 text-sm font-semibold text-gray-400 hover:text-violet-500 transition-colors">
        ← Back to home
      </Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("pick");

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ fontFamily: "var(--font-nunito), sans-serif", background: "#FFF8F0" }}>

      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <motion.div className="absolute w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent)", top: "-10%", right: "-5%" }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div className="absolute w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #F59E0B, transparent)", bottom: "-5%", left: "-5%" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div className="absolute w-64 h-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #10B981, transparent)", top: "40%", left: "-8%" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "linear-gradient(135deg, #7C3AED, #6366F1)" }}>📚</div>
          <span className="text-3xl font-black" style={{ color: "#1E1B4B" }}>
            Teach<span style={{ color: "#7C3AED" }}>More</span>
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === "pick" && <ModePicker key="pick" onPick={setMode} />}
          {mode === "teacher" && <TeacherLogin key="teacher" onBack={() => setMode("pick")} />}
          {mode === "preschool" && <PreschoolLogin key="preschool" onBack={() => setMode("pick")} />}
          {mode === "student" && <StudentLogin key="student" onBack={() => setMode("pick")} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
