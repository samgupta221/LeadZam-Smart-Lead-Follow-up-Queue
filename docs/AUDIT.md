# LeadZam UI/UX Audit

**What I reviewed:** leadzam.com (hero, features, integrations, founder), the sign-up screen, the post-sign-up onboarding screen, and the Admin Dashboard of my own trial workspace (dummy data, empty workspace). Screenshots are in `docs/screenshots/`.
**Limitation (stated openly):** my trial workspace had 0 leads, so the Follow-ups and Calls screens were empty and I did not audit their populated state. Finding 1 therefore rests on product-level evidence (onboarding choices, navigation structure, marketing claims) rather than on a populated screen, and I treat it as a design hypothesis to validate with real telecallers.

| # | Finding | Where | Priority |
|---|---|---|---|
| 1 | The daily follow-up loop is a core job but is not the focus of the product's first impression | Onboarding, sidebar, site | **High** |
| 2 | Onboarding screen shows no visible next step | Post-sign-up | **High** |
| 3 | First dashboard is mostly empty states with no guidance | Admin Dashboard | Medium |
| 4 | Site leads with ad-tech jargon and shows no product UI | Home page | Medium |
| 5 | Small consistency gaps (button widths, CTA names, consent) | Sign-up, site | Low |

---

## 1. Daily follow-up loop (High)
- **Where:** onboarding question "What do you want to get done first?", sidebar (`Follow-ups` and `Calls` are separate items), home page card 04 ("Missed · follow up today").
- **Screenshots:** `04-onboarding.png`, `07-sidebar-nav.png`, `02-site-features.png`
- **User goal:** a telecaller or sales rep needs to know who to call next, call, record the result and schedule the next touch, many times a day.
- **Evidence:** LeadZam itself offers "Follow up faster" as one of only five first goals, and sells call logs and follow-ups on the site, so this is a core job. In the sidebar, following up and calling live in two different places, so one call-and-log cycle likely spans two screens.
- **Problem (hypothesis):** following up and calling are separate destinations, so one call-and-log cycle likely spans several screens; a rep needs urgency, the next lead and one-step logging in a single place. To validate: measure clicks from call end to next call, and whether outcome, note and next date save in one step.
- **Why it matters:** repeated hundreds of times a day per rep, so small friction costs hours; missed follow-ups waste ad spend; logged outcomes feed the Offline-CAPI quality signals that LeadZam sells.
- **Recommendation:** one queue sorted by urgency, one-step outcome logging, "Save & Next". **This is the redesign I built.**

## 2. Onboarding has no visible next step (High)
- **Where:** "Let's set up your workspace" after sign-up.
- **Screenshot:** `04-onboarding.png`
- **User goal:** finish setup quickly and reach the product.
- **Problem:** two groups of pill options are shown, but the screen shows no Continue/Skip button, no step indicator, and no selected state is visible. A first-time user cannot tell from the screen whether choosing an option advances the page, whether answers are required, or how long this takes. The header is also empty (no logo or progress).
- **Why it matters:** this is the first screen of a 14-day trial; if people stall here, activation drops before they see any value.
- **Recommendation:** show a clear selected state, a primary "Continue" button (disabled until both questions are answered) and a "Skip for now" link, plus "Step 1 of 2".

## 3. First dashboard is empty states without guidance (Medium)
- **Where:** Admin Dashboard on first login.
- **Screenshots:** `05-dashboard-setup-checklist.png`, `06-dashboard-empty-states.png`
- **User goal:** understand what to do next and see their first lead.
- **Problems:**
  1. The setup checklist (6 rows) takes the whole first screen, pushing the actual dashboard below the fold; there is a second "Finish setup" button in the top bar that points to the same thing.
  2. "Leads over time" draws an empty grid (axis 0–4, May–Oct) with no message such as "No leads yet" and no action; "Top forms" is a blank area.
  3. Some checklist steps describe browsing rather than outcomes ("See every setting once"), and the list order looks generic: check whether it reflects the goal chosen in onboarding.
- **Why it matters:** empty states are the main teaching moment of a trial; a blank chart reads as "broken".
- **Recommendation:** replace empty charts with an empty state and one action (Add lead, Import CSV, Connect Meta), make the checklist collapsible after the first view, use outcome wording for steps, and reorder them by the onboarding answer.

## 4. Site: jargon and no product UI (Medium)
- **Where:** home page hero and card 02 "Generate better-quality leads".
- **Screenshots:** `01-site-hero.png`, `02-site-features.png`
- **Problem:** the key differentiator is explained with "CAPI-integrated forms" and "Offline CAPI" without defining them, which only performance marketers recognise. The hero and feature cards use small diagrams rather than a real product screenshot, so sales managers and reps cannot see the daily screens they would use.
- **Why it matters:** the buyer is a marketer but adoption depends on sales reps; both need to understand the value quickly.
- **Recommendation:** lead card 02 with the outcome ("tell Meta and Google which leads turned into customers"), spell out "Conversions API" once, and add a real screenshot of the follow-up queue.

## 5. Small consistency gaps (Low)
- **Where:** `03-signup.png`, site nav and footer.
- **Observations:**
  - On the sign-up form, "Sign up with Google" is narrower than the email field and the "Send code" button above it.
  - The same trial action is named "Start Free Trial" (nav), "Start 14-Day Free Trial" (hero), "Create Free Account" (footer band) and "Sign up" (footer).
  - No terms/privacy consent line is visible on the sign-up form.
- **Recommendation:** align the widths, use one CTA label, add a short consent line. Low impact individually, so not prioritised.

---

## Why Finding 1 was chosen to build
Finding 2 is probably the quickest win but is a single screen with little interaction. Finding 1 is the repeated daily task of the highest-volume users and shows the most design thinking (states, keyboard speed, flow). I'd run Finding 2 as a quick A/B test.

## Real LeadZam vs my redesign (fit with the existing product)
The prototype follows my Figma mockups (Screens 1–3) one-to-one so design and code stay in sync (`docs/FIGMA_PARITY.md`). Differences from the live app that I would reconcile in production:

| Area | Real LeadZam app | My redesign | Production step |
|---|---|---|---|
| Nav | `Admin Dashboard, Forms, All Leads, Follow-ups, Calls, Reports…`, blue "Add Lead" button | Mockup nav: Dashboard, Follow-up Queue, All Leads, Campaigns, Call Logs, Settings | rename to the real labels, add the Add Lead button |
| Brand colour | LeadZam blue | Indigo from DESIGN.md (`--ind`) | swap one token |
| Typography | Geometric sans, uppercase micro-labels | Inter, same micro-label pattern | swap font token |
| Cards | White, 1px light border, icon chip + uppercase label | same pattern | consistent |
| Empty states | Blank chart grid (finding 3) | loading skeleton, empty filter, all-clear | reuse these patterns |

## Redesign vs the mockups (Screens 1–3)
| Mockup | Built in prototype |
|---|---|
| Screen 1: queue + detail pane | Header with Overdue / Due Today / Upcoming / Dialed goal, source tabs with dots, sort, three groups (4 / 9 / 5), Active Card, detail pane (immediate action, attribution, objective, touchpoints, rapid notes, tags) |
| Screen 2: call outcome dialog | Six outcomes with hotkeys, schedule presets + date/time/host, notes + tag chips, pipeline progression, Discard / Save & Close / Save & Next |
| Screen 3: all clear | Cleared hero, three next-action cards, completed activity log |
| Mobile | Single-column below 768px; the bottom-nav and Fast-Lane bar are not built |
