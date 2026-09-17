export type HeroLine =
  | { text: string }
  | { before: string; middle: string; icon: "bolt" | "bot" };

export const siteConfig = {
  name: "Ridho",
  fullName: "Ridho",
  role: "Junior Web Developer",
  url: "https://ridho.dev",
  tagline: "Turning Ideas Into Reality",
  description:
    "Siswa yang membangun website berkecepatan tinggi, bot Discord & Telegram yang stabil, dan bereksperimen dengan arsitektur web modern.",
  bio: "Dimulai dari rasa penasaran hingga berkembang menjadi hobi dan passion coding. Senang membangun website berkecepatan tinggi, bot Discord & Telegram, serta bereksperimen dengan arsitektur web terkini.",
  location: "INDONESIA — 2026",
  email: "ridhorama3812@gmail.com",
  availability: "AVAILABLE FOR OPPORTUNITY",
  headlineSub:
    "Open to all forms of collaboration, regardless of location and language.",
  statusLine: "Designing for the web, engineering for speed.",
  resumeUrl: "/resume",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
  // Hero intro micro-label + 3 raksasa baris (ikon: null | "bolt" | "bot")
  hero: {
    intro:
      "HI, I'M RIDHO. I BUILD FAST WEBSITES, STABLE BOTS, AND SCALABLE WEB SYSTEMS.",
    lines: [
      { text: "WEB & BOTS" },
      { before: "SOFT", middle: "WARE", icon: "bolt" },
      { before: "EN", middle: "GINEER", icon: "bot" },
    ] as HeroLine[],
  },
  socials: {
    github: "https://github.com/ridho-acr",
    linkedin: "https://www.linkedin.com/in/ridho-acr",
    instagram: "https://www.instagram.com/fanz9998",
    telegram: "https://t.me/Byzeze43",
    whatsapp: "https://wa.me/6281234567890",
  },
  stats: [
    { label: "Projects Finished", value: "12+" },
    { label: "Bots & Automation", value: "8+" },
    { label: "System Uptime", value: "99.9%" },
    { label: "Happy Clients & Users", value: "25+" },
  ],
};

export const about = {
  bio: "Saya membangun web dan sistem otomasi yang cepat, stabil, dan enak dipandang. Saat ini fokus memperdalam modern web architecture sebelum lanjut ke SMK TKJ.",
  pillars: [
    {
      title: "Web Engineering",
      text: "Website modern, responsif, dan cepat dengan arsitektur component-based.",
      icon: "Globe",
    },
    {
      title: "Bot & Automation",
      text: "Sistem bot Discord & Telegram yang stabil, terukur, dan mudah dirawat.",
      icon: "Bot",
    },
    {
      title: "Clean UI/UX",
      text: "Detail typography, spasial, dan micro-interaction yang presisi.",
      icon: "Sparkles",
    },
    {
      title: "Network Mindset",
      text: "Memahami infrastruktur jaringan sebelum masuk dunia TKJ yang sesungguhnya.",
      icon: "Network",
    },
  ],
};

export const techStack = [
  { name: "HTML5", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", category: "Styling", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", category: "Framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind CSS", category: "Styling", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Git", category: "Tool", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", category: "Tool", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Vite", category: "Tool", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
  { name: "Vercel", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
  { name: "Figma", category: "Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

export const projects = [
  {
    id: "nexus-dashboard",
    title: "Nexus Dashboard",
    category: "Web Application",
    description: "Platform analitik modern dengan visualisasi data real-time, dark mode, dan performa mulus 60fps.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    liveDemo: "https://github.com/ridho-acr",
    github: "https://github.com/ridho-acr",
    year: "2025",
  },
  {
    id: "pixelcraft-studio",
    title: "Pixelcraft Studio",
    category: "Creative Tool",
    description: "Aplikasi berbasis browser untuk membuat, mengedit, dan mengkreasikan pixel art dengan dukungan AI.",
    technologies: ["React", "TypeScript", "HTML5 Canvas API", "Tailwind CSS", "Web Workers"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    liveDemo: "https://github.com/ridho-acr",
    github: "https://github.com/ridho-acr",
    year: "2025",
  },
  {
    id: "automate-hub",
    title: "AutomateHub Suite",
    category: "Bot & Automation",
    description: "Rangkaian bot otomasi cerdas untuk Telegram dan Discord dengan manajemen webhook & scheduler.",
    technologies: ["Node.js", "TypeScript", "Discord.js", "Telegram Bot API", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    liveDemo: "https://github.com/ridho-acr",
    github: "https://github.com/ridho-acr",
    year: "2024",
  },
  {
    id: "cyber-portfolio",
    title: "Cyberpunk Interactive Portfolio",
    category: "Creative Web",
    description: "Website portofolio ultra-modern dengan efek rotating beam light, audio visualizer, dan micro-animations.",
    technologies: ["Next.js", "React", "Tailwind CSS v4", "Framer Motion", "Radix UI"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    liveDemo: "https://github.com/ridho-acr",
    github: "https://github.com/ridho-acr",
    year: "2026",
  },
];

export const footerContent = {
  roles: [
    "Open to Opportunities",
    "Frontend Development",
    "Bot Engineering",
    "UI/UX Design",
    "Automation",
    "System Optimization",
  ],
  tech: [
    "Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS",
    "Python", "PostgreSQL", "Discord.js", "Telegram Bot API", "Vercel",
  ],
};