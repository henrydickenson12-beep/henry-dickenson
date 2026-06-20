"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const floatingItems = [
  { emoji: "🧮", delay: 0, x: "10%", y: "20%" },
  { emoji: "🔬", delay: 0.3, x: "80%", y: "15%" },
  { emoji: "📚", delay: 0.6, x: "15%", y: "70%" },
  { emoji: "🌍", delay: 0.9, x: "75%", y: "65%" },
  { emoji: "⭐", delay: 1.2, x: "50%", y: "10%" },
  { emoji: "🎯", delay: 1.5, x: "85%", y: "40%" },
  { emoji: "🚀", delay: 0.4, x: "5%", y: "45%" },
  { emoji: "💡", delay: 0.8, x: "60%", y: "80%" },
];

const features = [
  { icon: "🎮", title: "Games & Quizzes", desc: "Age-adapted interactive games that make learning genuinely fun", bg: "#F3F0FF" },
  { icon: "📊", title: "Smart Analytics", desc: "See exactly where each student shines and where they need support", bg: "#F0FDF9" },
  { icon: "🤖", title: "AI Suggestions", desc: "Claude AI analyses performance and recommends the next best task", bg: "#FFFBEB" },
  { icon: "🏫", title: "Classroom Tools", desc: "Create classrooms, manage students, assign tasks — all in one place", bg: "#FFF1F2" },
];

