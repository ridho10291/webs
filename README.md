# Portfolio Ridho — Fullstack Developer

Portfolio website modern, fullstack, dan siap deploy **gratis** ke **Vercel**.  
Fitur: Contact Form API, Buku Tamu (Guestbook), Visitor Counter, Dark/Light Mode, dan notifikasi Telegram (opsional).

---

## 🎯 Fitur

| Fitur                | Deskripsi                                                  |
|----------------------|------------------------------------------------------------|
| 📬 **Contact Form**  | Form kontak yang tersimpan ke database + notifikasi Telegram |
| 📖 **Guestbook**     | Buku tamu real-time, tersimpan permanen                    |
| 👁 **Visitor Counter** | Hitungan pengunjung unik (localStorage + API)            |
| 🌓 **Dark/Light**    | Toggle tema otomatis (mengikuti sistem)                    |
| 🤖 **Bot Projects**  | Showcase proyek bot WhatsApp, Telegram, Discord, dll       |
| ⚡ **Deploy Gratis** | Siap Vercel (frontend + serverless API)                    |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Neon Postgres (gratis) — *opsional, fallback file JSON lokal*
- **Notifications**: Telegram Bot API (opsional)
- **Theme**: next-themes

---

## 🚀 Quick Start (Lokal)

```bash
# 1. Clone / buka folder project
cd E:\ALL PROJECT RIDHO\web

# 2. Install dependencies
npm install

# 3. Salin env template
copy .env.example .env

# 4. Jalankan dev server
npm run dev
```

Buka <http://localhost:3000>

---

## 🗄️ Database (Wajib untuk Produksi)

Tanpa database, data hanya tersimpan di file `.data/db.json` — **hilang saat redeploy** di Vercel (karena serverless stateless).

**Gratis & Mudah: Neon Postgres**

1. Daftar di <https://neon.tech> (atau via Vercel Integration → Neon)
2. Buat project → copy **connection string** (bukan pooling)
3. Tambah ke environment variable:
   ```
   DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Redeploy — tabel `guestbook`, `contacts`, `visitors` otomatis dibuat saat pertama kali akses API.

---

## 📱 Notifikasi Telegram (Opsional)

Pesan dari Contact Form & Guestbook dikirim ke Telegram-mu.

1. Bikin bot via **@BotFather** → dapat `TELEGRAM_BOT_TOKEN`
2. Dapat `CHAT_ID` via **@userinfobot** (forward pesan ke bot itu)
3. Tambah ke env:
   ```
   TELEGRAM_BOT_TOKEN=123456789:ABCdefGhIjK...
   TELEGRAM_CHAT_ID=987654321
   ```

> **Catatan:** Kedua variabel **wajib diisi** kalau mau notif. Kalau salah satu kosong, fitur nonaktif otomatis.

---

## 🌐 Deploy ke Vercel (Gratis)

### Otomatis (via GitHub)

1. Push project ke GitHub repository
2. Buka <https://vercel.com/new> → Import repository
3. Tambah **Environment Variables** di Settings:
   - `DATABASE_URL` (dari Neon)
   - `TELEGRAM_BOT_TOKEN` & `TELEGRAM_CHAT_ID` (opsional)
4. Deploy → selesai! URL: `https://namamu.vercel.app`

### Manual CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login & deploy
vercel login
vercel --prod
```

Vercel otomatis detek Next.js, build, dan host serverless functions di `/api/*`.

---

## 📝 Kustomisasi Konten

Semua teks & project ada di folder `data/`:

| File              | Isi                                          |
|-------------------|----------------------------------------------|
| `data/site.ts`    | Nama, role, tagline, email, sosial media     |
| `data/projects.ts`| Daftar proyek & skill (ubah bebas)           |

> Ganti `username` di `siteConfig.socials` dengan akun asli kamu.

---

## 📂 Struktur Project

```
├── app/
│   ├── api/
│   │   ├── contact/route.ts      # POST /api/contact
│   │   ├── guestbook/route.ts    # GET/POST /api/guestbook
│   │   └── visitors/route.ts     # GET/POST /api/visitors
│   ├── globals.css               # Tailwind v4 + custom styles
│   ├── layout.tsx                # Root layout + ThemeProvider
│   └── page.tsx                  # Homepage (compose sections)
├── components/
│   ├── About.tsx                 # Tentang + highlight
│   ├── Aurora.tsx                # Background animasi
│   ├── ContactSection.tsx        # Form kontak (client)
│   ├── Footer.tsx
│   ├── Guestbook.tsx             # Buku tamu (client)
│   ├── Hero.tsx                  # Hero section
│   ├── Navbar.tsx                # Nav + theme toggle
│   ├── Projects.tsx              # Kartu proyek
│   ├── SectionHeading.tsx        # Komponen heading reusable
│   ├── Skills.tsx                # Skill cards + progress bar
│   ├── ThemeToggle.tsx           # Dark/Light toggle
│   └── VisitorCounter.tsx        # Counter di hero
├── data/
│   ├── projects.ts               # Proyek & skills data
│   └── site.ts                   # Info pribadi
├── lib/
│   ├── storage-pg.ts             # Postgres (Neon) implementation
│   ├── storage-local.ts          # File JSON fallback
│   ├── storage.ts                # Unified API (auto pilih DB/local)
│   ├── telegram.ts               # Kirim notif ke Telegram
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Helper (UUID, sanitize, email)
├── .env                  # Template env
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🔧 Scripts

```bash
npm run dev     # Dev server (localhost:3000)
npm run build   # Production build
npm run start   # Jalankan hasil build
npm run lint    # ESLint check
```

---

## 💡 Tips Produksi

- **Rate limit**: API tidak pakai rate limit built-in. Untuk proyek besar, tambahkan `vercel-ratelimit` atau Upstash Redis.
- **Analytics**: Tambah Vercel Analytics (gratis) di dashboard Vercel → project → Analytics.
- **Custom domain**: Di Vercel Settings → Domains → tambah domain sendiri.
- **SEO**: `metadata` di `app/layout.tsx` + Open Graph sudah diset.

---

## 📄 Lisensi

MIT — bebas dipakai, dimodifikasi, dan dikembangkan.

---

> **Dibangun dengan ❤️ oleh Ridho**  
> Deploy gratis di Vercel — [Next.js](https://nextjs.org) + [Tailwind](https://tailwindcss.com) + [Neon](https://neon.tech)