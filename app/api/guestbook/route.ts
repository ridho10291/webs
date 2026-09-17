import { NextRequest, NextResponse } from "next/server";
import type { GuestbookEntry } from "@/lib/types";
import { getGuestbook, addGuestbook } from "@/lib/storage";
import { sendTelegramNotification } from "@/lib/telegram";
import { getId, sanitizeText } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const entries = await getGuestbook(100);
    return NextResponse.json({ ok: true, data: entries });
  } catch (error) {
    console.error("guestbook GET error:", error);
    return NextResponse.json({ ok: false, error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = sanitizeText(String(body.name ?? ""), 40);
    const message = sanitizeText(String(body.message ?? ""), 500);

    if (name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Nama minimal 2 karakter" },
        { status: 400 }
      );
    }
    if (message.length < 3) {
      return NextResponse.json(
        { ok: false, error: "Pesan minimal 3 karakter" },
        { status: 400 }
      );
    }

    const avatar = sanitizeText(String(body.avatar ?? ""), 100);

    const entry: GuestbookEntry = {
      id: getId(),
      name,
      message,
      createdAt: new Date().toISOString(),
      ...(avatar ? { avatar } : {}),
    };

    await addGuestbook(entry);

    await sendTelegramNotification(
      `📖 <b>Guestbook Baru</b>\n👤 <b>${escapeHtml(entry.name)}</b>\n💬 ${escapeHtml(entry.message)}`
    );

    return NextResponse.json({ ok: true, data: entry }, { status: 201 });
  } catch (error) {
    console.error("guestbook POST error:", error);
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan" }, { status: 500 });
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}