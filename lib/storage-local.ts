import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "db.json");

type DbShape = {
  guestbook: Array<{
    id: string;
    name: string;
    message: string;
    createdAt: string;
  }>;
  visitors: number;
};

const emptyDb: DbShape = { guestbook: [], visitors: 0 };

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify(emptyDb, null, 2), "utf-8");
  }
}

function readDb(): DbShape {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8")) as DbShape;
  } catch {
    return emptyDb;
  }
}

function writeDb(db: DbShape) {
  ensureFile();
  fs.writeFileSync(FILE, JSON.stringify(db, null, 2), "utf-8");
}

export function getGuestbookLocal(limit = 100): DbShape["guestbook"] {
  const db = readDb();
  return db.guestbook
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function addGuestbookLocal(entry: DbShape["guestbook"][number]) {
  const db = readDb();
  db.guestbook.push(entry);
  if (db.guestbook.length > 500) {
    db.guestbook = db.guestbook.slice(-500);
  }
  writeDb(db);
}

export function getVisitorsLocal(): number {
  return readDb().visitors;
}

export function incrementVisitorsLocal(): number {
  const db = readDb();
  db.visitors += 1;
  writeDb(db);
  return db.visitors;
}