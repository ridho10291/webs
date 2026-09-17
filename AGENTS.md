# AGENTS.md

Personal portfolio for Ridho. Next.js 15 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4 (CSS-first) + Framer Motion + Lucide. Deploys to Vercel. No test suite.

## Commands

- `npm run dev` — dev server on :3000
- `npm run build` / `npm run start`
- `npm run lint` — ESLint (flat config `eslint.config.mjs`; the legacy `.eslintrc.js` is emptied/ignored). **Caveat:** the lint script uses `--ext .ts,.tsx` which is a dead flag in ESLint v10; it runs but the flag is ignored. Lint still works because ESLint 10 flat config lints all matched files by default.
- Typecheck: `npx tsc --noEmit` — there is **no npm script** for this; run it manually after TS changes.
- No formatter script. Prettier is a devDependency but has no config file and no `format` npm script. `eslint-config-prettier` is installed but **not wired into** `eslint.config.mjs`.
- **Windows quirk:** this machine's PowerShell execution policy blocks the `npm`/`npx` `.ps1` shims. Invoke `npm.cmd`/`npx.cmd` (or `cmd /c`) from the shell. Lint currently exits clean (0 errors, ~8 pre-existing `<img>` warnings). Typecheck passes.

## Critical: build location quirk

This project lives under a messy parent dir (`E:\ALL PROJECT RIDHO`) full of sibling projects. `next.config.ts` forces `outputFileTracingRoot` to the project dir **so Next stops scanning siblings during build (which hangs otherwise)**. Never remove or "clean up" that option — the build depends on it.

## Do not trust README.md

It describes an older "editorial gold" design and an outdated component list. The real site is a dark-purple (`bg-[#030014]`) bento/glassmorphism design. Trust the code, not the README. `design.md` is archived; `uiux.md` is a stale planning sketch.

## Rendering split

- Homepage `app/page.tsx` and every section component (`components/*.tsx`) are `"use client"` — the landing page is fully client-rendered.
- `app/resume/page.tsx` and `app/layout.tsx` are server components.

## Duplicated content data (gotcha)

There are **two parallel content sources that overlap**:

- `data/site.ts` — exports `siteConfig`, `about`, `techStack`, `projects`, `footerContent` (used by layout, resume page, footer).
- `data/projects.ts`, `data/skills.ts`, `data/certificates.ts` — used by home components (`Projects.tsx`, `ProjectModal.tsx`, `Skills.tsx`, `Certificates.tsx`).

Editing `data/site.ts` projects does **not** update the homepage project cards (which read `projectsData` from `data/projects.ts`) and vice versa. Check which file the consumer imports before editing.

## Storage / API behavior (`lib/storage.ts`)

- Backend chosen **once at module load**: `hasDatabase = Boolean(process.env.DATABASE_URL)`. Without `DATABASE_URL`, guestbook + visitor counts fall back to `.data/db.json` (gitignored, **lost on every Vercel redeploy** since serverless is stateless).
- API routes: `app/api/guestbook`, `app/api/visitors` (DB or local file), `app/api/contact` (Telegram-only, no DB).
- Telegram sends only when `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` are set. All user input passes through `sanitizeText`/`escapeHtml` — keep that pattern.

## Styling

- Tailwind v4 tokens (HSL vars in `:root`) mapped via `@theme` in `app/globals.css`. Token colors are **neutral grays**; the brand purple is hardcoded in JSX as `bg-[#030014]`.
- Legacy aliases `bg-*`, `text-muted` etc. kept in globals for older components + `not-found.tsx`.
- Fonts load via a Google Fonts `<link>` in `app/layout.tsx` **deliberately, not `next/font`** (build-time fetch is being avoided). Utility classes: `font-sans`, `font-mono`, `font-display`, `font-signature`.

## Misc

- Path alias `@/*` → project root (no `src/` dir).
- `components/ui/` has shadcn-style components (`components.json`, new-york). `components/ui/demo.tsx` and `components/ui/digital-serenity-animated-landing-page.tsx` are **unused/experimental** — don't wire them in.
- Several `components/*.tsx` files are **dead code** (not imported anywhere): `Bento.tsx`, `BeamCard.tsx`, `CursorFollower.tsx`, `Experience.tsx`, `MagneticButton.tsx`, `PageLoader.tsx`, `Services.tsx`, `SpotifyCard.tsx`, and the entire `components/bento/` subdirectory. Don't wire them in without explicit request.
- Site copy is Indonesian/English mix; keep it consistent.

## Agent skills

### Issue tracker

Issues and specs live as GitHub Issues in `ridho10291/webs`, driven via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary — `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` at the repo root, ADRs under `docs/adr/`, absent ones are skipped silently. See `docs/agents/domain.md`.