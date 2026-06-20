"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { students, classrooms, teachers } from "@/lib/mockData";

export default function AdminOverview() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Overview</h1>
        <p className="text-gray-500">Manage your school, classrooms, and users</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Classrooms", value: classrooms.length, icon: "🏫", color: "#6366F1", href: "/admin/classrooms" },
          { label: "Students", value: students.length, icon: "👦", color: "#10B981", href: "/admin/users" },
          { label: "Teachers", value: teachers.filter((t) => t.role === "teacher").length, icon: "👩‍🏫", color: "#F59E0B", href: "/admin/users" },
          { label: "Parents", value: teachers.filter((t) => t.role === "parent").length, icon: "👨‍👩‍👦", color: "#F43F5E", href: "/admin/users" },
        ].map((k, i) => (
          <Link href={k.href} key={k.label}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="p-6 rounded-2xl bg-white cursor-pointer" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div className="text-3xl mb-3">{k.icon}</div>
              <div className="text-3xl font-black mb-1" style={{ color: k.color }}>{k.value}</div>
              <div className="text-sm font-semibold text-gray-500">{k.label}</div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Create Classroom", icon: "➕", desc: "Add a new class and assign a teacher", href: "/admin/classrooms", color: "#6366F1" },
          { label: "Add Student", icon: "👦", desc: "Enrol a new student into a class", href: "/admin/users", color: "#10B981" },
          { label: "Add Teacher / Parent", icon: "👩‍🏫", desc: "Invite a new teacher or parent", href: "/admin/users", color: "#F59E0B" },
        ].map((a) => (
          <Link href={a.href} key={a.label}>
            <motion.div whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.98 }}
              className="p-6 rounded-2xl bg-white cursor-pointer" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div className="text-3xl mb-3">{a.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{a.label}</h3>
              <p className="text-sm text-gray-500">{a.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Classroom list */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">All Classrooms</h2>
          <Link href="/admin/classrooms" className="text-sm font-semibold hover:underline" style={{ color: "#6366F1" }}>Manage →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                {["Classroom", "Teacher", "Students", "Age Group", "Subjects"].map((h) => (
                  <th key={h} className="text-left py-3 px-2 font-semibold text-gray-400 text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classrooms.map((c) => {
                const teacher = teachers.find((t) => t.id === c.teacherId);
                return (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td className="py-3 px-2 font-semibold text-gray-900">{c.name}</td>
                    <td className="py-3 px-2 text-gray-600">{teacher?.name || "—"}</td>
                    <td className="py-3 px-2">
                      <span className="font-bold" style={{ color: "#6366F1" }}>{c.studentIds.length}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize" style={{ background: "#EDE9FE", color: "#7C3AED" }}>{c.ageGroup}</span>
                    </td>
                    <td className="py-3 px-2 text-gray-500 capitalize">{c.subjects.join(", ")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
