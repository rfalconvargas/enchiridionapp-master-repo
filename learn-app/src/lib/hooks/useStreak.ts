/**
 * Streak + completion stats.
 *
 * A streak entry is one ISO date (YYYY-MM-DD) per active day. The current
 * streak counts consecutive days ending today.
 */

import { db } from "../db";

function isoDay(d: Date): string {
  return d.toISOString().split("T")[0];
}

export async function logSessionComplete(userId: string): Promise<void> {
  const today = isoDay(new Date());
  const existing = await db.streaks
    .where("userId")
    .equals(userId)
    .filter((e) => e.date === today)
    .first();
  if (!existing) {
    await db.streaks.add({ userId, date: today });
  }
}

export async function getCurrentStreak(userId: string): Promise<number> {
  const entries = await db.streaks.where("userId").equals(userId).toArray();
  const days = new Set(entries.map((e) => e.date));

  let count = 0;
  const cursor = new Date();
  // Walk backwards from today; stop at the first missing day.
  while (days.has(isoDay(cursor))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

export async function getTotalSessionsCompleted(
  userId: string
): Promise<number> {
  const paths = await db.learning_paths
    .where("userId")
    .equals(userId)
    .toArray();
  const pathIds = paths
    .map((p) => p.id)
    .filter((id): id is number => id != null);

  if (pathIds.length === 0) return 0;

  const completed = await db.sessions
    .where("pathId")
    .anyOf(pathIds)
    .filter((s) => s.status === "completed")
    .count();
  return completed;
}
