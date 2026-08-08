export type Project = {
  title: string;
  description: string;
  tech: string[];
  emoji: string;
  source?: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Bot Discord Moderasi & Auto-Order",
    description:
      "Bot Discord lengkap: moderasi otomatis, slash commands auto-order, payment gateway Midtrans, notifikasi real-time, leveling system. Deploy Docker gratis.",
    tech: ["discord.js", "PostgreSQL", "Docker", "Midtrans", "Prisma"],
    emoji: "🎮",
    source: "https://github.com/username/discord-bot",
    featured: true,
  },
  {
    title: "Website Toko Online Full-Stack",
    description:
      "E-commerce lengkap: keranjang, checkout multi-payment (Midtrans/Stripe), dashboard admin, inventory, order tracking. Deploy gratis Vercel + Neon Postgres.",
    tech: ["Next.js 15", "Node.js", "PostgreSQL", "Prisma", "Stripe", "Midtrans", "Tailwind"],
    emoji: "🛒",
    demo: "https://tokoku.vercel.app",
    featured: true,
  },
];

export const skills = [
  { name: "JavaScript / TypeScript", icon: "FileCode", level: 95 },
  { name: "Node.js & REST API", icon: "Server", level: 92 },
  { name: "Bot Development (Discord.js)", icon: "Bot", level: 90 },
  { name: "Next.js 15 / React 19", icon: "Component", level: 92 },
  { name: "PostgreSQL / Prisma / Redis", icon: "Database", level: 88 },
  { name: "Git & GitHub Actions CI/CD", icon: "GitBranch", level: 90 },
  { name: "Docker & Vercel Deploy", icon: "Boxes", level: 85 },
];