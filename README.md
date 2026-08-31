# ✈️ Seat Selector — Airplane Seat Selection Interface

A premium, fully responsive airline seat selection UI built with **React + TypeScript + Tailwind CSS**.

## Features

- 🖥️ **Desktop & Mobile** — distinct layouts for each breakpoint, not just a scaled-down version
- 💺 **Interactive seat map** — select / deselect seats, occupied seats blocked
- 🟣 **3 cabin sections** — Business ($480), Premium ($260), Economy ($120), each with their own seat grid
- 💰 **Live price calculation** — total updates automatically as you select seats
- 🏷️ **Seat chips** — selected seats shown as removable chips in the bottom bar
- 🌑 **Mobile bottom bar** — fixed dark bar with safe-area support for iPhone notch
- ♿ **Accessible** — `aria-label`, `aria-pressed`, `aria-disabled`, keyboard navigation, focus rings
- 📐 **Responsive** — tested from 320 px (iPhone SE) to 1440 px+

## Tech Stack

| Tool | Version |
|------|---------|
| React | 19 |
| TypeScript | 5.7 |
| Tailwind CSS | 3.4 |
| Vite | 6.4 |
| Lucide React | 0.474 |

## Getting Started

```bash
npm install
npm run dev       # dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

## Project Structure

```
src/
├── components/
│   ├── AircraftMap.tsx       # Fuselage visualisation with section highlights
│   ├── Header.tsx            # Desktop + mobile header variants
│   ├── MobileBottomBar.tsx   # Fixed dark confirmation bar (mobile)
│   ├── PriceSummary.tsx      # Desktop bottom bar with chips + total
│   ├── Seat.tsx              # Individual seat button
│   ├── SeatLegend.tsx        # Colour legend (mobile)
│   ├── SeatMap.tsx           # Full seat grid (desktop)
│   ├── SeatSelectionPage.tsx # Main page + state management
│   ├── SectionSelector.tsx   # Section pills (1 / 2 / 3)
│   ├── SelectedSeats.tsx     # Removable chip list
│   └── ThreeDRenderingCard.tsx # Dark promo card (desktop)
├── data/
│   └── seats.ts              # Section + seat data
└── types/
    └── index.ts              # TypeScript types
```

## Design Reference

Inspired by a premium airline booking dashboard — minimalist, dark accents, neon-lime action colour (`#c8ff00`), violet seat selection (`#6c47ff`).
