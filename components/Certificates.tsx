"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Maximize2, X, Calendar } from "lucide-react";
import { certificatesData, type Certificate } from "@/data/certificates";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="relative py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          fn="certificates[]"
          keyword="const"
          title="verified"
          accent="'credentials'"
        />

        {/* Certificates grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {certificatesData.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="h-full"
            >
              <TiltCard maxTilt={5} className="h-full">
                <div className="rec group flex h-full flex-col justify-between overflow-hidden">
                  {/* Image preview */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#1d2a24] bg-[#0a0d13]">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d13] via-transparent to-transparent" />

                    <div className="absolute left-3 top-3 right-3 flex items-center justify-between">
                      <span className="chip hot">{cert.issuer}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="flex h-8 w-8 items-center justify-center rounded border border-[#1d2a24] bg-[#05060a]/80 text-[#d7f6c8] transition-colors hover:border-[#8fff4a]/60 hover:text-[#8fff4a]"
                        title="View Certificate Fullscreen"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[10.5px] text-[#5f6f66]">
                        <Calendar className="h-3 w-3" />
                        <span>
                          <span className="text-[#3d4f45]">issued:</span> {cert.date}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-lg font-bold text-[#d7f6c8] transition-colors group-hover:text-[#8fff4a]">
                        {cert.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded border border-[#1d2a24] px-2 py-0.5 font-mono text-[10px] text-[#56e8ff]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#1d2a24] pt-3.5">
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="font-mono text-[11px] font-semibold text-[#d7f6c8] transition-colors hover:text-[#8fff4a]"
                      >
                        $ open &quot;{cert.id}&quot;
                      </button>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost-line px-3 py-1.5 text-[10.5px]"
                      >
                        <Award className="h-3 w-3" />
                        verify
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-[#02030a]/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="code-window scroll relative z-10 max-h-[90vh] max-w-4xl bg-[#0a0d13] p-4 sm:p-6"
            >
              <div className="flex items-center justify-between border-b border-[#1d2a24] pb-3">
                <span className="font-mono text-[11px] text-[#5f6f66]">certs/{selectedCert.id}</span>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="flex h-7 w-7 items-center justify-center rounded border border-[#1d2a24] text-[#5f6f66] transition-colors hover:border-[#ff3d81]/60 hover:text-[#ff3d81]"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 overflow-hidden rounded border border-[#1d2a24]">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[62vh] w-full object-contain"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-mono text-sm font-bold text-[#d7f6c8]">{selectedCert.title}</h4>
                  <p className="mt-0.5 font-mono text-[10.5px] text-[#5f6f66]">
                    issued by {selectedCert.issuer} ({selectedCert.date})
                  </p>
                </div>
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-exec px-4 py-2 text-[11px]"
                >
                  verify online
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}