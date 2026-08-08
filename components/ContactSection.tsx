"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Send, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

type Status = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!json.ok) {
        setStatus("error");
        setError(json.error || "Gagal mengirim pesan.");
        return;
      }

      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setError("Koneksi bermasalah, coba lagi.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border/50 bg-bg/50 px-4 py-3 text-base text-text placeholder-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all";

  return (
    <section id="kontak" className="relative py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            badge="Mulai Project"
            title="Punya ide? Mari wujudkan bersama 🚀"
            subtitle="Bot, website, otomasi, atau cuma konsultasi — kirim detailnya, saya balas cepat."
          />
        </motion.div>

        <motion.div
          className="mt-16 grid gap-12 lg:grid-cols-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="rounded-2xl border border-border/50 bg-bg-elevated/50 p-8 backdrop-blur-xl"
              whileHover={{ y: -4 }}
            >
              <h3 className="text-xl font-bold text-text mb-6">Info Kontak</h3>
              <ul className="space-y-5">
                <li className="flex items-center gap-4">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Mail size={22} className="text-primary" />
                  </motion.div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-text-muted hover:text-primary transition-colors font-medium"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Send size={22} className="text-accent" />
                  </motion.div>
                  <a
                    href={siteConfig.socials.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-muted hover:text-accent transition-colors font-medium"
                  >
                    @{siteConfig.socials.telegram.replace("https://t.me/", "")}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <MapPin size={22} className="text-secondary" />
                  </motion.div>
                  <span className="text-text-muted">{siteConfig.location} · Remote-friendly</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-8"
              whileHover={{ scale: [1, 1.01, 1] }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Sparkles size={24} className="text-primary" />
                <h4 className="text-lg font-bold text-text">Tips Cepat Dibalas</h4>
              </div>
              <ul className="space-y-2 text-text-muted">
                <li className="flex items-start gap-2">✓ Jelaskan jenis project: bot / website / otomasi</li>
                <li className="flex items-start gap-2">✓ Sebutkan platform target & deadline</li>
                <li className="flex items-start gap-2">✓ Budget range (gratis hosting = budget 0 OK)</li>
                <li className="flex items-start gap-2">✓ Referensi desain / fitur kalau ada</li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            className="lg:col-span-3 rounded-2xl border border-border/50 bg-bg-elevated/50 p-8 backdrop-blur-xl"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <motion.div whileHover={{ scale: 1.01 }}>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-muted">
                  Nama
                </label>
                <input id="name" name="name" required maxLength={40} placeholder="Nama kamu" className={inputClass} />
              </motion.div>
              <motion.div whileHover={{ scale: 1.01 }}>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-muted">
                  Email
                </label>
                <input id="email" name="email" type="email" required maxLength={80} placeholder="email@kamu.com" className={inputClass} />
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.01 }}>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-text-muted">
                Subjek
              </label>
              <input id="subject" name="subject" maxLength={100} placeholder="contoh: Mau bikin bot WhatsApp order makanan" className={inputClass} />
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }}>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-muted">
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={2000}
                rows={6}
                placeholder="Ceritakan ide/project kamu sejelas mungkin..."
                className={inputClass}
              />
            </motion.div>

            {status === "error" && (
              <motion.p
                className="flex items-center gap-2 rounded-xl bg-secondary/10 border border-secondary/20 p-4 text-sm font-medium text-secondary"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Loader2 size={18} className="animate-spin" />
                {error}
              </motion.p>
            )}
            {status === "success" && (
              <motion.p
                className="flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 p-4 text-sm font-medium text-primary"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Sparkles size={18} />
                Berhasil terkirim! Terima kasih, saya balas secepatnya via email/Telegram.
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={status === "loading"}
              className="mt-8 btn-primary w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Kirim Pesan
                </>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}