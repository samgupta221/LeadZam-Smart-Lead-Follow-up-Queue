# LeadZam – Follow-up Queue (UI/UX & Frontend assignment)

A focused redesign of the telecaller follow-up loop: **pick next lead → call → log outcome → next lead**.
React 18 · TypeScript · Vite · plain CSS (DESIGN.md tokens) · Vitest.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm test         # unit tests (SLA formatting, validation)
```

## Deliverables
| | |
|---|---|
| Audit | [`docs/AUDIT.md`](docs/AUDIT.md) (screenshots in `docs/screenshots/`) |
| Figma | `<paste Figma link>` (build guide: [`docs/FIGMA_SPEC.md`](docs/FIGMA_SPEC.md)) |
| Walkthrough video | `<paste link>` (script: [`docs/VIDEO_SCRIPT.md`](docs/VIDEO_SCRIPT.md)) |

## What the prototype does
- Queue grouped **Overdue / Scheduled today / Upcoming / Completed**, sorted by urgency; source tabs with live counts; text filter.
- **SLA chip**: green, amber (<15 min), pulsing red (overdue).
- **Call-outcome dialog**: keys `1–6`, schedule presets + note required only where they matter, `Shift+Enter` = Save & Next, `Esc` closes.
- **States**: loading skeleton, empty filter, all-caught-up, validation errors.
- **Responsive**: detail pane stacks <1024px, sidebar → top bar <768px.
- **A11y**: dialog semantics + autofocus, radiogroup outcomes, `aria-pressed` filters, progressbar, `role=alert` errors, reduced-motion, visible focus.
- Non-queue nav items are intentional non-functional placeholders (out of scope).

## Code map
`App.tsx` (queue, filters, state) · `DispositionDialog.tsx` · `SlaChip.tsx` · `validate.ts` (pure, tested) · `data.ts` (mock data) · `styles.css` (tokens).

## Reasoning
**Biggest UX problem.** The daily follow-up/call-logging loop: it's the highest-frequency task and produces the outcome data LeadZam's quality feedback depends on (see audit #1).
**Why this one.** High impact, repeated hundreds of times a day per rep, and buildable end-to-end in the time box. First-run onboarding (#2) needs funnel data I don't have.
**Not redesigned.** Dashboard, campaigns, call analytics, settings, WhatsApp inbox, marketing site.
**Trade-offs.** Keyboard-first speed over discoverability (mitigated with visible `<kbd>` hints); one dialog instead of inline logging (simpler, but modal); mock data and no persistence; plain CSS instead of a design-system library to keep it explainable.
**How it improves the task.** One list ordered by urgency, one step to log, required fields only when needed, and the next lead is selected automatically.
**Validate before shipping.** Measure time-per-call-cycle and clicks from call end to next call; test whether reps use hotkeys; check that required notes don't cause skipped logs; verify overdue ordering with real SLA rules; screen-reader pass; test with 5 telecallers.
**With 2 more hours.** Touchpoint history + rapid-notes in the detail pane, mobile Fast-Lane auto-dial bar, undo toast after save, Playwright test of the full flow, deployed preview.

## Analytics I'd track
`queue_viewed`, `call_started`, `outcome_logged{outcome, seconds_since_call_end, via_hotkey}`, `save_and_next_used`, `validation_error{field}`, `queue_cleared`.

## AI usage notes
- **Tools:** Claude (chat) for audit structuring, component code, tests and docs.
- **How it helped:** drafting React/TS components from my mockups and DESIGN.md, writing the validation tests, outlining the audit.
- **A suggestion I changed:** the first version showed the detail pane for a lead hidden by the active filter (found while testing, selecting "Website" still showed another lead). I changed selection to come from the *visible* list. I also replaced underlined `<a href="#">` nav items, which looked clickable but did nothing, with non-interactive placeholders.
- **What I verified myself:** `<edit: tick only what you actually did>` ran build + tests; clicked every filter; keyboard-only run of the dialog; resized to mobile; compared SLA colours with DESIGN.md; confirmed audit items against my own trial workspace.

## Assumptions & limitations
Mock data only; no telephony/persistence; "now" is fixed at load; in-app audit items rely on my trial workspace; Figma file is separate.
