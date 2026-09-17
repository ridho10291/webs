import { setDefaultResultOrder } from "node:dns";
import postgres from "postgres";
import type { GuestbookEntry } from "./types";

// Some networks advertise IPv6 (AAAA) that is unreachable, which makes the
// Neon connection stall across every address until it throws ETIMEDOUT.
// Prefer IPv4 so feedback/guestbook requests connect reliably.
setDefaultResultOrder("ipv4first");

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
  // The postgres driver prepares each query, so every statement must be sent
  // separately (multiple commands in one prepared statement throw error 42601).
  await db`
    CREATE TABLE IF NOT EXISTS guestbook (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      avatar TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await db`
    ALTER TABLE guestbook ADD COLUMN IF NOT EXISTS avatar TEXT
  `;
  await db`
    CREATE TABLE IF NOT EXISTS visitors (
      id INT PRIMARY KEY,
      count BIGINT NOT NULL DEFAULT 0
    )
  `;
  await db`
    INSERT INTO visitors (id, count) VALUES (1, 0) ON CONFLICT (id) DO NOTHING
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
    SELECT id, name, message, avatar, created_at AS "createdAt"
    FROM guestbook
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    message: r.message,
    createdAt: new Date(r.createdAt).toISOString(),
    ...(r.avatar ? { avatar: r.avatar } : {}),
  }));
}

export async function addGuestbookPg(entry: GuestbookEntry) {
  const db = getSql();
  if (!db) return;
  await ensureDbReady();
  await db`
    INSERT INTO guestbook (id, name, message, avatar, created_at)
    VALUES (${entry.id}, ${entry.name}, ${entry.message}, ${entry.avatar ?? null}, ${new Date(entry.createdAt)})
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