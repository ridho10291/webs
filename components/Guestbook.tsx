"use client";
import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  RefreshCw,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { GuestbookEntry } from "@/lib/types";
import { SectionHeading } from "./SectionHeading";

const EMOJI_AVATARS = ["👾", "🚀", "💻", "⚡", "🎨", "🌟", "🔥", "🔮"];

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("👾");
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; msg: string }>({
    type: "idle",
    msg: "",
  });
  const [isPending, startTransition] = useTransition();

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/guestbook");
      const json = await res.json();
      if (json.ok && Array.isArray(json.data)) {
        setEntries(json.data);
      }
    } catch (err) {
      console.error("Failed to load guestbook:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatus({ type: "error", msg: "Nama dan pesan tidak boleh kosong." });
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/guestbook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            message: message.trim(),
            avatar: selectedEmoji,
          }),
        });
        const json = await res.json();

        if (json.ok && json.data) {
          setEntries((prev) => [json.data, ...prev]);
          setName("");
          setMessage("");
          setStatus({
            type: "success",
            msg: "Pesan Anda berhasil dikirim dan tersimpan di database!",
          });
          setTimeout(() => setStatus({ type: "idle", msg: "" }), 5000);
        } else {
          setStatus({
            type: "error",
            msg: json.error || "Gagal mengirim pesan, silakan coba lagi.",
          });
        }
      } catch {
        setStatus({
          type: "error",
          msg: "Terjadi gangguan jaringan, coba beberapa saat lagi.",
        });
      }
    });
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Baru saja";
    }
  };

  return (
    <section id="guestbook" className="relative py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          fn="guestbook{}"
          title="visitor log"
          accent="'comments & notes'"
        />

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left: REPL form */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="h-full lg:col-span-5"
          >
            <div className="code-window h-full">
              <div className="titlebar">
                <span className="dot d-close" />
                <span className="dot d-min" />
                <span className="dot d-max" />
                <span className="ml-2 font-mono text-[11px] text-[#5f6f66]">guestbook.sh — new entry</span>
              </div>

              <form onSubmit={handleSubmit} className="flex h-full flex-col p-5 font-mono sm:p-6">
                {/* Avatar selector */}
                <div>
                  <label className="code-label">// avatar</label>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {EMOJI_AVATARS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`flex h-9 w-9 items-center justify-center rounded border text-base transition-all ${
                          selectedEmoji === emoji
                            ? "border-[#8fff4a]/70 bg-[#8fff4a]/12 shadow-[0_0_14px_rgba(143,255,74,0.25)]"
                            : "border-[#1d2a24] hover:border-[#1d2a24] hover:bg-[#12160f]"
                        }`}
                        aria-label={`Avatar ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="mt-4">
                  <label
                    htmlFor="guest-name"
                    className="code-label"
                  >
                    <span className="text-[#8fff4a]">$</span> guest name:
                  </label>
                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#3d4f45]">
                      <User className="h-3.5 w-3.5" />
                    </div>
                    <input
                      id="guest-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      maxLength={40}
                      className="field-in pl-9"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mt-4">
                  <label
                    htmlFor="guest-message"
                    className="code-label"
                  >
                    <span className="text-[#8fff4a]">$</span> message:
                  </label>
                  <textarea
                    id="guest-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Keren portofolionya! Sukses selalu bro..."
                    maxLength={500}
                    className="field-in mt-1.5 resize-none"
                  />
                </div>

                {/* Status */}
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

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-exec mt-5 w-full py-3"
                >
                  {isPending ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      writing to db...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      $ git push --message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right: comment log */}
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
                <span className="ml-2 font-mono text-[11px] text-[#5f6f66]">tail -f /logs/comments</span>
                <span className="ml-auto flex items-center gap-2">
                  <span className="hidden font-mono text-[10px] text-[#3d4f45] sm:block">
                    {entries.length} entries
                  </span>
                  <button
                    type="button"
                    onClick={fetchEntries}
                    className="flex h-7 w-7 items-center justify-center rounded border border-[#1d2a24] text-[#5f6f66] transition-colors hover:border-[#8fff4a]/60 hover:text-[#8fff4a]"
                    title="Refresh comments"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                  </button>
                </span>
              </div>

              <div className="max-h-[520px] space-y-2.5 overflow-y-auto p-4 sm:p-5">
                {loading && entries.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <RefreshCw className="h-5 w-5 animate-spin text-[#8fff4a]" />
                    <p className="mt-3 font-mono text-[11px] text-[#5f6f66]">
                      fetching entries from db...
                    </p>
                  </div>
                ) : entries.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <MessageSquare className="h-8 w-8 text-[#3d4f45]" />
                    <p className="mt-3 font-mono text-[12px] font-semibold text-[#d7f6c8]">
                      // no entries yet
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-[#5f6f66]">
                      Jadilah orang pertama yang meninggalkan pesan!
                    </p>
                  </div>
                ) : (
                  entries.map((item, idx) => (
                    <motion.div
                      key={item.id || idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(idx * 0.04, 0.4) }}
                      className="rec p-3.5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[#1d2a24] bg-[#12160f] text-sm">
                            {item.avatar || "👾"}
                          </span>
                          <span className="truncate font-mono text-[12px] font-bold text-[#d7f6c8]">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-1 font-mono text-[9.5px] text-[#3d4f45]">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                      </div>
                      <p className="mt-2 pl-9 font-mono text-[11.5px] leading-relaxed text-[#5f6f66]">
                        <span className="mr-1 text-[#3d4f45]">›</span>
                        {item.message}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}