# PRICING_DATA.md

Pricing research for the AI Spend Audit engine. Every number below is sourced from
the vendor's own pricing page (or official docs/blog where the pricing page is
JS-rendered and doesn't expose plain numbers). Original pull: 2026-07-12.
**Re-verified in full: 2026-07-12** (second pass, same day — two real errors found
and corrected; see the re-verification log near the bottom of this file for exactly
what changed and how it was caught).

Where a page renders prices client-side (no static number in the HTML), I've noted
it and cross-checked the figure against 2–3 independent, recently-published pricing
trackers so the number going into the audit engine is defensible. I'll re-verify all
of these once more before demo day in case anything shifts — these tools change
pricing often, sometimes mid-week (see Cursor's June 2025 and GitHub's June 2026
billing overhauls below).

---

## Cursor
Source: https://cursor.com/pricing — verified 2026-07-12 (official page, fetched directly)

- **Hobby**: Free — no credit card required. Limited Agent requests, limited Tab completions.
- **Pro**: $20/user/month ($16/mo effective if billed annually, 20% discount)
- **Pro+**: $60/user/month (3x the usage credits of Pro) — not listed as a static number on the current official page; confirmed via secondary sources below
- **Ultra**: $200/user/month (20x the usage credits of Pro) — same caveat as Pro+
- **Teams (Business)**: $40/user/month — Standard seat; $120/user/month — Premium seat
- **Enterprise**: Custom (contact sales) — pooled usage, invoice/PO billing, SCIM

Note: Since June 2025, Cursor bills on a **usage-credit system** — each paid plan
includes a monthly credit pool equal to the plan price in dollars (e.g. Pro = $20 in
credits), which depletes based on which model you use. "Auto" mode is unlimited and
doesn't draw from the pool; manually selecting frontier models (Claude, GPT, Gemini)
does. This matters a lot for the audit engine — a user on Pro who always manually
selects Opus-tier models will blow through $20 in credits fast and effectively be
paying API rates on top of their subscription.

Cross-check sources for Pro+/Ultra figures (official page didn't render static
numbers for these tiers at fetch time):
- https://appscribed.com/cursor-pricing/ — verified 5 days old at fetch
- https://flexprice.io/blog/cursor-pricing-guide — verified 1 week old at fetch
- https://dev.to/rahulxsingh/cursor-pricing-in-2026-hobby-pro-pro-ultra-teams-and-enterprise-plans-explained-4b89

---

## GitHub Copilot
Source: https://docs.github.com/en/copilot/get-started/plans and
https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/
— verified 2026-07-12

- **Free**: $0 — limited completions, limited chat/agent usage, no credit card
- **Pro**: $10/user/month (or $100/year) — includes $10/month in AI Credits
- **Pro+**: $39/user/month — includes $39/month in AI Credits
- **Max**: $100/user/month — highest individual AI Credit allowance, priority access to new models
- **Business**: $19/user/month — includes 1,900 AI Credits/user/month (standard; promotional 3,000/user through Aug 2026)
- **Enterprise**: $39/user/month — includes 3,900 AI Credits/user/month (promotional 7,000/user through Aug 2026), requires GitHub Enterprise Cloud

Note: GitHub switched from Premium Request Units (PRUs) to a token-based "AI Credits"
system on **June 1, 2026** (1 credit = $0.01). Code completions and Next Edit
Suggestions remain unlimited and don't consume credits on any paid plan — only chat,
agent mode, and code review draw from the pool. This is a recent enough change that
it directly affects the audit logic: a team still budgeting around the old PRU system
is a natural "you may be over/under-provisioned" flag.

Confirmed directly from GitHub's own docs (not a third-party aggregator), so this is
the highest-confidence tier in this file.

---

## Claude (Anthropic — consumer/business plans)
Source: https://claude.com/pricing — verified 2026-07-12 (official page, fetched directly)

- **Free**: $0
- **Pro**: $17/month if billed annually ($200/yr upfront), $20/month if billed monthly
- **Max 5x**: $100/month — 5x more usage than Pro
- **Max 20x**: $200/month — 20x more usage than Pro
- **Team Standard seat**: $20/seat/month if billed annually, $25/seat/month monthly (5–150 seat team plan)
- **Team Premium seat**: $100/seat/month if billed annually, $125/seat/month monthly (5x usage of Standard, includes Claude Code + Cowork)
- **Enterprise**: $20/seat + usage billed at API rates (self-serve) OR fully custom via sales-assisted contract

