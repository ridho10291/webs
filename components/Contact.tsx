"use client";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  MessageCircle,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; msg: string }>({
    type: "idle",
    msg: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ type: "error", msg: "Semua kolom wajib diisi." });
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        });
        const json = await res.json();

        if (json.ok) {
          setStatus({
            type: "success",
            msg: json.message || "Pesan Anda berhasil dikirim!",
          });
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          setTimeout(() => setStatus({ type: "idle", msg: "" }), 6000);
        } else {
          setStatus({
            type: "error",
            msg: json.error || "Gagal mengirim pesan, coba lagi nanti.",
          });
        }
      } catch {
        setStatus({
          type: "error",
          msg: "Terjadi kesalahan jaringan, silakan hubungi langsung via Telegram / Email.",
        });
      }
    });
  };

  const channels = [
    {
      label: "Telegram",
      handle: "@Byzeze43",
      icon: Send,
      href: siteConfig.socials.telegram,
      hover: "hover:border-[#56e8ff]/50",
      iconColor: "text-[#56e8ff]",
    },
    {
      label: "Email",
      handle: siteConfig.email,
      icon: Mail,
      href: `mailto:${siteConfig.email}`,
      hover: "hover:border-[#8fff4a]/50",
      iconColor: "text-[#8fff4a]",
    },
    {
      label: "WhatsApp",
      handle: "Direct Message",
      icon: MessageCircle,
      href: siteConfig.socials.whatsapp,
      hover: "hover:border-[#56e8ff]/50",
      iconColor: "text-[#56e8ff]",
    },
  ];

  return (
    <section id="contact" className="relative py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          fn="contact()"
          title="let's build something"
          accent="'extraordinary'"
        />

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left: channels + availability */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between gap-5 lg:col-span-5"
          >
            <div className="code-window">
              <div className="titlebar">
                <span className="dot d-close" />
                <span className="dot d-min" />
                <span className="dot d-max" />
                <span className="ml-2 font-mono text-[11px] text-[#5f6f66]">channels.json</span>
              </div>
              <div className="space-y-2 p-4 sm:p-5">
                {channels.map(({ label, handle, icon: Icon, href, hover, iconColor }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className={`group flex items-center justify-between rounded border border-[#1d2a24] bg-[#0a0d13] p-3.5 transition-colors ${hover}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded border border-[#1d2a24] bg-[#12160f] ${iconColor}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#3d4f45]">
                          {label}
                        </p>
                        <p className="font-mono text-[12.5px] font-semibold text-[#d7f6c8]">
                          {handle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#3d4f45] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="rounded border border-[#ffb020]/30 bg-[#ffb020]/6 p-5">
              <div className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-[#ffb020]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#ffb020] shadow-[0_0_10px_rgba(255,176,32,0.9)]" />
                <span className="animate-pulse-soft">[ pending ]</span>
                {siteConfig.availability}
                <span className="cursor-block am" aria-hidden="true" />
              </div>
              <p className="mt-2.5 font-mono text-[11.5px] leading-relaxed text-[#d7f6c8]">
                {siteConfig.headlineSub}
              </p>
              <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-[#5f6f66]">
                <MapPin className="h-3.5 w-3.5 text-[#ffb020]" />
                <span>{siteConfig.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="h-full lg:col-span-7"
          >
            <div className="code-window h-full">
              <div className="titlebar">
                <span className="dot d-close" />
                <span className="dot d-min" />
                <span className="dot d-max" />
                <span className="ml-2 font-mono text-[11px] text-[#5f6f66]">submit a patch — contact()</span>
              </div>

              <form onSubmit={handleSubmit} className="p-5 font-mono sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="code-label">
                      <span className="text-[#8fff4a]">$</span> name:
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Graham"
                      className="field-in mt-1.5"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="code-label">
                      <span className="text-[#8fff4a]">$</span> email:
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="field-in mt-1.5"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="contact-subject" className="code-label">
                    <span className="text-[#8fff4a]">$</span> subject:
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="website development / bot inquiry"
                    className="field-in mt-1.5"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="contact-message" className="code-label">
                    <span className="text-[#8fff4a]">$</span> message:
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ceritakan detail proyek atau pertanyaan Anda..."
                    className="field-in mt-1.5 resize-none"
                  />
                </div>

                <AnimatePresence>
                  {status.type !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-4 flex items-start gap-2 rounded border p-3 text-[11px] ${
                        status.type === "success"
                          ? "border-[#8fff4a]/40 bg-[#8fff4a]/8 text-[#8fff4a]"
                          : "border-[#ffb020]/40 bg-[#ffb020]/8 text-[#ffb020]"
                      }`}
                    >
                      {status.type === "success" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span>{status.msg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-exec mt-5 w-full py-3.5"
                >
                  {isPending ? (
                    <>
                      <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border border-[#8fff4a] border-t-transparent" />
                      dispatching packet...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      $ send --to={email}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}