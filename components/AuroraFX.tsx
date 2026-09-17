const ORBS = [
  {
    className: "left-[-14%] top-[6%] h-[48vw] w-[48vw] min-h-[420px] min-w-[420px]",
    bg: "rgba(143,255,74,0.13)",
    delay: "0s",
    duration: "24s",
  },
  {
    className: "right-[-16%] top-[12%] h-[42vw] w-[42vw] min-h-[380px] min-w-[380px]",
    bg: "rgba(255,61,129,0.11)",
    delay: "-8s",
    duration: "28s",
  },
  {
    className: "bottom-[-20%] left-[24%] h-[46vw] w-[46vw] min-h-[400px] min-w-[400px]",
    bg: "rgba(143,255,74,0.07)",
    delay: "-14s",
    duration: "26s",
  },
];

export function AuroraFX() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className={`glow-orb animate-aurora ${orb.className}`}
          style={{
            background: orb.bg,
            animationDelay: orb.delay,
            animationDuration: orb.duration,
          }}
        />
      ))}
      <div className="absolute inset-0 dot-grid opacity-[0.4]" />
      <div className="crt-scan absolute inset-0 opacity-50" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8fff4a]/60 to-transparent" />
    </div>
  );
}