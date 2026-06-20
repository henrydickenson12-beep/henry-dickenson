export type AgeGroup = "preschool" | "primary" | "middle" | "secondary" | "sixthform";
export type Subject = "math" | "science" | "english" | "history" | "geography";
export type GameType = "quiz" | "matching" | "fillblank" | "drag";

export interface Student {
  id: string;
  name: string;
  age: number;
  ageGroup: AgeGroup;
  classroomId: string;
  avatar: string;
  joinedAt: string;
}

export interface Classroom {
  id: string;
  name: string;
  teacherId: string;
  studentIds: string[];
  subjects: Subject[];
  ageGroup: AgeGroup;
  createdAt: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  role: "teacher" | "parent" | "admin";
  classroomIds: string[];
  avatar: string;
}

export interface GameResult {
  id: string;
  studentId: string;
  subject: Subject;
  topic: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: string;
  ageGroup: AgeGroup;
  difficulty: "easy" | "medium" | "hard";
}

export interface SubjectPerformance {
  subject: Subject;
  averageScore: number;
  gamesPlayed: number;
  trend: "up" | "down" | "stable";
  weakTopics: string[];
  strongTopics: string[];
}

export interface AISuggestion {
  id: string;
  studentId: string;
  type: "game" | "homework" | "focus";
  subject: Subject;
  title: string;
  description: string;
  reason: string;
  priority: "high" | "medium" | "low";
  generatedAt: string;
}

export interface GameQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
}
