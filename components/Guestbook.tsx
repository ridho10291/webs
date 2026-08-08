"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, MessageSquarePlus, Send, UserRound } from "lucide-react";
import type { GuestbookEntry } from "@/lib/types";
import { SectionHeading } from "./SectionHeading";

const STORAGE_KEY = "guestbook-name-v1";

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setName(saved);
    fetch("/api/guestbook", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) setEntries(json.data);
      })
      .catch(() => undefined);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatus("error");
      setError("Isi nama dan pesan dulu ya.");
      return;
    }
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      const json = await res.json();

      if (!json.ok) {
        setStatus("error");
        setError(json.error || "Gagal menyimpan pesan.");
        return;
      }

      setEntries((prev) => [json.data, ...prev]);
      setMessage("");
      localStorage.setItem(STORAGE_KEY, name.trim());
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setError("Koneksi bermasalah, coba lagi.");
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <section id="buku-tamu" className="relative py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            badge="Buku Tamu"
            title="Tinggalkan jejak digital kamu 👋"
            subtitle="Sapa, kritik, saran, atau cerita singkat — pesanmu muncul di sini real-time & masuk ke Telegram saya."
          />
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          className="mt-12 rounded-2xl border border-border/50 bg-bg-elevated/50 p-6 backdrop-blur-xl transition-all hover:border-primary/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <motion.div className="flex-1" whileHover={{ scale: 1.01 }}>
              <label htmlFor="gb-name" className="sr-only">Nama</label>
              <input
                id="gb-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kamu"
                maxLength={40}
                className="input-field w-full"
              />
            </motion.div>
            <motion.div className="flex-1" whileHover={{ scale: 1.01 }}>
              <label htmlFor="gb-message" className="sr-only">Pesan</label>
              <input
                id="gb-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan kamu di sini..."
                maxLength={500}
                className="input-field w-full"
              />
            </motion.div>
            <motion.button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary shrink-0 whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Kirim
                </>
              )}
            </motion.button>
          </div>

          {status === "success" && (
            <motion.p
              className="mt-4 text-center text-sm font-medium text-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              ✓ Makasih! Pesan kamu sudah masuk & terkirim ke Telegram.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              className="mt-4 text-center text-sm font-medium text-secondary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              ✕ {error}
            </motion.p>
          )}
        </motion.form>

        <motion.div
          className="mt-12 space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {entries.length === 0 && (
            <motion.div
              className="rounded-2xl border border-border/50 bg-bg-elevated/30 p-10 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <MessageSquarePlus size={48} className="mx-auto mb-4 text-text-muted" />
              <p className="text-text-muted">Belum ada pesan. Jadikan kamu yang pertama! 🎉</p>
            </motion.div>
          )}
          {entries.map((entry, i) => (
            <motion.article
              key={entry.id}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-bg-elevated/50 p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <UserRound size={20} className="text-primary" />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-semibold text-text">{entry.name}</span>
                    <span className="text-xs text-text-muted">{formatDate(entry.createdAt)}</span>
                  </div>
                  <motion.p
                    className="mt-2 text-text-muted leading-relaxed break-words"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {entry.message}
                  </motion.p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}