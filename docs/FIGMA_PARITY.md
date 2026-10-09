# Figma ↔ code parity
Code is built from the three mockups, so Figma frames need no redesign: just rebuild them as components.

| Figma frame | App state to reproduce it |
|---|---|
| Desktop queue (Screen 1) | Open the app, wait for the skeleton, default state |
| Selected card | Click any row (indigo outline + "Active Card") |
| Call outcome dialog (Screen 2) | Click **Call now**, press `1` |
| Dialog validation error | In the dialog press `1`, then Save & Close |
| Loading | Reload and capture the first 0.7s |
| Filtered / empty | Pick a source, or type a name that doesn't exist |
| All caught up (Screen 3) | Click **Demo: clear queue** |
| Mobile | Browser width below 768px |

Counts match the mockups: 18 leads (4 overdue, 9 today, 5 upcoming); Meta 6, Google 5, WhatsApp 4, Website 3; dialed goal starts at 14/32.
