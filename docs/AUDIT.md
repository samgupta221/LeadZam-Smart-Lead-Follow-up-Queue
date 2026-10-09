# LeadZam UI/UX Audit

**What I reviewed:** leadzam.com (hero, features, integrations, founder), the sign-up screen, the post-sign-up onboarding screen, and the Admin Dashboard of my own trial workspace (dummy data, empty workspace). Screenshots are in `docs/screenshots/`.
**Limitation:** my workspace had 0 leads, so I could not capture a populated Follow-ups or Calls screen. Finding 1 is therefore backed by indirect evidence (see its "Evidence" line) and is marked for confirmation.

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
- **Problem to confirm with a populated workspace:** how many clicks from "call ended" to "next call started", whether overdue leads look different from upcoming ones, and whether the outcome, note and next date can be saved in one step.
- **Why it matters:** repeated hundreds of times a day per rep, so small friction costs hours; missed follow-ups waste ad spend; logged outcomes feed the Offline-CAPI quality signals that LeadZam sells.
- **Recommendation:** one queue sorted by urgency, one-step outcome logging, "Save & Next". **This is the redesign I built.**

## 2. Onboarding has no visible next step (High)
- **Where:** "Let's set up your workspace" after sign-up.
- **Screenshot:** `04-onboarding.png`
- **User goal:** finish setup quickly and reach the product.
- **Problem:** two groups of pill options are shown, but the screen shows no Continue/Skip button, no step indicator, and no selected state is visible. A first-time user cannot tell whether choosing an option advances the page, whether answers are required, or how long this takes. The header is also empty (no logo).
- **Why it matters:** this is the first screen of a 14-day trial; if people stall here, activation drops before they see any value.
- **Recommendation:** show a clear selected state, a primary "Continue" button (disabled until both questions are answered) and a "Skip for now" link, plus "Step 1 of 2".
- *Confirm:* what happens after you tap an option (auto-advance or nothing)? If it auto-advances, the issue becomes missing feedback instead of a missing button.

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
| Area | Real LeadZam app | My prototype | Action |
|---|---|---|---|
| Nav | `Follow-ups` item under WORKSPACE, blue "Add Lead" button, SETTINGS / OTHER groups | Prototype sidebar now mirrors the real item names and uses "Follow-ups" | done |
| Brand colour | LeadZam blue | Indigo from DESIGN.md (`--ind` in `styles.css`) | swap `--ind` / `--ind-h` to the sampled brand blue (one variable) |
| Cards | White cards, 1px light border, rounded, icon chip + uppercase label | same pattern | consistent |
| Typography | Geometric sans (looks like DM Sans); uppercase micro-labels | Inter | switch font token to match |
| Empty states | Blank chart grid | all-clear, empty filter and loading skeleton | pattern worth adopting in the dashboard |
| Breadcrumb header | Home › page, trial chip, bell | not built | out of scope |
