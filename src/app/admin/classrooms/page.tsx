"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classrooms as initialClassrooms, teachers, students } from "@/lib/mockData";
import { Classroom } from "@/lib/types";

type NewClass = { name: string; teacherId: string; ageGroup: string; subjects: string[] };
const subjectOptions = ["math", "science", "english", "history", "geography"];

export default function ClassroomsPage() {
  const [rooms, setRooms] = useState<Classroom[]>(initialClassrooms);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<NewClass>({ name: "", teacherId: "t1", ageGroup: "primary", subjects: [] });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function toggleSubject(s: string) {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(s) ? prev.subjects.filter((x) => x !== s) : [...prev.subjects, s],
    }));
  }

  function createRoom() {
    if (!form.name.trim()) return;
    const newRoom: Classroom = {
      id: `c${Date.now()}`,
      name: form.name,
      teacherId: form.teacherId,
      studentIds: [],
      subjects: form.subjects as Classroom["subjects"],
      ageGroup: form.ageGroup as Classroom["ageGroup"],
      createdAt: new Date().toISOString(),
    };
    setRooms((p) => [...p, newRoom]);
    setForm({ name: "", teacherId: "t1", ageGroup: "primary", subjects: [] });
    setShowModal(false);
  }

  function deleteRoom(id: string) {
    setRooms((p) => p.filter((r) => r.id !== id));
    setDeleteId(null);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Classrooms</h1>
          <p className="text-gray-500">{rooms.length} classrooms configured</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="px-6 py-3 rounded-xl text-white font-bold text-sm flex items-center gap-2"
          style={{ background: "linear-gradient(135deg, #6366F1, #7C3AED)" }}>
          ➕ New Classroom
        </motion.button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {rooms.map((c) => {
            const teacher = teachers.find((t) => t.id === c.teacherId);
            const studentCount = c.studentIds.length;
            return (
              <motion.div key={c.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "#EDE9FE" }}>🏫</div>
                  <button onClick={() => setDeleteId(c.id)} className="text-gray-300 hover:text-red-400 transition-colors text-xl">×</button>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{c.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{teacher?.name || "No teacher"}</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize" style={{ background: "#EDE9FE", color: "#7C3AED" }}>{c.ageGroup}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "#ECFDF5", color: "#059669" }}>{studentCount} students</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {c.subjects.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize" style={{ background: "#F1F5F9", color: "#64748B" }}>{s}</span>
                  ))}
                </div>
                <div className="mt-4 pt-4" style={{ borderTop: "1px solid #F1F5F9" }}>
                  <p className="text-xs text-gray-400">Created {new Date(c.createdAt).toLocaleDateString("en-GB")}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Add card */}
        <motion.button whileHover={{ scale: 1.03, y: -4 }} onClick={() => setShowModal(true)}
          className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed transition-all"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04)", borderColor: "#DDD6FE", minHeight: 200 }}>
          <div className="text-4xl mb-3">➕</div>
          <p className="font-bold" style={{ color: "#7C3AED" }}>Add Classroom</p>
        </motion.button>
      </div>

      {/* Create modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Classroom</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Classroom Name *</label>
                  <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Year 5 — Curious Minds"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                    style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Assign Teacher</label>
                  <select value={form.teacherId} onChange={(e) => setForm((p) => ({ ...p, teacherId: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                    {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Age Group</label>
                  <select value={form.ageGroup} onChange={(e) => setForm((p) => ({ ...p, ageGroup: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                    {["preschool", "primary", "middle", "secondary", "sixthform"].map((g) => (
                      <option key={g} value={g} className="capitalize">{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subjects</label>
                  <div className="flex flex-wrap gap-2">
                    {subjectOptions.map((s) => (
                      <button key={s} onClick={() => toggleSubject(s)}
                        className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all capitalize"
                        style={{ background: form.subjects.includes(s) ? "#6366F1" : "#F1F5F9", color: form.subjects.includes(s) ? "white" : "#64748B" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={createRoom}
                  className="flex-1 py-3 rounded-xl text-white font-bold" style={{ background: "linear-gradient(135deg, #6366F1, #7C3AED)" }}>
                  Create Classroom
                </motion.button>
                <button onClick={() => setShowModal(false)}
                  className="px-5 py-3 rounded-xl font-bold" style={{ background: "#F1F5F9", color: "#64748B" }}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Classroom?</h2>
              <p className="text-gray-500 text-sm mb-6">This will remove the classroom and all its associations. Students won&apos;t be deleted.</p>
              <div className="flex gap-3">
                <button onClick={() => deleteRoom(deleteId)}
                  className="flex-1 py-3 rounded-xl font-bold text-white" style={{ background: "#EF4444" }}>Delete</button>
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 py-3 rounded-xl font-bold" style={{ background: "#F1F5F9", color: "#64748B" }}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
