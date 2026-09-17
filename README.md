# Portfolio Ridho — Creative Developer

Website portofolio pribadi dengan desain **editorial premium** (dark minimal, aksen warm gold).
Dibangun dengan Next.js 15 + TypeScript + Tailwind CSS v4 + Framer Motion.

Fitur live: **Guestbook** (komentar + notifikasi Telegram) dan **Visitor Counter**.

---

## Fitur

| Fitur              | Deskripsi |
|--------------------|-----------|
| Editorial UI        | Hero, About, Projects (tab: Projects / Stack / Bots), Contact, Footer |
| Guestbook           | Form komentar (nama + foto opsional), tersimpan ke DB, + notif Telegram |
| Visitor Counter     | Counter pengunjung subtil di footer (localStorage/DB local fallback) |
| Welcome Screen      | Loading screen minimal dengan progress bar |
| Animations          | Framer Motion — reveal on scroll, spring, modal detail project |
| Deploy Gratis       | Siap Vercel (frontend + serverless API) |

## Tech Stack

- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (design tokens di `app/globals.css`)
- **Fonts**: Instrument Serif (display), Inter (body), JetBrains Mono (code)
- **Animation**: Framer Motion, Lucide Icons
- **Database**: Neon Postgres (opsional) — fallback file JSON lokal `.data/db.json`
- **Notifications**: Telegram Bot API (opsional)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Salin env template (isikan nilai asli)
copy .env.example .env

# 3. Jalankan dev server
npm run dev
```

Buka <http://localhost:3000>

## Environment

| Variable              | Wajib? | Fungsi |
|-----------------------|--------|--------|
| `DATABASE_URL`        | Opsional | Neon Postgres. Kosong = pakai file lokal `.data/db.json` |
| `TELEGRAM_BOT_TOKEN`  | Opsional | Token bot Telegram (via @BotFather) untuk notifikasi |
| `TELEGRAM_CHAT_ID`    | Opsional | Chat ID tujuan notifikasi |

> Tanpa database, data tersimpan di file `.data/db.json` — hilang saat redeploy di Vercel (serverless stateless).

## Kustomisasi Konten

Semua data konten ada di **satu file**: `data/site.ts`

- `siteConfig` — nama, role, email, avatar, sosial media
- `education`, `experiences` — timeline edukasi & kodding
- `techStack` — daftar stack (pakai ikon devicon CDN)
- `botShowcase` — kartu bot Discord/Telegram
- `projects` — daftar karya (id, title, category, description, technologies, features, image, link, github, year)

## Struktur Project

```
├── app/
│   ├── api/
│   │   ├── guestbook/route.ts    # GET/POST /api/guestbook
│   │   └── visitors/route.ts     # GET/POST /api/visitors
│   ├── globals.css               # Design tokens + utilities
│   ├── layout.tsx                # Fonts + metadata
│   └── page.tsx                  # Homepage (compose sections)
├── components/
│   ├── Navbar.tsx                # Nav minimal + mobile sheet
│   ├── Hero.tsx                  # Intro editorial + stats + portrait
│   ├── About.tsx                 # Bio, stats, education, exp
│   ├── Projects.tsx              # Tab Projects/Stack/Bots + modal detail
│   ├── Contact.tsx               # Invitation card + guestbook
│   ├── Footer.tsx                # Footer + visitor counter
│   ├── WelcomeScreen.tsx         # Loading screen
│   ├── ScrollProgress.tsx        # Progress bar atas
│   └── FloatingAudio.tsx         # Musik lofi + back-to-top
├── data/site.ts                  # Semua konten
├── lib/
│   ├── storage.ts                # Unified API (auto pilih DB/local)
│   ├── storage-pg.ts             # Implementasi Postgres (Neon)
│   ├── storage-local.ts          # Fallback file JSON
│   ├── telegram.ts               # Kirim notifikasi Telegram
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Helper (UUID, sanitasi, email)
├── .env.example                  # Template env
└── next.config.ts
```

## Scripts

```bash
npm run dev     # Dev server (localhost:3000)
npm run build   # Production build
npm run start   # Jalankan hasil build
npm run lint    # ESLint check
```

## Deploy ke Vercel (Gratis)

1. Push project ke GitHub
2. Buka <https://vercel.com/new> → Import repository
3. Tambah Environment Variables di Settings: `DATABASE_URL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
4. Deploy — URL: `https://namamu.vercel.app`

> **Catatan**: `.env` tidak pernah di-commit (sudah di `.gitignore`).

## Lisensi

MIT — bebas dipakai, dimodifikasi, dan dikembangkan.