/**
 * Enchiridion Learn — local-first persistence (Dexie / IndexedDB).
 *
 * A fresh, purpose-built schema for the learning app — deliberately NOT a copy
 * of the website's 30-table / 15-version schema. Five tables cover everything
 * the learn app needs today: the onboarding journey map, generated learning
 * paths and their sessions, the daily streak log, and Glyfra notes.
 */

import Dexie, { type Table } from "dexie";

// --- Journey map (onboarding answers) --------------------------------------

export interface JourneyAnswer {
  questionId: string;
  question: string;
  answer: string;
}

export interface JourneyMap {
  id?: number;
  userId: string;
  answers: JourneyAnswer[];
  completedAt: Date;
}

// --- Learning paths + sessions ---------------------------------------------

export type PathStatus = "active" | "paused" | "completed";
export type SessionStatus = "upcoming" | "in_progress" | "completed";
export type ResourceType = "video" | "article" | "paper" | "book" | "tool";

export interface Resource {
  title: string;
  url: string;
  type: ResourceType;
  note?: string;
}

export interface LearningPath {
  id?: number;
  userId: string;
  title: string;
  goal: string;
  domain: string;
  totalWeeks: number;
  status: PathStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id?: number;
  pathId: number;
  week: number;
  sessionNumber: number;
  title: string;
  description: string;
  resources: Resource[];
  practiceTask: string;
  estimatedMinutes: number;
  status: SessionStatus;
  completedAt?: Date;
  notes?: string;
  createdAt: Date;
}

// --- Streaks ----------------------------------------------------------------

export interface StreakEntry {
  id?: number;
  userId: string;
  /** ISO date (YYYY-MM-DD), one entry per active day. */
  date: string;
}

// --- Glyfra notes -----------------------------------------------------------

export interface GlyfraMessage {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

export interface GlyfraNote {
  id?: number;
  userId: string;
  sessionId?: number;
  rawText: string;
  aiStructure?: {
    insights: string[];
    questions: string[];
    tasks: string[];
  };
  conversation: GlyfraMessage[];
  handwrittenImagePath?: string;
  createdAt: Date;
}

// --- Database ---------------------------------------------------------------

class EnchiridionLearnDB extends Dexie {
  journeymap!: Table<JourneyMap>;
  learning_paths!: Table<LearningPath>;
  sessions!: Table<Session>;
  streaks!: Table<StreakEntry>;
  glyfra_notes!: Table<GlyfraNote>;

  constructor() {
    super("EnchiridionLearnDB");
    this.version(1).stores({
      journeymap: "++id, userId, completedAt",
      learning_paths: "++id, userId, status, createdAt",
      sessions: "++id, pathId, week, sessionNumber, status",
      streaks: "++id, userId, date",
      glyfra_notes: "++id, userId, sessionId, createdAt",
    });
  }
}

export const db = new EnchiridionLearnDB();
