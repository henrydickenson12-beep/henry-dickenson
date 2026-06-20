import { Student, Classroom, Teacher, GameResult, SubjectPerformance, AISuggestion } from "./types";

export const teachers: Teacher[] = [
  { id: "t1", name: "Ms. Sarah Jensen", email: "sarah@teachmore.io", role: "teacher", classroomIds: ["c1", "c2"], avatar: "SJ" },
  { id: "t2", name: "Mr. Erik Lindqvist", email: "erik@teachmore.io", role: "teacher", classroomIds: ["c3"], avatar: "EL" },
  { id: "t3", name: "Anna (Parent)", email: "anna@home.com", role: "parent", classroomIds: ["c4"], avatar: "AP" },
];

export const students: Student[] = [
  { id: "s1", name: "Oliver Magnusson", age: 9, ageGroup: "primary", classroomId: "c1", avatar: "OM", joinedAt: "2025-09-01" },
  { id: "s2", name: "Lila Bergström", age: 10, ageGroup: "primary", classroomId: "c1", avatar: "LB", joinedAt: "2025-09-01" },
  { id: "s3", name: "Noah Ek", age: 8, ageGroup: "primary", classroomId: "c1", avatar: "NE", joinedAt: "2025-09-01" },
  { id: "s4", name: "Freya Holmberg", age: 14, ageGroup: "secondary", classroomId: "c2", avatar: "FH", joinedAt: "2025-09-01" },
  { id: "s5", name: "Lucas Strand", age: 15, ageGroup: "secondary", classroomId: "c2", avatar: "LS", joinedAt: "2025-09-01" },
  { id: "s6", name: "Maja Svensson", age: 6, ageGroup: "preschool", classroomId: "c4", avatar: "MS", joinedAt: "2026-01-10" },
];

export const classrooms: Classroom[] = [
  { id: "c1", name: "Year 4 - Sunshine Class", teacherId: "t1", studentIds: ["s1", "s2", "s3"], subjects: ["math", "science", "english"], ageGroup: "primary", createdAt: "2025-09-01" },
  { id: "c2", name: "Year 10 - Discovery Class", teacherId: "t1", studentIds: ["s4", "s5"], subjects: ["math", "science", "history", "geography"], ageGroup: "secondary", createdAt: "2025-09-01" },
  { id: "c3", name: "Year 7 - Explorer Class", teacherId: "t2", studentIds: [], subjects: ["math", "science", "english", "history"], ageGroup: "middle", createdAt: "2025-09-01" },
  { id: "c4", name: "Home - Maja", teacherId: "t3", studentIds: ["s6"], subjects: ["math", "english"], ageGroup: "preschool", createdAt: "2026-01-10" },
];

export const gameResults: GameResult[] = [
  { id: "r1", studentId: "s1", subject: "math", topic: "Multiplication", score: 7, totalQuestions: 10, timeSpent: 240, completedAt: "2026-06-20T09:15:00Z", ageGroup: "primary", difficulty: "medium" },
  { id: "r2", studentId: "s1", subject: "math", topic: "Division", score: 4, totalQuestions: 10, timeSpent: 310, completedAt: "2026-06-19T10:00:00Z", ageGroup: "primary", difficulty: "medium" },
  { id: "r3", studentId: "s1", subject: "science", topic: "Animals", score: 9, totalQuestions: 10, timeSpent: 180, completedAt: "2026-06-18T14:30:00Z", ageGroup: "primary", difficulty: "easy" },
  { id: "r4", studentId: "s1", subject: "math", topic: "Fractions", score: 5, totalQuestions: 10, timeSpent: 350, completedAt: "2026-06-17T11:00:00Z", ageGroup: "primary", difficulty: "hard" },
  { id: "r5", studentId: "s1", subject: "english", topic: "Spelling", score: 8, totalQuestions: 10, timeSpent: 200, completedAt: "2026-06-16T09:00:00Z", ageGroup: "primary", difficulty: "medium" },
  { id: "r6", studentId: "s2", subject: "math", topic: "Multiplication", score: 10, totalQuestions: 10, timeSpent: 190, completedAt: "2026-06-20T09:20:00Z", ageGroup: "primary", difficulty: "medium" },
  { id: "r7", studentId: "s2", subject: "science", topic: "Plants", score: 8, totalQuestions: 10, timeSpent: 220, completedAt: "2026-06-19T14:00:00Z", ageGroup: "primary", difficulty: "easy" },
  { id: "r8", studentId: "s3", subject: "math", topic: "Addition", score: 6, totalQuestions: 10, timeSpent: 280, completedAt: "2026-06-20T10:00:00Z", ageGroup: "primary", difficulty: "easy" },
  { id: "r9", studentId: "s4", subject: "math", topic: "Algebra", score: 6, totalQuestions: 10, timeSpent: 420, completedAt: "2026-06-20T08:30:00Z", ageGroup: "secondary", difficulty: "hard" },
  { id: "r10", studentId: "s4", subject: "science", topic: "Chemistry", score: 9, totalQuestions: 10, timeSpent: 300, completedAt: "2026-06-19T13:00:00Z", ageGroup: "secondary", difficulty: "hard" },
  { id: "r11", studentId: "s5", subject: "math", topic: "Geometry", score: 8, totalQuestions: 10, timeSpent: 360, completedAt: "2026-06-20T09:00:00Z", ageGroup: "secondary", difficulty: "hard" },
];

