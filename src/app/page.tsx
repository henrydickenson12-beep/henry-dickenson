"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { findParent, PARENT_HANDOFF_KEY } from "@/lib/parents";

// Warm, rounded, friendly palette (Albert / hejalbert.se vibe)
const PAPER = "#FFF9EF";
const SURFACE = "#FFFFFF";
const INK = "#2D2A26";
const INK_SOFT = "#6B6358";
const TEAL = "#14A4B4";
const TEAL_DEEP = "#0E808D";
const YELLOW = "#FFC23D";
const GREEN = "#43B082";
const CORAL = "#FF7A5C";
const SKY = "#E4F4F6";
const BUTTER = "#FFF1D2";
const MINT = "#E7F5EC";
const DISPLAY = "var(--font-fredoka), system-ui, sans-serif";
const BODY = "var(--font-nunito), system-ui, sans-serif";
const SOFT_SHADOW = "0 10px 30px rgba(45,42,38,0.08)";

// ─── Icons (Lucide-style, rounded) ──────────────────────────────────────────────
type IconProps = { className?: string; style?: React.CSSProperties };
function Svg({ children, className = "w-6 h-6", style }: IconProps & { children: React.ReactNode }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
const CalculatorIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" />
    <line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" />
    <path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M8 18h.01" />
  </Svg>
);
const BookIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 7v14" />
    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
  </Svg>
);
const ChartIcon = (p: IconProps) => (
  <Svg {...p}><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="m19 9-5 5-4-4-3 3" /></Svg>
);
const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);
const CheckIcon = (p: IconProps) => (
  <Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>
);
const ArrowIcon = (p: IconProps) => (
  <Svg {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Svg>
);
const PlayIcon = (p: IconProps) => (
  <Svg {...p}><polygon points="6 3 20 12 6 21 6 3" /></Svg>
);

// ─── Owl mascot (the friendly character) ────────────────────────────────────────
function OwlMascot({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} role="img" aria-label="Ollie the owl, TeachMore's friendly mascot">
      {/* feet */}
      <g fill="#F2A03D">
        <path d="M88 188c0 8 6 12 6 12M84 188c0 8-2 13-2 13M80 188c-2 8-8 12-8 12" stroke="#F2A03D" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M132 188c0 8 6 12 6 12M136 188c0 8-2 13-2 13M140 188c2 8 8 12 8 12" stroke="#F2A03D" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      {/* body */}
      <ellipse cx="110" cy="120" rx="72" ry="74" fill={TEAL} />
      {/* wings */}
      <ellipse cx="46" cy="124" rx="20" ry="40" fill={TEAL_DEEP} transform="rotate(-12 46 124)" />
      <ellipse cx="174" cy="124" rx="20" ry="40" fill={TEAL_DEEP} transform="rotate(12 174 124)" />
      {/* belly */}
      <ellipse cx="110" cy="134" rx="46" ry="54" fill="#FFF6E2" />
      {/* ear tufts */}
      <path d="M60 60 L52 30 L84 50 Z" fill={TEAL} />
      <path d="M160 60 L168 30 L136 50 Z" fill={TEAL} />
      {/* eye discs */}
      <circle cx="84" cy="98" r="30" fill="#FFFFFF" />
      <circle cx="136" cy="98" r="30" fill="#FFFFFF" />
      <circle cx="84" cy="98" r="30" fill="none" stroke="#FFE6B0" strokeWidth="4" />
      <circle cx="136" cy="98" r="30" fill="none" stroke="#FFE6B0" strokeWidth="4" />
      {/* pupils + happy highlights */}
      <circle cx="88" cy="100" r="12" fill={INK} />
      <circle cx="132" cy="100" r="12" fill={INK} />
      <circle cx="92" cy="96" r="4" fill="#FFFFFF" />
      <circle cx="136" cy="96" r="4" fill="#FFFFFF" />
      {/* happy brows */}
      <path d="M64 74 Q84 64 104 74" stroke={TEAL_DEEP} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M116 74 Q136 64 156 74" stroke={TEAL_DEEP} strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* beak */}
      <path d="M110 112 L100 126 Q110 132 120 126 Z" fill={YELLOW} />
      {/* cheeks */}
      <circle cx="64" cy="124" r="9" fill={CORAL} opacity="0.5" />
      <circle cx="156" cy="124" r="9" fill={CORAL} opacity="0.5" />
      {/* little star it's holding */}
      <path d="M171 158 l4 9 10 1 -7 7 2 10 -9 -5 -9 5 2 -10 -7 -7 10 -1 z" fill={YELLOW} stroke="#F2A03D" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Currency ───────────────────────────────────────────────────────────────────
type CurrencyCode = "USD" | "EUR" | "SEK";
const CURRENCY_ORDER: CurrencyCode[] = ["USD", "EUR", "SEK"];
const CURRENCIES: Record<CurrencyCode, { premium: string; period: string; freeIncome: string }> = {
  USD: { premium: "$9", period: "/month", freeIncome: "under $30,000 a year" },
  EUR: { premium: "€9", period: "/month", freeIncome: "under €30,000 a year" },
  SEK: { premium: "99 kr", period: "/month", freeIncome: "under 25,000 kr a month" },
};

function CurrencySwitcher({ value, onChange }: { value: CurrencyCode; onChange: (c: CurrencyCode) => void }) {
  return (
    <div role="group" aria-label="Choose currency"
      className="flex items-center gap-0.5 p-1 rounded-full" style={{ background: "#FFFFFF", boxShadow: SOFT_SHADOW }}>
      {CURRENCY_ORDER.map((code) => {
        const active = value === code;
        return (
          <button key={code} type="button" onClick={() => onChange(code)} aria-pressed={active}
            className="px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
            style={{ background: active ? TEAL : "transparent", color: active ? "#FFFFFF" : INK_SOFT }}>
            {code}
          </button>
        );
      })}
    </div>
  );
}

// ─── Animation helpers (gentle, reduced-motion aware) ───────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
function useReveal() {
  const reduce = useReducedMotion();
  return (delay = 0): Variants => ({
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
  });
}

// ─── Hero parent login (real form, hands off to /login child picker) ─────────────
function HeroLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    setError("");
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700));
    const parent = findParent(email, password);
    if (!parent) {
      setStatus("idle");
      setError("Enter a valid email and a password of at least 4 characters.");
      return;
    }
    setStatus("success");
    sessionStorage.setItem(PARENT_HANDOFF_KEY, JSON.stringify(parent));
    router.push("/login");
  }

  const busy = status !== "idle";
  const inputStyle = { background: PAPER, border: "2px solid #F0E6D2", color: INK } as const;

  return (
    <div className="w-full max-w-md mx-auto rounded-[28px] p-7 sm:p-8"
      style={{ background: SURFACE, boxShadow: "0 20px 50px rgba(45,42,38,0.12)" }}>
      <h2 className="text-2xl mb-1" style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK }}>
        Log in to your account
      </h2>
      <p className="text-sm mb-6" style={{ color: INK_SOFT }}>For grown-ups. Children sign in next!</p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="hero-email" className="block text-sm font-bold mb-1.5" style={{ color: INK }}>
            Email address
          </label>
          <input id="hero-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" autoComplete="email" required aria-invalid={!!error}
            className="w-full px-4 py-3.5 rounded-2xl text-sm font-semibold outline-none transition-shadow focus:ring-4 focus:ring-[#14A4B4]/25"
            style={inputStyle} />
        </div>

        <div>
          <label htmlFor="hero-password" className="block text-sm font-bold mb-1.5" style={{ color: INK }}>
            Password
          </label>
          <div className="relative">
            <input id="hero-password" type={showPw ? "text" : "password"} value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              autoComplete="current-password" required aria-invalid={!!error}
              className="w-full px-4 py-3.5 pr-16 rounded-2xl text-sm font-semibold outline-none transition-shadow focus:ring-4 focus:ring-[#14A4B4]/25"
              style={inputStyle} />
            <button type="button" onClick={() => setShowPw((s) => !s)}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-bold rounded-lg hover:opacity-70 transition-opacity cursor-pointer"
              style={{ color: TEAL_DEEP }}>
              {showPw ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="text-xs font-semibold px-3 py-2.5 rounded-xl"
            style={{ color: "#9C3848", background: "#FCEBED" }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={busy}
          className="w-full py-4 rounded-full text-white text-base flex items-center justify-center gap-2 transition-colors bg-[#14A4B4] hover:enabled:bg-[#0E808D] cursor-pointer disabled:cursor-default"
          style={{ fontFamily: DISPLAY, fontWeight: 600, opacity: busy ? 0.85 : 1 }}>
          {status === "loading" ? "Checking…" : status === "success" ? "Welcome!" : "Log in"}
          {status === "idle" && <ArrowIcon className="w-4 h-4" />}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px" style={{ background: "#F0E6D2" }} />
        <span className="text-xs font-bold" style={{ color: INK_SOFT }}>new here?</span>
        <div className="flex-1 h-px" style={{ background: "#F0E6D2" }} />
      </div>
      <Link href="#pricing"
        className="block w-full py-3.5 rounded-full text-center text-sm transition-colors hover:bg-[#E4F4F6]"
        style={{ fontFamily: DISPLAY, fontWeight: 600, border: `2px solid ${TEAL}`, color: TEAL_DEEP }}>
        See plans &amp; check if you qualify free
      </Link>
      <p className="text-center text-xs mt-3" style={{ color: INK_SOFT }}>
        Demo: any email + 4-character password
      </p>
    </div>
  );
}

