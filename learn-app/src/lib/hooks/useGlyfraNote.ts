/**
 * Glyfra notes — raw capture + AI structure + ongoing conversation.
 */

import { db, type GlyfraNote, type GlyfraMessage } from "../db";

export async function saveGlyfraNote(
  note: Omit<GlyfraNote, "id">
): Promise<number> {
  return db.glyfra_notes.add(note as GlyfraNote);
}

export async function getNotesByUser(userId: string): Promise<GlyfraNote[]> {
  return db.glyfra_notes
    .where("userId")
    .equals(userId)
    .reverse()
    .sortBy("createdAt");
}

export async function getNoteById(
  id: number
): Promise<GlyfraNote | undefined> {
  return db.glyfra_notes.get(id);
}

export async function updateNoteConversation(
  noteId: number,
  conversation: GlyfraMessage[]
): Promise<void> {
  await db.glyfra_notes.update(noteId, { conversation });
}
