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
| [PR Preview](.github/workflows/preview.yml) | Pull requests | Tests, uploads UI artifact, comments how to preview locally |
| [CD](.github/workflows/deploy.yml) | Push to `main` | Optional Pages deploy if `ENABLE_GITHUB_PAGES=true` |

### GitHub Pages blocked by your organization?

If Settings → Pages shows *"Pages on this repository are disabled. Please contact your organization administrators"*, that is an **org policy**. Making the repo public does not override it. You cannot enable Pages yourself.

**Ask an org admin** to allow GitHub Pages for the organization (Organization settings → Policies / Member privileges → Pages).

Until then, preview the UI locally or from the PR artifact (see below).

### See the UI on a pull request

```bash
gh pr checkout <PR_NUMBER>
npm install
npx --yes serve .
```

Or download artifact `pr-<number>-ui` from the **PR Preview** workflow run on the Actions tab.

The PR bot comment repeats these steps after checks pass.

### Hosted URLs (after org enables Pages)

1. Org admin enables Pages for the organization
2. Set repository variable **`ENABLE_GITHUB_PAGES=true`** (Settings → Secrets and variables → Actions → Variables)
3. **Settings → Pages → Deploy from branch → `gh-pages` / root**
4. **Settings → Actions → Read and write permissions**

Then PR previews can use `gh-pages` deploy workflows and production will be at `https://<org>.github.io/<repo>/`.
