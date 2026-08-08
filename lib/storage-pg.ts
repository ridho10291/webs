import postgres from "postgres";
import type { ContactMessage, GuestbookEntry } from "./types";

const url = process.env.DATABASE_URL;

let sql: postgres.Sql | null = null;
let initPromise: Promise<void> | null = null;

function getSql() {
  if (!url) return null;
  if (!sql) {
    sql = postgres(url, { ssl: "require", max: 5 });
  }
  return sql;
}

async function initSchema() {
  const db = getSql();
  if (!db) return;
  await db`
    CREATE TABLE IF NOT EXISTS guestbook (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS visitors (
      id INT PRIMARY KEY,
      count BIGINT NOT NULL DEFAULT 0
    );
    INSERT INTO visitors (id, count) VALUES (1, 0) ON CONFLICT (id) DO NOTHING;
  `;
}

export function ensureDbReady() {
  if (!getSql()) return Promise.resolve();
  if (!initPromise) {
    initPromise = initSchema().catch((err) => {
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
}

export async function getGuestbookPg(limit = 100): Promise<GuestbookEntry[]> {
  const db = getSql();
  if (!db) return [];
  await ensureDbReady();
  const rows = await db`
    SELECT id, name, message, created_at AS "createdAt"
    FROM guestbook
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    message: r.message,
    createdAt: new Date(r.createdAt).toISOString(),
  }));
}

export async function addGuestbookPg(entry: GuestbookEntry) {
  const db = getSql();
  if (!db) return;
  await ensureDbReady();
  await db`
    INSERT INTO guestbook (id, name, message, created_at)
    VALUES (${entry.id}, ${entry.name}, ${entry.message}, ${new Date(entry.createdAt)})
  `;
}

export async function addContactPg(contact: ContactMessage) {
  const db = getSql();
  if (!db) return;
  await ensureDbReady();
  await db`
    INSERT INTO contacts (id, name, email, subject, message, created_at)
    VALUES (${contact.id}, ${contact.name}, ${contact.email}, ${contact.subject}, ${contact.message}, ${new Date(contact.createdAt)})
  `;
}

export async function getVisitorsPg(): Promise<number> {
  const db = getSql();
  if (!db) return 0;
  await ensureDbReady();
  const rows = await db`SELECT count FROM visitors WHERE id = 1`;
  return Number(rows[0]?.count ?? 0);
}

export async function incrementVisitorsPg(): Promise<number> {
  const db = getSql();
  if (!db) return 0;
  await ensureDbReady();
  const rows = await db`
    UPDATE visitors SET count = count + 1 WHERE id = 1 RETURNING count
  `;
  return Number(rows[0]?.count ?? 0);
}