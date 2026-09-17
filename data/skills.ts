export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Tools & DevOps" | "Design";
  icon: string;
  level: number; // 1 - 100
  color: string;
  description: string;
}

export const skillsData: Skill[] = [
  // Frontend
  {
    name: "React.js",
    category: "Frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    level: 90,
    color: "#61DAFB",
    description: "Component architecture, hooks, state management, and modern patterns.",
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    level: 88,
    color: "#ffffff",
    description: "App router, SSR, SSG, Server Actions, and API endpoints.",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    level: 85,
    color: "#3178C6",
    description: "Static typing, generics, strict type safety, and DX enhancement.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    level: 94,
    color: "#38BDF8",
    description: "Utility-first modern styling, responsive layouts, and animations.",
  },
  {
    name: "JavaScript (ES6+)",
    category: "Frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    level: 92,
    color: "#F7DF1E",
    description: "Async/await, DOM manipulation, functional programming concepts.",
  },
  {
    name: "HTML5 & CSS3",
    category: "Frontend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    level: 96,
    color: "#E34F26",
    description: "Semantic web, accessibility (a11y), responsive fluid design.",
  },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    level: 86,
    color: "#339933",
    description: "Event-driven runtime, RESTful APIs, CLI tools, and background workers.",
  },
  {
    name: "Python",
    category: "Backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    level: 82,
    color: "#3776AB",
    description: "Scripting, web scraping, bot automation, and backend logic.",
  },
  {
    name: "PostgreSQL",
    category: "Backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    level: 80,
    color: "#4169E1",
    description: "Relational database design, query optimization, and Neon serverless.",
  },
  {
    name: "Telegram Bot API",
    category: "Backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/telegram/telegram-original.svg",
    level: 92,
    color: "#26A5E4",
    description: "Webhook handling, automated alerts, inline queries, and conversational bots.",
  },
  {
    name: "Discord.js",
    category: "Backend",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/discordjs/discordjs-original.svg",
    level: 88,
    color: "#5865F2",
    description: "Slash commands, moderation bots, audio streaming, and guild events.",
  },

  // Tools & DevOps
  {
    name: "Git & GitHub",
    category: "Tools & DevOps",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    level: 90,
    color: "#F05032",
    description: "Version control, branching strategies, PR reviews, and GitHub Actions.",
  },
  {
    name: "Vercel",
    category: "Tools & DevOps",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    level: 90,
    color: "#ffffff",
    description: "Zero-config edge deployment, serverless functions, and analytics.",
  },
  {
    name: "Vite",
    category: "Tools & DevOps",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    level: 88,
    color: "#646CFF",
    description: "Lightning-fast HMR and optimized production bundling.",
  },
  {
    name: "VS Code",
    category: "Tools & DevOps",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    level: 95,
    color: "#007ACC",
    description: "Customized development workflow, debugging, and productivity tools.",
  },

  // Design
  {
    name: "Figma",
    category: "Design",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    level: 85,
    color: "#F24E1E",
    description: "UI/UX wireframing, interactive prototyping, and design systems.",
  },
];