// ─── A peek inside the games (product preview) ──────────────────────────────────
function GamePreview() {
  return (
    <div aria-hidden="true" className="w-full max-w-sm rounded-[28px] p-6"
      style={{ background: SURFACE, boxShadow: SOFT_SHADOW }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: SKY, color: TEAL_DEEP }}>
          Maths · Level 2
        </span>
        <span className="text-xs font-bold flex items-center gap-1" style={{ color: "#E59A1E" }}>★ 240</span>
      </div>
      <div className="h-2.5 rounded-full mb-5" style={{ background: "#F0E6D2" }}>
        <div className="h-2.5 rounded-full" style={{ width: "60%", background: GREEN }} />
      </div>
      <p className="text-3xl mb-5" style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK }}>7 × 8 = ?</p>
      <div className="grid grid-cols-2 gap-3">
        {[{ v: "54", ok: false }, { v: "56", ok: true }, { v: "63", ok: false }, { v: "48", ok: false }].map((a) => (
          <div key={a.v} className="py-3.5 rounded-2xl text-center font-bold"
            style={{
              background: a.ok ? GREEN : PAPER,
              color: a.ok ? "#FFFFFF" : INK,
              border: `2px solid ${a.ok ? GREEN : "#F0E6D2"}`,
            }}>
            {a.v}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Static content ─────────────────────────────────────────────────────────────
const blurbs = [
  { Icon: CalculatorIcon, title: "Maths, literacy & science", desc: "Three core subjects as friendly games — free for eligible families.", bg: SKY, color: TEAL_DEEP },
  { Icon: ChartIcon, title: "See real progress", desc: "A clear dashboard showing where your child shines and where they need a hand.", bg: MINT, color: "#2E8B5F" },
  { Icon: ShieldIcon, title: "Safe and ad-free", desc: "No ads and no distractions — a calm space built for families.", bg: BUTTER, color: "#B07A12" },
];

const steps = [
  { n: "1", title: "Create an account", desc: "Add your children by age — the games adapt to each level automatically.", Icon: BookIcon, color: TEAL },
  { n: "2", title: "Children play & learn", desc: "Short, friendly games and quizzes across maths, literacy and science.", Icon: PlayIcon, color: GREEN },
  { n: "3", title: "You follow along", desc: "Track results and strengths over time in the parent and teacher dashboard.", Icon: ChartIcon, color: YELLOW },
];

const ageGroups = [
  { range: "5–7", label: "Preschool", color: GREEN, bg: MINT },
  { range: "8–11", label: "Primary", color: TEAL_DEEP, bg: SKY },
  { range: "12–14", label: "Middle", color: "#B07A12", bg: BUTTER },
  { range: "15–17", label: "Secondary", color: "#C2603F", bg: "#FFEBE3" },
  { range: "18–20", label: "Sixth Form", color: "#9C3848", bg: "#FBE9EC" },
];

// ─── Page ────────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const reveal = useReveal();
  const c = CURRENCIES[currency];

  const pillPrimary = "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white transition-colors bg-[#14A4B4] hover:bg-[#0E808D]";
  const pillSecondary = "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white transition-colors hover:bg-[#E4F4F6]";

  return (
    <div className="min-h-screen" style={{ fontFamily: BODY, background: PAPER, color: INK }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-5 sm:px-8 py-3"
        style={{ background: "rgba(255,249,239,0.85)", backdropFilter: "blur(10px)" }}>
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: TEAL, color: "#FFFFFF" }}>
            <BookIcon className="w-5 h-5" />
          </span>
          <span className="text-2xl" style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK }}>
            Teach<span style={{ color: TEAL }}>More</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <CurrencySwitcher value={currency} onChange={setCurrency} />
          <Link href="#pricing" className="hidden sm:inline text-sm font-bold hover:opacity-70 transition-opacity" style={{ color: INK }}>
            Pricing
          </Link>
          <Link href="#login"
            className="px-5 py-2.5 rounded-full text-white text-sm transition-colors bg-[#14A4B4] hover:bg-[#0E808D]"
            style={{ fontFamily: DISPLAY, fontWeight: 600 }}>
            Log in
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* soft decorative blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute rounded-full" style={{ width: 360, height: 360, top: -120, right: -80, background: SKY, opacity: 0.7 }} />
          <div className="absolute rounded-full" style={{ width: 240, height: 240, bottom: -60, left: -60, background: BUTTER, opacity: 0.7 }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-28 sm:pt-32 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div initial="hidden" animate="visible" variants={reveal()}>
            <span className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full mb-6"
              style={{ background: YELLOW, color: "#5C3D00" }}>
              ★ Ages 5–20 · Free for eligible families
            </span>
            <h1 className="text-[2.75rem] sm:text-6xl leading-[1.02] mb-5" style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK }}>
              Learning that feels<br />
              <span style={{ color: TEAL }}>like playtime.</span>
            </h1>
            <p className="text-lg mb-8 max-w-md" style={{ color: INK_SOFT }}>
              Maths, literacy and science as friendly games for ages 5–20 — with a calm, clear progress dashboard for parents and teachers.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="#pricing" className={pillPrimary} style={{ fontFamily: DISPLAY, fontWeight: 600 }}>
                See plans <ArrowIcon className="w-4 h-4" />
              </Link>
              <Link href="/student" className={pillSecondary} style={{ fontFamily: DISPLAY, fontWeight: 600, color: TEAL_DEEP, border: `2px solid ${TEAL}` }}>
                <PlayIcon className="w-4 h-4" /> Explore the games
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold" style={{ color: INK_SOFT }}>
              <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4" style={{ color: GREEN }} /> No ads</span>
              <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4" style={{ color: GREEN }} /> Made for families</span>
              <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4" style={{ color: GREEN }} /> Cancel anytime</span>
            </div>

            <div className="hidden lg:block mt-8 -ml-4">
              <OwlMascot className="w-44 h-44" />
            </div>
          </motion.div>

          {/* Right: login (owl peeks on top) */}
          <motion.div id="login" className="scroll-mt-28 relative" initial="hidden" animate="visible" variants={reveal(0.1)}>
            <div className="lg:hidden flex justify-center mb-2">
              <OwlMascot className="w-32 h-32" />
            </div>
            <HeroLogin />
          </motion.div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal()}
            className="text-3xl sm:text-4xl text-center mb-3" style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK }}>
            Everything in one happy place
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal(0.05)}
            className="text-center mb-12 text-lg" style={{ color: INK_SOFT }}>
            Built to keep children curious and parents in the loop.
          </motion.p>
          <div className="grid sm:grid-cols-3 gap-6">
            {blurbs.map(({ Icon, title, desc, bg, color }, i) => (
              <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal(i * 0.1)}
                className="p-7 rounded-[28px]" style={{ background: bg }}>
                <span className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "#FFFFFF", color }}>
                  <Icon className="w-7 h-7" />
                </span>
                <h3 className="text-xl mb-2" style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK }}>{title}</h3>
                <p className="text-[15px] leading-relaxed" style={{ color: INK_SOFT }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works + peek inside */}
      <section className="py-20 px-6" style={{ background: SURFACE }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal()}
              className="text-3xl sm:text-4xl mb-3" style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK }}>
              How TeachMore works
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal(0.05)}
              className="mb-10 text-lg" style={{ color: INK_SOFT }}>
              Set it up once, then watch the progress grow.
            </motion.p>
            <div className="space-y-6">
              {steps.map(({ n, title, desc, Icon, color }, i) => (
                <motion.div key={n} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal(i * 0.1)}
                  className="flex gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: color }}>
                    <Icon className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="text-lg" style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK }}>
                      <span style={{ color }}>{n}.</span> {title}
                    </h3>
                    <p className="text-[15px] leading-relaxed" style={{ color: INK_SOFT }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal(0.15)}
            className="flex justify-center">
            <GamePreview />
          </motion.div>
        </div>
      </section>

      {/* Age groups */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal()}
            className="text-3xl sm:text-4xl text-center mb-3" style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK }}>
            Built for every age
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal(0.05)}
            className="text-center mb-12 text-lg" style={{ color: INK_SOFT }}>
            The games adapt to each child&apos;s level, preschool through sixth form.
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {ageGroups.map((g, i) => (
              <motion.div key={g.range} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal(i * 0.05)}
                className="text-center p-6 rounded-[24px]" style={{ background: g.bg }}>
                <div className="text-2xl mb-1" style={{ fontFamily: DISPLAY, fontWeight: 700, color: g.color }}>{g.range}</div>
                <div className="text-sm font-bold" style={{ color: INK_SOFT }}>{g.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 scroll-mt-24" style={{ background: SURFACE }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal()}
              className="text-3xl sm:text-4xl text-center mb-3" style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK }}>
              Simple, fair pricing
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal(0.05)}
              className="text-center mb-6 text-lg max-w-xl" style={{ color: INK_SOFT }}>
              Free for families on a lower income. Everyone else, one straightforward plan.
            </motion.p>
            <CurrencySwitcher value={currency} onChange={setCurrency} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
            {/* Free */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal()}
              className="p-8 rounded-[28px] flex flex-col" style={{ background: MINT }}>
              <h3 className="text-lg" style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK }}>Free</h3>
              <p className="text-sm mb-5" style={{ color: INK_SOFT }}>For eligible households</p>
              <p className="mb-1" style={{ fontFamily: DISPLAY }}>
                <span className="text-5xl font-bold" style={{ color: INK }}>0</span>
                <span className="text-base font-bold" style={{ color: INK_SOFT }}> {c.period}</span>
              </p>
              <p className="text-sm font-bold mb-6" style={{ color: "#2E8B5F" }}>Household income {c.freeIncome}</p>
              <ul className="space-y-3 mb-7 flex-1">
                {["Maths, literacy & science", "Adapted to every age 5–20", "Parent & teacher dashboard"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm font-semibold" style={{ color: INK }}>
                    <CheckIcon className="w-4 h-4" style={{ color: GREEN }} /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/login"
                className="block w-full py-3.5 rounded-full text-center transition-colors bg-white hover:bg-[#DCEFE3]"
                style={{ fontFamily: DISPLAY, fontWeight: 600, color: TEAL_DEEP, border: `2px solid ${TEAL}` }}>
                Apply for free access
              </Link>
              <p className="text-xs mt-3" style={{ color: INK_SOFT }}>Requires a short household eligibility form.</p>
            </motion.div>

            {/* Premium */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal(0.08)}
              className="p-8 rounded-[28px] flex flex-col relative text-white" style={{ background: TEAL }}>
              <span className="absolute top-7 right-7 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: YELLOW, color: "#5C3D00" }}>
                ★ POPULAR
              </span>
              <h3 className="text-lg" style={{ fontFamily: DISPLAY, fontWeight: 600 }}>Premium</h3>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.8)" }}>For everyone else</p>
              <p className="mb-1" style={{ fontFamily: DISPLAY }}>
                <span className="text-5xl font-bold">{c.premium}</span>
                <span className="text-base font-bold" style={{ color: "rgba(255,255,255,0.8)" }}> {c.period}</span>
              </p>
              <p className="text-sm font-bold mb-6" style={{ color: "rgba(255,255,255,0.9)" }}>No eligibility form needed</p>
              <ul className="space-y-3 mb-7 flex-1">
                {["Everything in Free", "All subjects & levels", "Up to 4 children per account", "Detailed progress insights"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm font-semibold">
                    <CheckIcon className="w-4 h-4" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/login"
                className="block w-full py-3.5 rounded-full text-center transition-transform hover:scale-[1.02] bg-white"
                style={{ fontFamily: DISPLAY, fontWeight: 600, color: TEAL_DEEP }}>
                Start Premium
              </Link>
              <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.75)" }}>Billed monthly. Cancel anytime.</p>
            </motion.div>
          </div>

          <p className="text-center text-xs mt-8 max-w-xl mx-auto" style={{ color: INK_SOFT }}>
            Free access also applies if household income is under 25,000 kr a month, €30,000 a year, or $30,000 a year.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center" style={{ background: PAPER }}>
        <div className="flex items-center justify-center gap-2 mb-1">
          <OwlMascot className="w-10 h-10" />
          <span className="text-xl" style={{ fontFamily: DISPLAY, fontWeight: 700, color: TEAL }}>TeachMore</span>
        </div>
        <p className="text-sm" style={{ color: INK_SOFT }}>Learn. Play. Grow.</p>
      </footer>
    </div>
  );
}
