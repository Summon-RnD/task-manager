# Changelog

## Testing infrastructure (2026-06-15)

### Added
- Extracted pure logic into `src/data/constants.js` and `src/lib/*` modules (domain, tree, dates, capture).
- Moved the app script to `src/app/main.js` and wired `index.html` as an ES module entry point.
- Vitest unit tests under `tests/` for domain inference, task tree math, gantt dates, and capture parsing.
- `package.json` with `npm test` / `npm run test:watch`.
- GitHub Actions workflow (`.github/workflows/ci.yml`) to run tests on push and PR.
- GitHub Actions CD workflow (`.github/workflows/deploy.yml`) to deploy the static app to GitHub Pages after tests pass on `main`.

### PR previews (2026-06-15)

### Changed
- Private repo: PR preview now uploads a UI artifact and comments with local `serve` steps (no public Pages URL).
- CD deploy is opt-in via repo variable `ENABLE_GITHUB_PAGES=true` (Team/Enterprise only).

### Reasoning
- GitHub Pages is not available for free private repositories, so gh-pages deploy links would not work for reviewers.

- The prototype was a single 1700+ line inline script with no automated checks.
- Pulling testable logic into modules gives a stable base for refactors and new features without changing UI behavior.
- ES modules keep the zero-build-step workflow (open `index.html` or serve statically) while enabling Node-based unit tests.
