import { NextRequest, NextResponse } from "next/server";
import type { ContactMessage } from "@/lib/types";
import { addContact } from "@/lib/storage";
import { sendTelegramNotification } from "@/lib/telegram";
import { getId, isValidEmail, sanitizeText } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = sanitizeText(String(body.name ?? ""), 40);
    const email = sanitizeText(String(body.email ?? ""), 80).toLowerCase();
    const subject = sanitizeText(String(body.subject ?? ""), 100);
    const message = sanitizeText(String(body.message ?? ""), 2000);

    if (name.length < 2) {
      return NextResponse.json({ ok: false, error: "Nama minimal 2 karakter" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Email tidak valid" }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Pesan minimal 10 karakter" },
        { status: 400 }
      );
    }

    const contact: ContactMessage = {
      id: getId(),
      name,
      email,
      subject: subject || "(tanpa subjek)",
      message,
      createdAt: new Date().toISOString(),
    };

    await addContact(contact);

    await sendTelegramNotification(
      `✉️ <b>Pesan Baru dari Website</b>\n👤 <b>${escapeHtml(contact.name)}</b>\n📧 ${escapeHtml(contact.email)}\n📌 ${escapeHtml(contact.subject)}\n\n💬 ${escapeHtml(contact.message)}`
    );

    return NextResponse.json({ ok: true, data: contact }, { status: 201 });
  } catch (error) {
    console.error("contact POST error:", error);
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