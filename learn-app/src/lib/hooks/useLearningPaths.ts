/**
 * Learning paths + their sessions.
 */

import {
  db,
  type LearningPath,
  type Session,
  type SessionStatus,
} from "../db";

export async function createPath(
  path: Omit<LearningPath, "id">
): Promise<number> {
  return db.learning_paths.add(path as LearningPath);
}

export async function getPathsByUser(
  userId: string
): Promise<LearningPath[]> {
  return db.learning_paths
    .where("userId")
    .equals(userId)
    .reverse()
    .sortBy("createdAt");
}

export async function getPathById(
  id: number
): Promise<LearningPath | undefined> {
  return db.learning_paths.get(id);
}

export async function createSessions(
  sessions: Omit<Session, "id">[]
): Promise<void> {
  await db.sessions.bulkAdd(sessions as Session[]);
}

export async function getSessionsByPath(pathId: number): Promise<Session[]> {
  return db.sessions.where("pathId").equals(pathId).sortBy("sessionNumber");
}

export async function getSessionById(
  id: number
): Promise<Session | undefined> {
  return db.sessions.get(id);
}

export async function updateSessionStatus(
  sessionId: number,
  status: SessionStatus,
  completedAt?: Date
): Promise<void> {
  await db.sessions.update(sessionId, {
    status,
    ...(completedAt && { completedAt }),
  });
}

export async function updateSessionNotes(
  sessionId: number,
  notes: string
): Promise<void> {
  await db.sessions.update(sessionId, { notes });
}