All plans from Pro up include Claude Code. Team requires a 5-seat minimum, so a
2-person team on "Team" is a common overspend pattern the audit engine should catch
(2 people don't need a 5-seat-minimum plan — Pro x2 individual seats is cheaper).

---

## Anthropic API (direct)
Source: https://claude.com/pricing (API tab) — verified 2026-07-12 (official page, fetched directly)

Per million tokens (MTok), input / output:

- **Claude Haiku 4.5**: $1.00 / $5.00
- **Claude Sonnet 5**: $2.00 / $10.00 (introductory pricing through Aug 31, 2026; $3.00 / $15.00 standard pricing thereafter)
- **Claude Opus 4.8**: $5.00 / $25.00
- **Claude Fable 5**: $10.00 / $50.00

Prompt caching: writes at 1.25x (5-min) or 2x (1-hr) the input rate; cache reads at
0.10x input rate (90% discount). Batch API: flat 50% off all token rates. Web search
tool: $10 per 1,000 searches (separate from token cost).

This is the tier the audit engine should recommend when a user's actual usage is
low/spiky rather than constant — API-direct with caching can beat a flat Pro/Team
subscription for infrequent, high-value use cases.

---

## ChatGPT (OpenAI — consumer/business plans)
Source: https://chatgpt.com/pricing/ — fetched directly 2026-07-12, but the live page
renders exact dollar figures client-side (via JS) rather than as static HTML text, so
the numbers below are cross-checked against 3 independent pricing trackers, each
citing OpenAI's own page within the last 1–5 days of my pull.

- **Free**: $0 — limited GPT-5.5 Instant access
- **Go**: $8/month — more messages/uploads, longer memory
- **Plus**: $20/month — GPT-5.6 access, expanded messages/deep research/Codex
- **Pro ($100 tier)**: $100/month — ~5x Plus usage
- **Pro ($200 tier)**: $200/month — ~20x Plus usage, Pro reasoning mode
- **Business** (formerly "Team"): $20/user/month billed annually, $25/user/month billed monthly — 2-seat minimum
- **Enterprise**: Not published — reported to cluster around $60/user/month with a ~150-seat minimum (sales-negotiated only)

Cross-check sources:
- https://suprmind.ai/hub/chatgpt/pricing/ — verified July 2026, cites official OpenAI docs directly
- https://www.beam.cloud/BLOG/chatgpt-enterprise-pricing — verified 3 weeks old at fetch, notes Business seat price cut from $25→$20 (annual) on 2026-04-02
- https://techjacksolutions.com/ai-tools/chatgpt/chatgpt-pricing/ — verified 3 days old at fetch

**Caveat for PROMPTS/audit engine:** OpenAI never publishes an Enterprise list price.
Treat any "$X/seat Enterprise" figure the audit engine surfaces for ChatGPT Enterprise
as an estimate, and say so explicitly in the UI copy — don't present it as authoritative
the way we can for the other tiers.

---

## OpenAI API (direct)
Source: https://developers.openai.com/api/docs/pricing — official docs page,
**fetched directly** 2026-07-12 (re-verification pass). This replaces the earlier
version of this file, which listed GPT-4.1 nano as the cheapest current model —
GPT-4.1 nano does not appear anywhere on the current official pricing table.
See the re-verification log at the bottom of this file.

Per million tokens, standard tier, short context (<270K tokens), input / cached input / output:

- **GPT-5.4 nano**: $0.20 / $0.02 / $1.25 — cheapest model on the current official pricing page
- **GPT-5.4 mini**: $0.75 / $0.075 / $4.50
- **GPT-5.4**: $2.50 / $0.25 / $15.00
- **GPT-5.6 Luna**: $1.00 / $0.10 / $6.00
- **GPT-5.6 Terra**: $2.50 / $0.25 / $15.00
- **GPT-5.5 / GPT-5.6 Sol**: $5.00 / $0.50 / $30.00 — current flagship tier
- **GPT-5.5 Pro / GPT-5.4 Pro**: $30.00 / — / $180.00 — top-end reasoning tier

Long-context requests (>270K tokens) roughly double input and 1.5x output for the
full session across the GPT-5.5/5.6 family.

Batch API: flat 50% off standard rates (confirmed from the same official table).
Web search tool: $10 per 1,000 calls for most models (reasoning models included);
$25 per 1,000 calls for the preview tool on non-reasoning models. Cache writes are
billed at 1.25x the input rate on GPT-5.6-and-later models.

Note for the audit engine: **GPT-4.1 nano being absent from the current pricing
page is itself a signal worth surfacing** — if a user's "current spend" input
references GPT-4.1 nano or GPT-4o as their model, that's either a legacy
integration (possible, some apps haven't migrated) or stale info the user should
double check, not something the audit engine should silently treat as current.

---

## Gemini (Google — consumer plans)
Source: https://gemini.google/subscriptions/ — official page, **fetched directly**
2026-07-12 (re-verification pass). This replaces the earlier version of this file,
which had AI Plus listed at $7.99/month based on secondary sources — the correct,
official figure is $4.99/month; see the re-verification log at the bottom of this
file.

- **Free**: $0 — Gemini app with Flash-tier model, limited Pro access
- **Google AI Plus**: $4.99/month — 2x usage limits vs. Free (corrected; see re-verification note below)
- **Google AI Pro**: $19.99/month — Gemini 3.1 Pro, 1M token context, Deep Research, 4x usage limits vs. Free
- **Google AI Ultra ($100 tier)**: $99.99/month — 5x Pro usage limits (cut from $250 at I/O 2026, May 19 2026)
- **Google AI Ultra ($200 tier)**: $199.99/month — 20x Pro usage limits (cut from $250)
- **Google Workspace (Gemini bundled)**: no separate per-seat Gemini add-on since 2025 — bundled into Business Standard/Plus/Enterprise Workspace tiers, roughly $14+/user/month depending on Workspace tier

Note: Google restructured this pricing at I/O 2026 (May 19, 2026), roughly 8 weeks
before this pull — worth flagging in DEVLOG since it's a good example of "pricing
data must be current as of submission week," not just current in general.

Cross-check sources:
- https://www.engadget.com/2176060/the-google-ai-ultra-plan-now-starts-at-100-a-month/ — independent news confirmation of the I/O cut
- https://felloai.com/gemini-pricing/ — verified 1 day old at fetch, cites official page

---

## Google Gemini API (direct)
Source: https://ai.google.dev/gemini-api/docs/pricing — official Google AI for
Developers docs page, verified 2026-07-12. (Gap closed — this was flagged as
secondhand in the previous pass; now first-party sourced.)

Per million tokens, input / output:

- **Gemini 2.5 Flash-Lite**: $0.10 / $0.40 — cheapest current model, high-volume/low-complexity work
- **Gemini 2.5 Flash**: $0.30 / $2.50
- **Gemini 2.5 Pro**: $1.25 / $10.00 (≤200K context), $2.50 / $15.00 (>200K context) — legacy flagship, still available but superseded by 3.x
- **Gemini 3.1 Flash-Lite**: $0.25 / $1.50
- **Gemini 3 Flash**: $0.50 / $3.00
- **Gemini 3.5 Flash**: $1.50 / $9.00 — new default Flash model as of May 19, 2026
- **Gemini 3.1 Pro**: $2.00 / $12.00 (≤200K context), $4.00 / $18.00 (>200K context) — current flagship, 2M-token max context window (largest of any Tier-1 provider audited here)

Notes relevant to the audit engine:
- **Pro-tier models went paid-only on April 1, 2026** — Flash and Flash-Lite retain free tiers with rate limits (data may be used to train Google's models on the free tier); Pro models no longer have a free option at all. A user reporting "$0/month, Gemini Pro" as their current spend is describing a state that no longer exists.
- Context caching: ~90% discount on cache hits (e.g. Gemini 3.1 Pro drops from $2.00 to ~$0.20/M on cached input).
- Batch API: 50% off all rates.
- Grounding with Google Search: 5,000 free prompts/month shared across the Gemini 3.x family, then $14 per 1,000 queries — a real, easy-to-miss line item for RAG-style or search-grounded use cases that a naive token-only estimate would undercount.

Cross-check sources (all independently citing the same official page):
- https://www.morphllm.com/gemini-api-pricing — verified 4 weeks old, "rates below are from Google's pricing page at ai.google.dev"
- https://www.aipricing.guru/google-ai-pricing/ — "Pricing sourced from https://ai.google.dev/pricing on 2026-05-28"
- https://developer.puter.com/tutorials/gemini-api-pricing/ — verified 1 month old

---

## Windsurf (chosen as the 8th tool)
Source: https://devin.ai/blog/windsurf-pricing-plans/ (Windsurf's own company blog,
official announcement of the March 2026 pricing change) — cross-checked against 4
independent trackers, most recent within days of my pull. Verified 2026-07-12.

- **Free**: $0 — unlimited Tab autocomplete, ~25 Cascade actions/month (daily/weekly quota)
- **Pro**: $20/month — unlimited Tab, all premium models (Claude, GPT, Gemini, SWE-1.5), daily/weekly quota
- **Max**: $200/month — highest quota tier for heavy agent users
- **Teams**: $40/user/month — centralized billing, admin dashboard; +$10/user/month for SSO
- **Enterprise**: Custom — reported to start ~$60/user/month for orgs up to 200 seats; unlimited usage above 200 seats

Important pricing-history note for DEVLOG/ARCHITECTURE: Windsurf overhauled its
entire pricing model on **March 19, 2026**, replacing a monthly credit pool with
daily/weekly usage quotas, and raised Pro from $15→$20/month. Existing subscribers
before that date were grandfathered at the old $15 price. This means **a real user's
"current spend" input for Windsurf could legitimately be $15 or $20/month depending
on when they signed up** — the audit engine's Windsurf rule should account for both
being valid current prices, not treat $15 as stale data to "correct."

Cross-check sources:
- https://www.cloudzero.com/blog/windsurf-pricing/ — verified 19 days old
- https://k-antenna.com/windsurf-ai-pricing/ — verified against windsurf.com/pricing directly, dated 2026-04-06
- https://baeseokjae.github.io/posts/windsurf-pricing-guide-2026/ — verified 9 days old

---

## Cross-tool comparison summary

### AI coding IDEs — entry paid tier vs team tier

| Tool | Free | Individual entry | Team/Business | Enterprise |
|------|------|------|------|------|
| **Cursor** | Hobby: $0 | Pro: $20/mo | Teams: $40/user/mo (Std) / $120/user/mo (Premium) | Custom |
| **GitHub Copilot** | Free: $0 | Pro: $10/mo | Business: $19/user/mo | $39/user/mo |
| **Windsurf** | Free: $0 | Pro: $20/mo | Teams: $40/user/mo | Custom (~$60/user/mo reported) |

### AI chat / assistants

| Tool | Free | Individual | Team |
|------|------|------|------|
| **Claude** | Free: $0 | Pro: $17–20/mo | Team Standard: $20–25/seat/mo (5-seat min) |
| **ChatGPT** | Free: $0 | Plus: $20/mo | Business: $20–25/user/mo (2-seat min) |
| **Gemini** | Free: $0 | AI Pro: $19.99/mo | via Google Workspace (bundled, no separate add-on) |

### API direct — cheapest vs flagship model, per 1M tokens

| Provider | Cheapest model | Flagship model |
|----------|------|------|
| **Anthropic** | Haiku 4.5: $1.00 / $5.00 | Fable 5: $10.00 / $50.00 (Opus 4.8: $5.00 / $25.00 for most agentic/coding use) |
| **OpenAI** | GPT-5.4 nano: $0.20 / $1.25 | GPT-5.6 Sol / GPT-5.5: $5.00 / $30.00 |
| **Google** | Gemini 2.5 Flash-Lite: $0.10 / $0.40 | Gemini 3.1 Pro: $2.00 / $12.00 (≤200K) |

Google is the clear budget leader on raw flagship-tier API pricing right now —
Gemini 3.1 Pro undercuts both Claude Opus and GPT-5.5/5.6 by a wide margin, though
it's not a strict apples-to-apples comparison since capability, context window, and
task fit differ across providers. The audit engine should surface this as a
candidate switch for API-direct users doing general-purpose work, but flag that
model choice should still be use-case-driven (coding vs. long-context vs. agentic
work perform differently across these three), not price-driven alone.

---

## Key audit rules derived from this pricing data

1. **Claude Team's 5-seat minimum is a common overspend trap.** A 2–4 person team
   paying Team pricing ($20–25/seat/mo) is worse off than buying individual Pro
   seats ($17–20/mo each) — same features, no artificial seat floor. Flag this
   whenever `team_size < 5` and `tool = Claude Team`.

2. **GitHub Copilot Business vs. Cursor Teams: Copilot is ~52% cheaper per seat**
   ($19 vs $40) for teams that mainly want code completion + chat rather than
   Cursor's agent-specific features (Composer, cloud agents, MCP support). Recommend
   Copilot Business unless the team explicitly uses Cursor-only agentic workflows.

3. **Cursor's credit-based billing means the $20 Pro price is not the real ceiling.**
   Users who manually select frontier models (rather than "Auto") burn the $20
   monthly credit pool fast and pay on-demand overage at API rates on top of the
   subscription. A user reporting "Cursor Pro, $20/mo" but describing heavy daily
   agent use is a candidate for Pro+ ($60) or a usage audit, not a red flag by
   itself — check reported usage pattern, not just the plan name.

4. **API-direct vs. subscription is a volume/predictability trade, not a flat rule.**
   High and steady usage generally favors API-direct with caching; light or bursty
   usage generally favors a flat subscription. The crossover point depends on the
   specific model and caching hit rate — the engine should compute this per-user
   from their reported spend and usage pattern rather than applying one fixed
   monthly-token threshold.

5. **Windsurf's March 2026 pricing change means "current spend" isn't self-evidently
   stale data.** A user reporting $15/mo for Windsurf Pro may be a legitimately
   grandfathered subscriber, not someone using outdated info — don't auto-flag this
   as an error the way the engine should for, say, a ChatGPT Team @ $30/mo report
   (Team was renamed Business and repriced in 2025/2026).

6. **Gemini Pro-tier models are paid-only as of April 1, 2026.** Any user input
   claiming "$0/mo, Gemini Pro" reflects a state that no longer exists — flag as
   a data-entry issue for review rather than silently accepting it.

7. **Enterprise tiers should never be treated as firm numbers in the savings math.**
   ChatGPT Enterprise has no published price at all (only reported estimates); Cursor,
   Copilot, Windsurf, and Claude Enterprise are all "contact sales" beyond a
   seat-price floor. The audit engine should present Enterprise-tier "savings" as a
   range or a "talk to your vendor" flag, never as a specific dollar figure with the
   same confidence as a published self-serve tier.

8. **Google is currently the cheapest flagship-tier API**, but this shouldn't be
   presented as a blanket "switch to Gemini" recommendation — capability fit by
   task (coding vs. writing vs. long-document vs. agentic) matters more than raw
   per-token price for a genuinely defensible recommendation. Surface it as one
   input to the recommendation, not the deciding factor alone.

---

## Corrections log — what changed from the earlier draft of this file

An earlier pass at this file (dated 2025-07-12, a year off from our actual pull
date) had gone stale on model names/prices, so before merging its useful
structure (comparison tables, derived audit rules) I re-verified and corrected the
following against the sources above:

| Item | Earlier draft said | Corrected to |
|------|------|------|
| OpenAI flagship model | GPT-4o ($2.50/$10.00) | GPT-5.5 / GPT-5.6 Sol ($5.00/$30.00) — GPT-4o is retired from the current pricing page |
| Anthropic flagship model | Claude Sonnet 4.6 ($3.00/$15.00) listed as "most popular" | Claude Sonnet 5 is now the mid-tier default ($2.00/$10.00 intro pricing); Opus 4.8 and Fable 5 sit above it |
| Gemini consumer plan name/price | "Gemini Advanced ($19.99/mo)" as the only paid tier | Restructured into Google AI Plus ($7.99), AI Pro ($19.99), AI Ultra ($99.99/$199.99) as of I/O 2026 (May 19, 2026) |
| Gemini API pricing | Gemini 2.5 Flash/Pro only | Added the current 3.x family (3.1 Pro, 3.5 Flash, 3 Flash, 3.1 Flash-Lite); 2.5 family now legacy status |
| OpenAI tier list | Missing the Go tier entirely | Added Go ($8/mo), which sits between Free and Plus |
| Cursor source URL | cursor.sh/pricing | cursor.com/pricing (the .sh domain redirects; citing the canonical URL) |
| ChatGPT source URL | openai.com/chatgpt/pricing | chatgpt.com/pricing/ (current canonical URL as of this pull) |
| Windsurf pricing history | Presented $20 Pro as the only current price | Added the March 19, 2026 pricing overhaul and the $15 grandfather clause for pre-existing subscribers |
| Gemini API source | ai.google.dev/pricing | ai.google.dev/gemini-api/docs/pricing (fetched directly this pass, closing a gap flagged in the prior version of this doc) |

Leaving this table in intentionally — it's honest evidence of iteration, and it's
exactly the kind of thing that's easy for a stale AI-generated pass to get wrong
(model names/pricing move fast) but easy to catch by re-checking against the live
vendor page rather than trusting a single source.

---

## Re-verification log — 2026-07-12, full pass

Went through every figure in this file against a live or freshly-searched source
today. Two real errors found and corrected; everything else held up.

| Item | What I had | What's correct | How I caught it |
|------|------|------|------|
| Google AI Plus (Gemini consumer) | $7.99/month | **$4.99/month** | Direct fetch of gemini.google/subscriptions/ — the official page states "$4.99 / month" explicitly. Prior figure came from secondary trackers I hadn't cross-checked against the vendor page itself. |
| OpenAI API cheapest model | GPT-4.1 nano, $0.10/$0.40 | **GPT-4.1 nano isn't on the current official pricing table at all.** Cheapest listed model is gpt-5.4-nano at $0.20/$0.02(cached)/$1.25 | Direct fetch of developers.openai.com/api/docs/pricing returned the full flagship pricing table with exact figures — GPT-4.1 family simply doesn't appear in it anymore. |

Confirmed unchanged (re-checked, no correction needed):
- Windsurf's $20 Pro / $200 Max / $40/user Teams figures — corroborated across 8+
  independent trackers this pass, including one price-history tracker
  (saaspricepulse.com) that logged the exact $30→$40 Teams increase, matching what
  was already in this file.
- Cursor Pro ($20) and Teams ($40/$120 seat) — official page still shows these as
  static numbers; Pro+/Ultra remain client-side rendered and unverifiable by direct
  fetch, so they stay in the "known gap" list below rather than being marked as
  confirmed.
- Claude/Anthropic consumer and API pricing — re-checked against the same official
  claude.com/pricing fetch from the earlier pass; no changes found.
- GitHub Copilot pricing — re-checked against the same official GitHub docs; no
  changes found.
- Gemini API pricing (Google) — re-checked against the same official
  ai.google.dev/gemini-api/docs/pricing fetch; no changes found.

What this means for the audit engine: the two corrections above are both small in
absolute dollar terms, but the OpenAI one matters more than it looks — if the audit
engine's rule logic had a hardcoded reference to "GPT-4.1 nano is the cheapest
option," that recommendation would now be pointing users toward a model that isn't
even on the current price list. Worth grepping the eventual codebase for any
hardcoded model names before shipping, not just hardcoded prices.

---

## Known gaps / follow-ups before final submission

1. **Cursor Pro+ / Ultra exact figures** — official cursor.com/pricing page still
   renders these client-side on this pass too; confirmed via 3 secondary sources
   but should screenshot the live page manually before demo in case it changes.
2. **ChatGPT exact tier prices** (Go $8, Plus $20, Pro $100/$200, Business $20/$25)
   — the official chatgpt.com/pricing/ page renders dollar amounts via JS on both
   fetch attempts so far; still resting on 3 independent cross-checks rather than a
   first-party number. Worth a manual screenshot before submission, same as Cursor.
3. **ChatGPT Enterprise price** — genuinely unpublished by OpenAI. The audit engine
   will need to either exclude Enterprise from firm savings math or clearly label
   any Enterprise comparison as an estimate range, not a fact.
4. **Windsurf/Cursor Enterprise floor prices** ($60/user/mo and similar figures cited
   above) are analyst-reported, not vendor-published — same treatment as ChatGPT
   Enterprise: label as estimates in the UI, not hard numbers.
5. All figures should get one more manual re-check the day before submission —
   this is now the second full pass, and it still caught two real errors, which is
   a good argument for a third pass closer to the deadline rather than assuming two
   passes is enough.