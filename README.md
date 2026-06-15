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

1. Run `npm run ci` and confirm all checks pass.
2. Smoke-check the UI in a browser (filter, gantt, task detail sheet).
3. Update `CHANGELOG.md` if you change behavior.

## CI/CD

GitHub Actions runs on every push and pull request to `main`:

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| [CI](.github/workflows/ci.yml) | PR + push to `main` | `npm test`, syntax check, entrypoint verification |
| [PR Preview](.github/workflows/preview.yml) | Pull requests | Tests, deploys preview, comments URL on the PR |
| [CD](.github/workflows/deploy.yml) | Push to `main` | Tests, deploys production site to `gh-pages` |

### See the UI on a pull request

**Online preview (recommended)**

1. One-time repo setup (maintainer):
   - **Settings → Pages → Build and deployment → Source:** `Deploy from a branch`
   - **Branch:** `gh-pages` / `/ (root)`
   - **Settings → Actions → General → Workflow permissions:** `Read and write permissions`
2. Open the PR. After checks pass, a bot comment appears with a link like:
   `https://<org>.github.io/<repo>/pr-preview/pr-<number>/`
3. Click that link to use the TaskBoard UI for that branch.

**Local preview**

```bash
gh pr checkout <PR_NUMBER>
npm install
npx --yes serve .
```

Then open `http://localhost:3000` (or the port `serve` prints).

### Production URL (after merge to `main`)

`https://<org>.github.io/<repo>/`

For this repo: `https://summon-rnd.github.io/task-manager/` once Pages is enabled.
