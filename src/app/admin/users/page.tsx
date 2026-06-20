"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { students as initialStudents, teachers as initialTeachers, classrooms } from "@/lib/mockData";
import { Student, Teacher } from "@/lib/types";

type Tab = "students" | "teachers";

const ageGroupOptions = ["preschool", "primary", "middle", "secondary", "sixthform"];
const roleOptions: Teacher["role"][] = ["teacher", "parent", "admin"];

export default function UsersPage() {
  const [tab, setTab] = useState<Tab>("students");
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const [studentForm, setStudentForm] = useState({ name: "", age: 10, ageGroup: "primary", classroomId: "c1" });
  const [teacherForm, setTeacherForm] = useState({ name: "", email: "", role: "teacher" as Teacher["role"] });

  const filteredStudents = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
  const filteredTeachers = teachers.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  function addStudent() {
    if (!studentForm.name.trim()) return;
    const initials = studentForm.name.split(" ").map((w) => w[0]).join("").toUpperCase();
    setStudents((p) => [...p, {
      id: `s${Date.now()}`, name: studentForm.name, age: studentForm.age,
      ageGroup: studentForm.ageGroup as Student["ageGroup"],
      classroomId: studentForm.classroomId, avatar: initials, joinedAt: new Date().toISOString(),
    }]);
    setStudentForm({ name: "", age: 10, ageGroup: "primary", classroomId: "c1" });
    setShowModal(false);
  }

  function addTeacher() {
    if (!teacherForm.name.trim()) return;
    const initials = teacherForm.name.split(" ").map((w) => w[0]).join("").toUpperCase();
    setTeachers((p) => [...p, {
      id: `t${Date.now()}`, name: teacherForm.name, email: teacherForm.email,
      role: teacherForm.role, classroomIds: [], avatar: initials,
    }]);
    setTeacherForm({ name: "", email: "", role: "teacher" });
    setShowModal(false);
  }

  function removeStudent(id: string) { setStudents((p) => p.filter((s) => s.id !== id)); }
  function removeTeacher(id: string) { setTeachers((p) => p.filter((t) => t.id !== id)); }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Users</h1>
          <p className="text-gray-500">Manage students, teachers, and parents</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="px-6 py-3 rounded-xl text-white font-bold text-sm flex items-center gap-2"
          style={{ background: "linear-gradient(135deg, #6366F1, #7C3AED)" }}>
          ➕ Add {tab === "students" ? "Student" : "Teacher/Parent"}
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1 rounded-2xl w-fit" style={{ background: "#E2E8F0" }}>
        {(["students", "teachers"] as Tab[]).map((t) => (
          <motion.button key={t} onClick={() => setTab(t)}
            className="px-6 py-2.5 rounded-xl font-bold text-sm capitalize transition-all"
            style={{ background: tab === t ? "white" : "transparent", color: tab === t ? "#1E1B4B" : "#64748B", boxShadow: tab === t ? "0 2px 8px rgba(0,0,0,0.08)" : "none" }}>
            {t === "students" ? `👦 Students (${students.length})` : `👩‍🏫 Teachers & Parents (${teachers.length})`}
          </motion.button>
        ))}
      </div>

      {/* Search */}
      <input value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder={`🔍 Search ${tab}...`}
        className="mb-6 w-full max-w-sm px-4 py-2.5 rounded-xl border text-sm outline-none"
        style={{ border: "1px solid #E2E8F0", background: "white" }} />

      {/* Students table */}
      {tab === "students" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
          <table className="w-full text-sm">
            <thead style={{ background: "#F8FAFC" }}>
              <tr>
                {["Student", "Age", "Age Group", "Classroom", "Joined", ""].map((h) => (
                  <th key={h} className="text-left py-4 px-5 font-semibold text-gray-400 text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredStudents.map((s) => {
                  const room = classrooms.find((c) => c.id === s.classroomId);
                  return (
                    <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 transition-colors" style={{ borderTop: "1px solid #F1F5F9" }}>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black"
                            style={{ background: "#EDE9FE", color: "#7C3AED" }}>{s.avatar}</div>
                          <span className="font-semibold text-gray-900">{s.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-gray-600">{s.age}</td>
                      <td className="py-4 px-5">
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize" style={{ background: "#EDE9FE", color: "#7C3AED" }}>{s.ageGroup}</span>
                      </td>
                      <td className="py-4 px-5 text-gray-600">{room?.name || "—"}</td>
                      <td className="py-4 px-5 text-gray-400">{new Date(s.joinedAt).toLocaleDateString("en-GB")}</td>
                      <td className="py-4 px-5">
                        <button onClick={() => removeStudent(s.id)} className="text-gray-300 hover:text-red-400 transition-colors font-bold">×</button>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Teachers table */}
      {tab === "teachers" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
          <table className="w-full text-sm">
            <thead style={{ background: "#F8FAFC" }}>
              <tr>
                {["Name", "Email", "Role", "Classes", ""].map((h) => (
                  <th key={h} className="text-left py-4 px-5 font-semibold text-gray-400 text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredTeachers.map((t) => (
                  <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors" style={{ borderTop: "1px solid #F1F5F9" }}>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black"
                          style={{ background: "#ECFDF5", color: "#059669" }}>{t.avatar}</div>
                        <span className="font-semibold text-gray-900">{t.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-gray-600">{t.email}</td>
                    <td className="py-4 px-5">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
                        style={{ background: t.role === "admin" ? "#FFF1F2" : t.role === "teacher" ? "#ECFDF5" : "#FFFBEB", color: t.role === "admin" ? "#DC2626" : t.role === "teacher" ? "#059669" : "#D97706" }}>
                        {t.role}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-gray-600">{t.classroomIds.length}</td>
                    <td className="py-4 px-5">
                      <button onClick={() => removeTeacher(t.id)} className="text-gray-300 hover:text-red-400 transition-colors font-bold">×</button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Add modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {tab === "students" ? "Add Student" : "Add Teacher/Parent"}
              </h2>

              {tab === "students" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input value={studentForm.name} onChange={(e) => setStudentForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Emma Thompson"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                      <input type="number" min={5} max={20} value={studentForm.age} onChange={(e) => setStudentForm((p) => ({ ...p, age: Number(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Age Group</label>
                      <select value={studentForm.ageGroup} onChange={(e) => setStudentForm((p) => ({ ...p, ageGroup: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                        {ageGroupOptions.map((g) => <option key={g} value={g} className="capitalize">{g}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Classroom</label>
                    <select value={studentForm.classroomId} onChange={(e) => setStudentForm((p) => ({ ...p, classroomId: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                      {classrooms.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <motion.button whileHover={{ scale: 1.03 }} onClick={addStudent}
                      className="flex-1 py-3 rounded-xl text-white font-bold" style={{ background: "linear-gradient(135deg, #6366F1, #7C3AED)" }}>
                      Add Student
                    </motion.button>
                    <button onClick={() => setShowModal(false)} className="px-5 py-3 rounded-xl font-bold" style={{ background: "#F1F5F9", color: "#64748B" }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input value={teacherForm.name} onChange={(e) => setTeacherForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Dr. Lisa Chen"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input type="email" value={teacherForm.email} onChange={(e) => setTeacherForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="e.g. lisa@school.se"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                    <select value={teacherForm.role} onChange={(e) => setTeacherForm((p) => ({ ...p, role: e.target.value as Teacher["role"] }))}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                      {roleOptions.map((r) => <option key={r} value={r} className="capitalize">{r}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <motion.button whileHover={{ scale: 1.03 }} onClick={addTeacher}
                      className="flex-1 py-3 rounded-xl text-white font-bold" style={{ background: "linear-gradient(135deg, #6366F1, #7C3AED)" }}>
                      Add User
                    </motion.button>
                    <button onClick={() => setShowModal(false)} className="px-5 py-3 rounded-xl font-bold" style={{ background: "#F1F5F9", color: "#64748B" }}>Cancel</button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
