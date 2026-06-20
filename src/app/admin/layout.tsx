"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/admin", label: "Overview", icon: "🏠" },
  { href: "/admin/classrooms", label: "Classrooms", icon: "🏫" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/backoffice", label: "Back to Backoffice", icon: "← 📊" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "var(--font-inter), sans-serif", background: "#F1F5F9" }}>
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 flex flex-col h-full" style={{ background: "#1E293B", borderRight: "1px solid #334155" }}>
        <div className="flex items-center gap-2 px-5 py-5" style={{ borderBottom: "1px solid #334155" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg, #6366F1, #7C3AED)" }}>📚</div>
          <span className="text-lg font-black text-white">Admin</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div whileHover={{ x: 2 }} className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all"
                  style={{ background: active ? "rgba(99,102,241,0.15)" : "transparent", color: active ? "#6366F1" : "#94A3B8", borderLeft: active ? "3px solid #6366F1" : "3px solid transparent" }}>
                  <span>{item.icon}</span>
                  <span className="font-semibold text-sm">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
