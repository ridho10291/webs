import {
  addContactLocal,
  addGuestbookLocal,
  getGuestbookLocal,
  getVisitorsLocal,
  incrementVisitorsLocal,
} from "./storage-local";
import {
  addContactPg,
  addGuestbookPg,
  getGuestbookPg,
  getVisitorsPg,
  incrementVisitorsPg,
} from "./storage-pg";
import type { ContactMessage, GuestbookEntry } from "./types";

export const hasDatabase = Boolean(process.env.DATABASE_URL);

export async function getGuestbook(limit = 100): Promise<GuestbookEntry[]> {
  if (hasDatabase) return getGuestbookPg(limit);
  return getGuestbookLocal(limit);
}

export async function addGuestbook(entry: GuestbookEntry) {
  if (hasDatabase) await addGuestbookPg(entry);
  else addGuestbookLocal(entry);
}

export async function addContact(contact: ContactMessage) {
  if (hasDatabase) await addContactPg(contact);
  else addContactLocal(contact);
}

export async function getVisitors(): Promise<number> {
  if (hasDatabase) return getVisitorsPg();
  return getVisitorsLocal();
}

export async function incrementVisitors(): Promise<number> {
  if (hasDatabase) return incrementVisitorsPg();
  return incrementVisitorsLocal();
}