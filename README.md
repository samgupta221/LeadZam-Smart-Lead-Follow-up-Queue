# LeadZam – Smart Lead Follow-up Queue

LeadZam is a modern lead management and follow-up dashboard designed to help sales representatives prioritize leads, manage callbacks, track overdue follow-ups, and record call outcomes efficiently.

The application provides a centralized follow-up queue with urgency indicators, lead filtering, quick calling actions, and a detailed lead information panel.

## Figma Design

Explore the original UI/UX design and project prototype in Figma.

**[View LeadZam Design on Figma](https://www.figma.com/design/fwt5tZ9XkTZtNqLcpIePIS/LeadZam?node-id=0-1&t=7ImmZCaZ38VVdO3q-1)**

## Project Preview

LeadZam features a clean, professional dashboard with a sidebar, follow-up queue, and lead details panel.

### Main Dashboard Sections

- **Dashboard:** Overview of lead management activities.
- **Follow-up Queue:** Prioritized list of overdue, scheduled, and upcoming follow-ups.
- **All Leads:** Navigation for lead management.
- **Campaigns:** Navigation for campaign management.
- **Call Logs:** Navigation for call history.
- **Settings:** Navigation for application settings.

## Features

- **Smart Follow-up Queue:** Organizes leads into overdue, scheduled today, and upcoming groups.
- **Priority-based Sorting:** Helps sales representatives focus on urgent follow-ups first.
- **Lead Source Filters:** Filter leads by Meta Ads, Google Ads, WhatsApp, and Website.
- **Search Functionality:** Find leads using their name or phone number.
- **SLA Indicators:** Color-coded status chips highlight overdue and upcoming follow-ups.
- **Quick Dialer Interface:** Provides convenient calling actions and a simulated power dialer workflow.
- **Lead Details Panel:** Displays contact information, company details, campaign attribution, and lead intent.
- **Call Notes:** Record quick notes and objections during follow-up activities.
- **Touchpoint History:** View previous interactions and follow-up context.
- **Lead Tags:** Display and manage contextual lead tags in the interface.
- **Call Outcome Dialog:** Record call dispositions and schedule follow-ups.
- **Save and Next Workflow:** Move efficiently to the next lead after logging an outcome.
- **Loading and Empty States:** Provides feedback for loading, validation errors, and an empty queue.
- **Responsive Design:** Adapts the interface for different screen sizes.
- **Accessibility:** Supports keyboard navigation, visible focus states, and reduced-motion preferences.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Building interactive UI components |
| TypeScript | Type safety and maintainable code |
| Vite | Development server and build tooling |
| CSS3 | Styling and responsive layouts |
| Vitest | Unit and component testing |
| React Testing Library | Testing UI behavior |
| jsdom | Simulated browser environment for tests |

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Visual Studio Code or another code editor

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd leadzam-queue
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal. Vite typically runs the application at:

http://localhost:5173

### 4. Build for Production

```bash
npm run build
```

This command checks the project and creates a production build in the `dist` directory.

### 5. Run Tests

```bash
npm test
```

The test suite uses Vitest and React Testing Library to verify application logic and UI behavior.

### 6. Preview the Production Build

```bash
npm run preview
```

## Available Commands

| Command | Description |
|---|---|
| `npm install` | Installs project dependencies |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm test` | Runs the test suite |
| `npm run preview` | Previews the production build |

## How to Use the Application

1. Open the LeadZam dashboard.
2. Review overdue follow-ups at the top of the queue.
3. Select a lead to view its details in the side panel.
4. Search for a lead or filter by campaign source.
5. Use the available calling actions to initiate the follow-up workflow.
6. Review previous interactions and the current follow-up objective.
7. Record call notes and select the appropriate call outcome.
8. Schedule another follow-up when required.
9. Save the outcome and proceed to the next lead.

**Note:** Calling, email, and WhatsApp actions may be simulated in the current prototype. Actual functionality depends on the integrations implemented in the project.

## Project Structure

```text
leadzam-queue/
├── src/
│   ├── App.tsx
│   ├── AllClear.tsx
│   ├── DispositionDialog.tsx
│   ├── SlaChip.tsx
│   ├── data.ts
│   ├── validate.ts
│   ├── logic.test.ts
│   ├── App.test.tsx
│   ├── styles.css
│   └── main.tsx
├── docs/
│   ├── AUDIT.md
│   ├── FIGMA_SPEC.md
│   ├── FIGMA_PARITY.md
│   └── VIDEO_SCRIPT.md
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

*Note: This is an illustrative structure. Keep only the directories and files that actually exist in your repository.*

## Core Components

### App.tsx
Manages the main dashboard, queue state, lead selection, filtering, and follow-up workflow.

### DispositionDialog.tsx
Provides the call-outcome dialog, outcome selection, and follow-up scheduling workflow.

### SlaChip.tsx
Displays visual indicators for overdue and upcoming follow-ups.

### AllClear.tsx
Displays the completed or all-caught-up state when there are no remaining actionable leads.

### data.ts
Contains the sample lead records used to demonstrate the dashboard.

### validate.ts
Contains reusable validation logic for user inputs and call outcomes.

### styles.css
Defines the visual design, colors, spacing, cards, status indicators, and responsive layouts.

## User Experience and Design

LeadZam is designed around a simple sales workflow:

**Prioritize → Contact → Record Outcome → Follow Up**

The interface emphasizes urgent tasks, reduces unnecessary navigation, and keeps important lead information visible while representatives work through their queue.

### Design Highlights

- Clear visual hierarchy and typography.
- Distinct colors for overdue and scheduled follow-ups.
- Consistent cards, buttons, and status indicators.
- Contextual lead details panel.
- Keyboard-friendly call logging.
- Responsive layouts for different screen sizes.
- UI/UX design reference available in Figma.

## Testing

The project includes tests for application logic and user interface behavior.

Run the test suite:

```bash
npm test
```

Testing can cover validation rules, SLA-related logic, filtering, and queue interactions. Run the suite locally to verify the actual test results before publishing the project.

## Current Limitations

- Lead records may use mock data.
- Persistent database storage is not included unless separately implemented.
- Real phone dialing and telephony integration may not be available.
- WhatsApp and email integrations may not be connected.
- SLA calculations and displayed times may use prototype assumptions.
- Some sidebar sections may be navigation placeholders.
- Authentication and multi-user access control are not included unless implemented separately.


This project demonstrates practical experience with:

- React component architecture.
- TypeScript and reusable UI logic.
- State management and interactive filtering.
- Responsive frontend development.
- Accessibility and keyboard interactions.
- Unit and component testing.
- UI/UX design implementation.
- Sales workflow optimization.

## Design and Resources

- **Figma Design:** [LeadZam – UI/UX Design](https://www.figma.com/design/fwt5tZ9XkTZtNqLcpIePIS/LeadZam?node-id=0-1&t=7ImmZCaZ38VVdO3q-1)
- GitHub Repository:https://github.com/samgupta221/LeadZam-Smart-Lead-Follow-up-Queue