const ageGroups = [
  { range: "5–7", label: "Preschool", emoji: "🌱", color: "#10B981" },
  { range: "8–11", label: "Primary", emoji: "📖", color: "#7C3AED" },
  { range: "12–14", label: "Middle", emoji: "🔭", color: "#06B6D4" },
  { range: "15–17", label: "Secondary", emoji: "⚗️", color: "#F59E0B" },
  { range: "18–20", label: "Sixth Form", emoji: "🎓", color: "#F43F5E" },
];

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-nunito), sans-serif", background: "#FFF8F0" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(255,248,240,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ background: "linear-gradient(135deg, #7C3AED, #6366F1)" }}>📚</div>
          <span className="text-2xl font-black" style={{ color: "#1E1B4B" }}>
            Teach<span style={{ color: "#7C3AED" }}>More</span>
          </span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
          <Link href="/login" className="px-4 py-2 rounded-xl font-bold transition-all" style={{ color: "#7C3AED", fontWeight: 700 }}>
            Teacher Login
          </Link>
          <Link href="/login"
            className="px-5 py-2.5 rounded-xl text-white font-black text-sm transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #7C3AED, #6366F1)", fontWeight: 800 }}>
            Play &amp; Learn
          </Link>
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {floatingItems.map((item, i) => (
          <motion.div key={i} className="absolute text-4xl pointer-events-none select-none"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1, y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{
              opacity: { delay: item.delay, duration: 0.5 },
              scale: { delay: item.delay, duration: 0.5 },
              y: { delay: item.delay, duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { delay: item.delay, duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}>
            {item.emoji}
          </motion.div>
        ))}

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
            style={{ background: "#EDE9FE", color: "#7C3AED", fontWeight: 700 }}>
            ✨ Now with AI-powered personalised learning
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-7xl font-black mb-6 leading-tight" style={{ color: "#1E1B4B" }}>
            Where Kids
            <span className="block" style={{ background: "linear-gradient(135deg, #7C3AED, #F43F5E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Love to Learn
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Fun games and quizzes for ages 5–20, with smart dashboards for teachers and parents to track progress and get AI-powered suggestions.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login"
              className="px-8 py-4 rounded-2xl text-white font-black text-xl transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #7C3AED, #6366F1)", fontWeight: 900 }}>
              🎮 Start Playing Now
            </Link>
            <Link href="/backoffice"
              className="px-8 py-4 rounded-2xl font-black text-xl border-2 transition-all hover:scale-105 bg-white"
              style={{ color: "#7C3AED", borderColor: "#7C3AED", fontWeight: 900 }}>
              📊 Teacher Dashboard
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mt-12">
            {[["Ages 5–20", "🎂"], ["5 Subjects", "📚"], ["AI-Powered", "🤖"], ["Free to Try", "🎉"]].map(([label, icon]) => (
              <div key={label} className="px-5 py-2.5 rounded-2xl font-bold text-gray-700"
                style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                {icon} {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl font-black text-center mb-3" style={{ color: "#1E1B4B" }}>
              Built for Every Age
            </motion.h2>
            <motion.p variants={fadeUp} className="text-center text-gray-500 mb-10 text-lg">
              Content automatically adapts to your child&apos;s level
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {ageGroups.map((group) => (
                <motion.div key={group.range} variants={fadeUp}
                  className="text-center p-6 rounded-3xl cursor-pointer transition-all"
                  style={{ background: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
                  whileHover={{ y: -6, scale: 1.03 }}>
                  <div className="text-4xl mb-3">{group.emoji}</div>
                  <div className="text-2xl font-black mb-1" style={{ color: group.color }}>{group.range}</div>
                  <div className="text-sm font-semibold text-gray-500">{group.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6" style={{ background: "white" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl font-black text-center mb-3" style={{ color: "#1E1B4B" }}>
              Everything You Need
            </motion.h2>
            <motion.p variants={fadeUp} className="text-center text-gray-500 mb-12 text-lg">
              One platform for students, teachers, and parents
            </motion.p>
            <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-6">
              {features.map((f) => (
                <motion.div key={f.title} variants={fadeUp}
                  className="p-8 rounded-3xl"
                  style={{ background: f.bg, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                  whileHover={{ y: -4, scale: 1.01 }}>
                  <div className="text-5xl mb-4">{f.icon}</div>
                  <h3 className="text-2xl font-black mb-2" style={{ color: "#1E1B4B" }}>{f.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl font-black text-center mb-12" style={{ color: "#1E1B4B" }}>
              How TeachMore Works
            </motion.h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Set Up Your Classroom", desc: "Create a class, add students by age group, and pick subjects.", icon: "🏫", color: "#7C3AED" },
                { step: "2", title: "Kids Play & Learn", desc: "Students log in and play fun, age-adapted games and quizzes.", icon: "🎮", color: "#10B981" },
                { step: "3", title: "You Get Insights", desc: "See real-time results, strengths, weaknesses, and AI suggestions.", icon: "📊", color: "#F59E0B" },
              ].map((item) => (
                <motion.div key={item.step} variants={fadeUp} className="text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 text-white"
                    style={{ background: `linear-gradient(135deg, ${item.color}CC, ${item.color})` }}>
                    {item.icon}
                  </div>
                  <div className="text-sm font-black mb-2" style={{ color: item.color }}>STEP {item.step}</div>
                  <h3 className="text-xl font-black mb-2" style={{ color: "#1E1B4B" }}>{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="max-w-3xl mx-auto text-center p-12 rounded-[40px] text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #06B6D4 100%)" }}>
          <h2 className="text-4xl font-black mb-4">Start Teaching Smarter Today</h2>
          <p className="text-white/80 text-lg mb-8">Join thousands of teachers and parents using TeachMore</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/student"
              className="px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105"
              style={{ background: "white", color: "#7C3AED", fontWeight: 900 }}>
              🎮 Student Portal
            </Link>
            <Link href="/backoffice"
              className="px-8 py-4 rounded-2xl font-black text-lg border-2 border-white transition-all hover:scale-105 hover:bg-white/10"
              style={{ color: "white", fontWeight: 900 }}>
              📊 Backoffice
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm" style={{ borderTop: "1px solid #F0E8FF" }}>
        <span className="font-black" style={{ color: "#7C3AED" }}>TeachMore</span> — Learn. Play. Grow.
      </footer>
    </div>
  );
}
