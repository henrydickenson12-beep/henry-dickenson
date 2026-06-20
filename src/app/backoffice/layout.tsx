"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/backoffice", label: "Overview", icon: "📊" },
  { href: "/backoffice/students", label: "Students", icon: "👥" },
  { href: "/backoffice/suggestions", label: "AI Suggestions", icon: "🤖" },
  { href: "/admin", label: "Admin", icon: "⚙️" },
];

export default function BackofficeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "var(--font-inter), sans-serif", background: "#0F172A" }}>
      {/* Sidebar */}
      <motion.aside animate={{ width: collapsed ? 72 : 240 }} transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-shrink-0 flex flex-col h-full overflow-hidden"
        style={{ background: "#1E293B", borderRight: "1px solid #334155" }}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: "1px solid #334155" }}>
          <div className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center text-lg"
            style={{ background: "linear-gradient(135deg, #47A8BD, #1E3888)" }}>📚</div>
          {!collapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black text-white">
              Teach<span style={{ color: "#47A8BD" }}>More</span>
            </motion.span>
          )}
        </div>

        {/* Teacher info */}
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 py-4" style={{ borderBottom: "1px solid #334155" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
                style={{ background: "linear-gradient(135deg, #47A8BD, #1E3888)", color: "white" }}>SJ</div>
              <div>
                <p className="font-bold text-white text-sm">Ms. Sarah Jensen</p>
                <p className="text-xs" style={{ color: "#64748B" }}>Teacher · 2 Classes</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/backoffice" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <motion.div whileHover={{ x: 2 }}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all cursor-pointer"
                  style={{
                    background: active ? "rgba(99,102,241,0.15)" : "transparent",
                    color: active ? "#47A8BD" : "#94A3B8",
                    borderLeft: active ? "3px solid #47A8BD" : "3px solid transparent",
                  }}>
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-semibold text-sm">
                      {item.label}
                    </motion.span>
                  )}
                  {!collapsed && active && (
                    <motion.div className="ml-auto w-2 h-2 rounded-full" style={{ background: "#47A8BD" }}
                      layoutId="activeIndicator" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-4 space-y-1" style={{ borderTop: "1px solid #334155", paddingTop: "12px" }}>
          <Link href="/">
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer hover:bg-white/5 transition-colors" style={{ color: "#64748B" }}>
              <span className="text-xl">🏠</span>
              {!collapsed && <span className="font-semibold text-sm">Back to Home</span>}
            </div>
          </Link>
          <button onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors" style={{ color: "#64748B" }}>
            <span className="text-xl">{collapsed ? "→" : "←"}</span>
            {!collapsed && <span className="font-semibold text-sm">Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