export const subjectPerformance: Record<string, SubjectPerformance[]> = {
  s1: [
    { subject: "math", averageScore: 53, gamesPlayed: 8, trend: "down", weakTopics: ["Division", "Fractions"], strongTopics: ["Addition", "Subtraction"] },
    { subject: "science", averageScore: 90, gamesPlayed: 4, trend: "up", weakTopics: [], strongTopics: ["Animals", "Plants"] },
    { subject: "english", averageScore: 80, gamesPlayed: 3, trend: "stable", weakTopics: [], strongTopics: ["Spelling"] },
  ],
  s2: [
    { subject: "math", averageScore: 95, gamesPlayed: 5, trend: "up", weakTopics: [], strongTopics: ["Multiplication", "Division"] },
    { subject: "science", averageScore: 82, gamesPlayed: 3, trend: "up", weakTopics: [], strongTopics: ["Plants"] },
  ],
  s3: [
    { subject: "math", averageScore: 62, gamesPlayed: 4, trend: "stable", weakTopics: ["Addition"], strongTopics: [] },
  ],
  s4: [
    { subject: "math", averageScore: 60, gamesPlayed: 6, trend: "down", weakTopics: ["Algebra"], strongTopics: ["Geometry"] },
    { subject: "science", averageScore: 88, gamesPlayed: 5, trend: "up", weakTopics: [], strongTopics: ["Chemistry", "Physics"] },
  ],
};

export const aiSuggestions: AISuggestion[] = [
  {
    id: "ai1", studentId: "s1", type: "focus", subject: "math",
    title: "Extra Division Practice", description: "Oliver scored 4/10 on Division twice this week.",
    reason: "Consistent low scores on Division suggest the concept hasn't fully clicked yet.",
    priority: "high", generatedAt: "2026-06-20T12:00:00Z"
  },
  {
    id: "ai2", studentId: "s1", type: "game", subject: "math",
    title: "Try the Fraction Pizza Game", description: "A visual fractions game designed for ages 8-10.",
    reason: "Visual learners respond better to fraction concepts when shown as parts of a whole.",
    priority: "high", generatedAt: "2026-06-20T12:00:00Z"
  },
  {
    id: "ai3", studentId: "s1", type: "homework", subject: "science",
    title: "Assign an Ecosystem Quiz", description: "Oliver is excelling in Science — time to challenge him with ecosystems.",
    reason: "90% average in Science — ready for more advanced topics.",
    priority: "medium", generatedAt: "2026-06-20T12:00:00Z"
  },
];

export const weeklyProgress = [
  { day: "Mon", math: 60, science: 85, english: 75 },
  { day: "Tue", math: 55, science: 90, english: 80 },
  { day: "Wed", math: 70, science: 88, english: 78 },
  { day: "Thu", math: 50, science: 92, english: 82 },
  { day: "Fri", math: 65, science: 87, english: 79 },
];

export const colors: Record<string, string> = {
  math: "#6366F1",
  science: "#10B981",
  english: "#F59E0B",
  history: "#EF4444",
  geography: "#06B6D4",
};

export const subjectEmoji: Record<string, string> = {
  math: "🔢",
  science: "🔬",
  english: "📚",
  history: "🏛️",
  geography: "🌍",
};
