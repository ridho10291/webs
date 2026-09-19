# Project Context

Personal portfolio website for Ridho. Next.js 15 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4.

## Key Architecture Notes

- **Branding**: Dark-purple glassmorphism (`bg-[#030014]`)
- **Content sources**: Two parallel systems - `data/site.ts` (layout/resume/footer) and `data/projects.ts`/`data/skills.ts` (homepage cards)
- **Storage**: Falls back to Git-ignored `.data/db.json` if `DATABASE_URL` not set
- **API routes**: guestbook, visitors (DB/local file), contact (Telegram-only)
- **Components**: Homepage fully client-rendered; resume/server components

## Key Terms

- **Project cards**: Homepage display components, use `data/projects.ts`
- **Site config**: Layout/resume/footer data, use `data/site.ts`
- **ADRs**: Documentation changes under `docs/adr/`