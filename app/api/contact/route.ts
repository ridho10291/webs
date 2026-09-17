import { NextRequest, NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";
import { sanitizeText } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = sanitizeText(String(body.name ?? ""), 60);
    const email = sanitizeText(String(body.email ?? ""), 100);
    const subject = sanitizeText(String(body.subject ?? "Portofolio Contact"), 100);
    const message = sanitizeText(String(body.message ?? ""), 1000);

    if (name.length < 2) {
      return NextResponse.json({ ok: false, error: "Nama minimal 2 karakter" }, { status: 400 });
    }
    if (!email.includes("@") || email.length < 5) {
      return NextResponse.json({ ok: false, error: "Format email tidak valid" }, { status: 400 });
    }
    if (message.length < 5) {
      return NextResponse.json({ ok: false, error: "Pesan minimal 5 karakter" }, { status: 400 });
    }

    // Send Telegram alert to owner
    await sendTelegramNotification(
      `📩 <b>Pesan Kontak Baru Dari Portofolio!</b>\n\n` +
      `👤 <b>Nama:</b> ${escapeHtml(name)}\n` +
      `📧 <b>Email:</b> ${escapeHtml(email)}\n` +
      `📌 <b>Subjek:</b> ${escapeHtml(subject)}\n` +
      `💬 <b>Pesan:</b>\n${escapeHtml(message)}`
    );

    return NextResponse.json(
      { ok: true, message: "Pesan berhasil dikirim! Saya akan segera merespons." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan saat memproses pesan Anda." },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
