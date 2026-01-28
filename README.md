# Rami Score – تونسي

تطبيق ويب بسيط و Offline لحساب ومتابعة **سكورات لعبة الرامي التونسي**.

**تنبيه قانوني (مهم):** التطبيق هذا لحساب النقاط فقط وما فيه حتى علاقة بالقمار ولا بالفلوس.

## Features (MVP)

- Home: New Game, Game History
- New Game: 2–6 players, player names, Tunisian Rami (default)
- Scoreboard:
  - Totals auto-calculated
  - **Only zero or positive round scores allowed** (negative values blocked)
  - Live ranking (lowest score = best)
  - Game auto-stops when any player reaches **1000 points** (max total)
  - End Game (manual stop also possible, saves locally)
- End Game Summary: final ranking + winner name (lowest total)
- History:
  - List saved games
  - View game details
  - Delete a game or clear all history
- Dark mode toggle
- LocalStorage only (no backend)
- Works offline after first load (service worker)

## Tech stack

- React (Vite)
- JavaScript (no TypeScript)
- LocalStorage only

## Run locally

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL.

## Notes

- Data is saved **only in your browser** on this device (LocalStorage).
- This app contains **no money, no betting, no rewards, no payments** — it is strictly a score calculator/tracker.

