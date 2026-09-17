export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl: string;
  skills: string[];
}

export const certificatesData: Certificate[] = [
  {
    id: "cert-frontend",
    title: "Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    date: "2025",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    credentialUrl: "https://www.dicoding.com/certificates",
    skills: ["React.js", "Component Lifecycle", "Hooks", "SPA Architecture"],
  },
  {
    id: "cert-js",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    date: "2024",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80",
    credentialUrl: "https://www.dicoding.com/certificates",
    skills: ["JavaScript ES6+", "Async Programming", "OOP", "Functional JS"],
  },
  {
    id: "cert-web-dev",
    title: "Belajar Dasar Pemrograman Web (HTML5 & CSS3)",
    issuer: "Dicoding Indonesia",
    date: "2024",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
    credentialUrl: "https://www.dicoding.com/certificates",
    skills: ["HTML5 Semantic", "CSS Flexbox & Grid", "Responsive Design"],
  },
  {
    id: "cert-python",
    title: "Python Automation & Bot Engineering",
    issuer: "FreeCodeCamp & Tech Academy",
    date: "2024",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    credentialUrl: "https://www.freecodecamp.org/certification",
    skills: ["Python", "Automation Scripting", "API Integration", "Web Scraping"],
  },
];
