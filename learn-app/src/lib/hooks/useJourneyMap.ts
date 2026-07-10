/**
 * Journey map persistence — the onboarding answers that seed a learner's path.
 * One record per user; saving again overwrites the existing one.
 */

import { db, type JourneyAnswer, type JourneyMap } from "../db";

export async function saveJourneyMap(
  userId: string,
  answers: JourneyAnswer[]
): Promise<void> {
  const existing = await db.journeymap.where("userId").equals(userId).first();
  const record: JourneyMap = { userId, answers, completedAt: new Date() };

  if (existing?.id != null) {
    await db.journeymap.put({ ...record, id: existing.id });
  } else {
    await db.journeymap.add(record);
  }
}

export async function getJourneyMap(
  userId: string
): Promise<JourneyMap | undefined> {
  return db.journeymap.where("userId").equals(userId).first();
}

export async function hasCompletedJourneyMap(
  userId: string
): Promise<boolean> {
  return (await getJourneyMap(userId)) !== undefined;
}
