export interface Project {
  id: string;
  title: string;
  category: "Web Application" | "Bot & Automation" | "Creative Web";
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  image: string;
  liveDemo: string;
  github: string;
  year: string;
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "nexus-dashboard",
    title: "Nexus Analytics Platform",
    category: "Web Application",
    description: "Platform analitik performa tinggi dengan visualisasi grafik real-time, tema cyber-dark, dan manajemen dataset.",
    longDescription:
      "Nexus adalah dashboard analitik generasi baru yang dirancang untuk kecepatan dan presisi visual. Dibangun dengan Next.js App Router dan Tailwind CSS, platform ini menyediakan pemantauan metrik server, aktivitas pengguna, dan visualisasi data interaktif 60 FPS tanpa jeda.",
    features: [
      "Visualisasi data real-time dengan grafik interaktif Recharts",
      "Sistem dark mode adaptif dengan aksen neon cyber",
      "Manajemen dataset dengan ekspor format CSV & JSON",
      "Optimasi performa rendering dengan React Server Components",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    liveDemo: "https://github.com/ridho-acr",
    github: "https://github.com/ridho-acr",
    year: "2025",
    featured: true,
  },
  {
    id: "automate-hub",
    title: "AutomateHub Enterprise Suite",
    category: "Bot & Automation",
    description: "Ekosistem bot otomasi cerdas untuk Telegram dan Discord dengan penjadwalan terintegrasi & sistem webhook.",
    longDescription:
      "AutomateHub merupakan solusi otomatisasi serbaguna yang menghubungkan alur kerja harian pengembang dengan channel komunikasi Telegram & Discord. Dilengkapi dengan webhook logger real-time, cron job background tasks, dan sistem notifikasi instan.",
    features: [
      "Webhook receiver dengan verifikasi tanda tangan HMAC",
      "Notifikasi instan Telegram dengan parsing HTML kaya dan tombol interaktif",
      "Bot Discord multifungsi dengan slash commands dan audit logs",
      "Database Postgres terkelola untuk pencatatan log historis",
    ],
    technologies: ["Node.js", "TypeScript", "Discord.js", "Telegram Bot API", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    liveDemo: "https://github.com/ridho-acr",
    github: "https://github.com/ridho-acr",
    year: "2025",
    featured: true,
  },
  {
    id: "pixelcraft-studio",
    title: "Pixelcraft Creative Canvas",
    category: "Creative Web",
    description: "Studio grafis pixel art interaktif berbasis browser dengan kanvas HTML5, layer system, dan animasi frame-by-frame.",
    longDescription:
      "Pixelcraft Studio memungkinkan kreator menggambar aset pixel art secara langsung di web. Menggunakan Web Workers untuk pemrosesan gambar berkinerja tinggi serta ekspor format GIF beranimasi dan sprite sheet PNG resolusi tinggi.",
    features: [
      "Kanvas HTML5 dengan zoom tanpa batas dan grid bantu adaptif",
      "Sistem palet warna cerdas dan color picker hex presisi",
      "Timeline animasi multi-frame dengan preview pemutaran langsung",
      "Ekspor lossless ke PNG sprite sheet dan animasi GIF",
    ],
    technologies: ["React", "TypeScript", "HTML5 Canvas API", "Tailwind CSS", "Web Workers"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
    liveDemo: "https://github.com/ridho-acr",
    github: "https://github.com/ridho-acr",
    year: "2025",
    featured: true,
  },
  {
    id: "cyber-portfolio",
    title: "Cyberpunk Developer Portfolio",
    category: "Creative Web",
    description: "Website portofolio ultra-modern dengan efek rotating beam light, audio visualizer, dan micro-animations.",
    longDescription:
      "Portofolio berestetika cyber-dark terinspirasi oleh ekizr.com dengan animasi halus Framer Motion, efek kanvas partikel luar angkasa, sistem komentar live Guestbook yang tersambung ke bot Telegram, dan audio ambient synthesizer.",
    features: [
      "Sistem Guestbook live dengan integrasi notifikasi bot Telegram",
      "Efek latar partikel kosmik dan starfield interaktif",
      "Audio ambient toggle dengan visualizer gelombang suara",
      "Desain responsif glassmorphism berstandar industri",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    liveDemo: "https://ridho.dev",
    github: "https://github.com/ridho-acr",
    year: "2026",
    featured: true,
  },
];
