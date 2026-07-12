# DEVLOG — AI Spend Audit Tool

> Daily development log for the TechVruk Web Development Intern Assignment (Round 1).

---

## Day 1 — 2026-07-12

**Hours worked:** 4

**What I did:**

- Read through the full assignment brief and mapped out a 7-day plan, prioritising by rubric weight (entrepreneurial thinking = 25%, engineering = 15%, etc.)
- Chose the tech stack: **Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui**. Reasoning: Vite for fast DX, React/TS for type safety and component model, Tailwind v4 for utility-first styling, shadcn/ui for accessible primitives without vendor lock-in. Documented decision for ARCHITECTURE.md.
- Initialised the project with `npm create vite@latest`, installed Tailwind CSS v4, and bootstrapped shadcn/ui (base preset)
- Set up **ESLint** with TypeScript, React Hooks, React Refresh, and **Prettier** integration (eslint-plugin-prettier + eslint-config-prettier). Added `lint`, `lint:fix`, `format`, and `format:check` npm scripts for CI readiness.
- Configured **path aliases** (`@/*` → `./src/*`) in both `tsconfig.json` and `vite.config.ts` so imports stay clean
- Created the full **folder structure**: `src/pages/`, `src/engine/`, `src/types/`, `src/data/`, `src/hooks/`, `src/services/`, `src/constants/`
- Defined **core TypeScript types** (`ToolId`, `UseCase`, `SpendInput`, `ToolAuditResult`, `AuditResult`, `LeadData`) — these are the data contracts the entire app will be built on
- Researched and documented pricing for **all 8 required tools** in `PRICING_DATA.md` with official vendor URLs and verification dates. Cross-checked against live pricing pages for Cursor, GitHub Copilot, Claude, ChatGPT, Anthropic API, OpenAI API, Gemini, and Windsurf.
- Built the **pricing data module** (`src/data/pricing.ts`) with typed `ToolInfo[]` covering every plan tier — this is the single source of truth the audit engine will read from
- Set up app-wide **constants** (savings thresholds, rate limits, app name placeholder)
- Made first Git commit

**What I learned:**

- Cursor has restructured to a credit-based model (Pro gives $20 of frontier-model credits, not a fixed request count). This changes the audit logic — can't simply say "X requests/month" anymore, need to think in terms of credit pool exhaustion.
- GitHub Copilot is also credit-based now (1 credit = $0.01), with standard completions remaining unlimited. The audit engine needs to distinguish between "completion-only" users vs "agentic workflow" users.
- Claude Team has a **minimum 5 seats** requirement — this is a key audit rule for small teams overpaying.
- Windsurf switched from monthly credits to daily/weekly quotas in early 2026. Different mental model for usage-based recommendations.

**Blockers / what I'm stuck on:**

- Enterprise pricing for Cursor, Windsurf, and ChatGPT is "contact sales" with no public numbers. Using base Team pricing as floor estimates in the engine but flagging these with a "contact sales for accurate quote" disclaimer. Need to decide how the audit engine handles these gracefully.
- Haven't started user interview outreach yet — need to DM people tonight or first thing tomorrow. This is time-sensitive since people take days to respond.

**Plan for tomorrow:**

- Send 8–10 DMs for user interview outreach (founders, devs on X/Twitter, college network)
- Build the **spend input form** (MVP Feature #1): tool selector, plan picker, cost/seats inputs, localStorage persistence
- Start the **audit engine** core logic with the first few rules (plan downgrades, cross-vendor alternatives)
- Write first 2–3 unit tests for the audit engine
- Deploy initial version to Vercel (even if just a landing page)
