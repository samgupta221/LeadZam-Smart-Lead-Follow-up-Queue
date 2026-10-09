# LeadZam UI/UX Audit

**Scope:** leadzam.com marketing site (reviewed in full) and the sign-up entry points. Findings tagged **[Verified on site]** come from the live marketing page. Findings tagged **[Verify in app]** are hypotheses about the logged-in product that I confirm against my own trial workspace (dummy data only); screenshots are in `docs/screenshots/`.

> Method: read the site as a first-time visitor, then followed Start Free Trial → app.leadzam.com. I did not attempt to bypass auth or touch real customer data.

| # | Finding | Priority |
|---|---|---|
| 1 | Daily follow-up / call-logging loop is high-friction | **High** |
| 2 | First-time user: no clear "start here" after sign-up | **High** |
| 3 | Unexplained ad-tech jargon blocks non-marketers | Medium |
| 4 | Site speaks to marketers; the sales rep persona is thin | Medium |
| 5 | Same action, four different CTA labels | Low |

## 1. Follow-up & call-logging loop (High) — **[Verify in app]**
- **Where:** Follow-up/leads list → call → log result → next lead. The site itself sells this loop ("Connected · 4m 12s", "Missed · follow up today", "automate follow-ups").
- **User goal:** a telecaller works 80–150 leads a day and must know *who to call next*, call, record the outcome, schedule the next touch, and move on.
- **Problem (hypothesis to confirm):** each call forces several navigations (open lead → call → open form → change stage → set reminder → return to list). Overdue and due-later leads look alike, so urgency isn't visible, and nothing tells the rep "next lead".
- **Why it matters:** seconds per call × hundreds of calls = hours of lost talk time; missed follow-ups are lost ad spend, and outcome data feeds the Offline-CAPI quality signals LeadZam sells.
- **Direction:** one queue sorted by SLA urgency, one-step outcome logging (keys 1–6), required note/schedule only where needed, "Save & Next". **This is what I built.**
- *Confirm:* count clicks from "call ends" to "next call starts" in the current app.

## 2. First-run clarity after sign-up (High) — **[Verify in app]**
- **Where:** first login to app.leadzam.com.
- **Goal:** get the first lead in and see value within minutes of the 14-day trial.
- **Problem (hypothesis):** a new workspace with no leads, integrations or team needs one obvious path (connect Meta / import CSV / add a lead). Empty dashboards or unlabeled setup steps lose trial users.
- **Why:** trial activation is the main business metric of a 14-day trial.
- **Direction:** a 3-step setup checklist with a single primary action and meaningful empty states. Not chosen: needs real onboarding analytics to size properly.

## 3. Ad-tech jargon with no explanation (Medium) — **[Verified on site]**
- **Where:** home page, "Generate better-quality leads" card: "CAPI-integrated forms… Offline CAPI reports back…".
- **Goal:** a visitor decides whether LeadZam solves their problem.
- **Problem:** "CAPI/Offline CAPI" is never expanded on the card; non-specialists (owners, sales heads) stop reading. The diagram chips ("Form submitted → Meta + Google CAPI") assume knowledge.
- **Why:** this is the product's key differentiator, hidden behind a term only part of the audience knows.
- **Direction:** lead with the outcome ("Tell Meta & Google which leads became customers"), expand CAPI once as "Conversions API", keep the term for specialists.

## 4. Sales-rep persona is thin on the site (Medium) — **[Verified on site]**
- **Where:** hero and feature cards. Hero targets "teams running Meta & Google lead campaigns"; the founder story and 3 of 6 cards are marketer-centric.
- **Problem:** the people who use the app most (telecallers, managers) see only small card mock-ups of their daily work, and no visual of the follow-up screen.
- **Why:** buyers are marketers, but adoption depends on reps; a rep-facing proof point shortens the sale.
- **Direction:** add one real screenshot of the follow-up queue and call-logging flow under "Track Sales Calls".

## 5. CTA label inconsistency (Low) — **[Verified on site]**
- **Where:** nav "Start Free Trial", hero "Start 14-Day Free Trial", footer band "Create Free Account", footer "Sign up". All go to the same register URL; "Book a Demo" is a separate secondary action.
- **Problem:** four names for one action blur the primary/secondary hierarchy and a "Create Free Account" reads as a different commitment.
- **Direction:** one label ("Start free trial") everywhere; "Book a demo" stays visually secondary.

## Why #1 over #2
Both are high impact. #1 is the daily, repeated task for the highest-volume users and the source of the data LeadZam's quality loop depends on; it is also something I can design and build end-to-end in the time box. #2 needs funnel data I don't have.

## Not redesigned
Dashboard, campaigns, call-log analytics, settings, WhatsApp inbox, marketing site.
