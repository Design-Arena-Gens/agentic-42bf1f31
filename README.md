# SmartTeammates by Skyline

SmartTeammates is a tactical control console for configuring Skyline&apos;s autonomous squadmate mod. Tune damage multipliers, adjust movement speed profiles, and observe the AI&apos;s combat reasoning in real time.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the console.

### Production Build

```bash
npm run build
npm start
```

## Features

- Damage multiplier control ranging from 1x to 5x.
- Movement speed presets: Standard, Fast, Very Fast.
- Advanced AI planner simulating target priority, cover usage, ability orchestration, and command compliance.
- Animated telemetry dashboard visualizing tactical decisions per combat tick.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Zustand state management
- Framer Motion for motion design

## Project Structure

```
app/                Next.js routes and layout
components/         UI components and panels
lib/                AI logic, state store, and scenario synthesis
```

## Deployment

The project is optimized for Vercel deployment. Build the project and deploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-42bf1f31
```
