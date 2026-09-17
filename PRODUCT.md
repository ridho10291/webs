# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 15 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4 + Framer Motion + Lucide; deploys to Vercel. No test suite. (Existing codebase; recorded for context, not a greenfield stack decision.)

## Users

- Recruiters and hiring managers evaluating Ridho as a front-end / full-stack developer, usually scanning quickly on a laptop or phone.
- Client-like visitors curious whether his craft is worth a deeper look, and whether they can reach him (telegram, socials, guestbook).
- The candidate himself (Ridho) as the voice behind the site — he curates the projects, skills, and certificates shown.

Primary user situation: short read, first impression dominates, "is this person's work good enough to contact?" All user-facing copy is a mix of Indonesian and English; visitors are Indonesian-first.

## Product Purpose

To present Ridho — who he is, what he builds, what he knows, what he's proven — and end with a low-friction way to contact him. Success = a visitor leaves with a strong, specific impression of his capability and a reason to reach out (via Contact / Telegram / guestbook).

## Positioning

The site is itself a specimen of his front-end craft. The claim it makes is visual: the interface quality is the resume. So the work must look deliberate, expensive, and distinctive rather than template-comfortable — and it must stay honest: no invented clients, projects, or claims beyond what the data files contain.

## Operating Context

- Viewed mostly on desktop and mobile browsers; guests land from links, socials, and LinkedIn.
- Hosted on Vercel; `DATABASE_URL` decides Postgres vs local `.data/db.json` for guestbook/visitors; contact is Telegram-only. `.data/` is lost on redeploy without a DB.
- Rendering: homepage and all section components are `"use client"`; `resume` page and root layout are server components.
- Content is duplicated across `data/site.ts` (layout/resume/footer) and `data/projects.ts|skills.ts|certificates.ts` (home components) — editing one does not update the other.

## Capabilities and Constraints

- Sections on the landing page: Hero, About, Skills, Projects (with modal), Certificates, Guestbook (DB or local), Contact (Telegram), Footer; plus a standalone Resume route.
- Client-rendered homepage; external avatar image URL; no local raster assets.
- Projects/certificates are real and listed in `data/`; must not fabricate new ones.
- Reduced-motion is respected; keep it.
- Keep the existing API behavior (guestbook/visitors/contact), data files' shape, and the `@/*` path alias.
- No test suite; verify via `npm run build` / `npx tsc --noEmit` / `npm run lint`.

## Brand Commitments

- Name and identity: Ridho, personal portfolio "webs".
- Bilingual copy (ID/EN) — preserve and keep consistent.
- Social links, avatar, availability text, and role labels come from `data/site.ts` — source of truth for identity fields.
- **Design decision (user-confirmed):** a full visual redesign. The incumbent dark-purple glass/bento look is treated as evidence and anti-reference, not authority, for the new world.

## Evidence on Hand

- Real content: `data/site.ts`, `data/projects.ts`, `data/skills.ts`, `data/certificates.ts` (real projects, skills, certificates), avatar URL, real socials, `app/resume` content.
- Guestbook + contact backends already implemented under `app/api`.
- No fictional testimonials, metrics, or client names exist; do not fabricate any.

## Product Principles

1. First viewport is the specimen: the craft claim must land in seconds, then let the page deepen it.
2. Motion is material, orchestrated once across the page, never scattered hover-only effects; content stays visible by default.
3. Every pixel proves the claim — no dropped-in stock chrome, no hand-waving placeholders.
4. Performance and responsiveness are part of the craft: animations stay cheap, mobile is a co-equal target, not a shrink.
5. Honest by default: real projects, real claims, and a real path to contact.

## Accessibility & Inclusion

Reduced-motion CSS block already exists in `app/globals.css`; motion design must respect it. Semantic landmarks, focus-visible styles, and descriptive labels should be preserved or raised.