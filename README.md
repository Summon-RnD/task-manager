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

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| [CI](.github/workflows/ci.yml) | PR + push to `main` | `npm test`, syntax check, entrypoint verification |
| [PR Preview](.github/workflows/preview.yml) | Pull requests | Tests, uploads UI artifact, posts local preview steps on the PR |
| [CD](.github/workflows/deploy.yml) | Push to `main` | Optional: deploy to `gh-pages` if `ENABLE_GITHUB_PAGES=true` |

### See the UI on a pull request (private repo)

GitHub Pages does **not** work on free private repositories. Use local preview:

```bash
gh pr checkout <PR_NUMBER>
npm install
npx --yes serve .
```

Open the URL `serve` prints (usually `http://localhost:3000`).

Each PR also gets a **UI artifact** (`pr-<number>-ui`) on the PR Preview workflow run if you prefer to download the built files.

The PR bot comment repeats these steps after checks pass.

### Optional: hosted Pages (paid GitHub plan only)

If you have GitHub Team or Enterprise:

1. Set repository variable **`ENABLE_GITHUB_PAGES=true`** (Settings → Secrets and variables → Actions → Variables)
2. **Settings → Pages → Deploy from branch → `gh-pages` / root**
3. **Settings → Actions → Workflow permissions → Read and write**

Production URL would then be `https://<org>.github.io/<repo>/` (visibility follows your Pages access settings).
