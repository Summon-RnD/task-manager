# Task Management Tool

TaskBoard prototype: a single-page task planner with gantt timeline, balance-scale dashboard, voice capture, and transcript extraction.

AI-perc:47%

## Run locally

Open `index.html` in a browser, or serve the repo root:

```bash
npx --yes serve .
```

## Development

Install dependencies and run tests:

```bash
npm install
npm test
```

Watch mode:

```bash
npm run test:watch
```

## Project layout

| Path | Purpose |
|------|---------|
| `index.html` | UI markup and styles |
| `src/app/main.js` | Application logic (DOM, rendering, interactions) |
| `src/data/constants.js` | Team roster, clients, sizes, colors |
| `src/lib/` | Testable pure functions (domain, tree, dates, capture) |
| `tests/` | Vitest unit tests |

## Before opening a PR

1. Run `npm test` and confirm all tests pass.
2. Smoke-check the UI in a browser (filter, gantt, task detail sheet).
3. Update `CHANGELOG.md` if you change behavior.
