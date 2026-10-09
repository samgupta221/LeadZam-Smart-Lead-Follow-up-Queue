# Figma build guide (file: "LeadZam – Follow-up Queue redesign")
Use the four mockups you already have (desktop queue, dialog, all-clear, mobile) as reference frames, then rebuild as components.

**Pages:** `1 Audit` (screenshots + annotations) · `2 Components` · `3 Redesign`

**Variables / styles** (from DESIGN.md): Indigo `#4F46E5`, hover `#4338CA`, success `#10B981`, warning `#F59E0B`, danger `#EF4444`, sky `#0EA5E9`, bg `#F8FAFC`, border `#E2E8F0`, text `#0F172A`/`#64748B`. Font Inter; radii 4/6/8/pill; 8-pt grid.

**Components (with variants):** Button (primary/success/outline/destructive × default/hover/disabled) · Status pill (ok/warn/urgent/source) · SLA chip (>15m / <15m / overdue) · Lead row (default/selected/overdue/done) · Outcome tile (default/selected) · Dialog · Skeleton row.

**Frames (Redesign page):**
1. Desktop 1440 – default queue + detail pane
2. Desktop – Call outcome dialog (Meeting Booked selected)
3. Desktop – Dialog validation error
4. Desktop – Loading skeleton
5. Desktop – "All caught up"
6. Desktop – Empty filter result
7. Mobile 390 – queue
8. Mobile 390 – dialog

Add a Prototype flow: Row "Call now" → Dialog → Save & Next → next row selected. Share link as "anyone with the link can view".
