# Changelog

## Testing infrastructure (2026-06-15)

### Added
- Extracted pure logic into `src/data/constants.js` and `src/lib/*` modules (domain, tree, dates, capture).
- Moved the app script to `src/app/main.js` and wired `index.html` as an ES module entry point.
- Vitest unit tests under `tests/` for domain inference, task tree math, gantt dates, and capture parsing.
- `package.json` with `npm test` / `npm run test:watch`.
- GitHub Actions workflow (`.github/workflows/ci.yml`) to run tests on push and PR.

### Reasoning
- The prototype was a single 1700+ line inline script with no automated checks.
- Pulling testable logic into modules gives a stable base for refactors and new features without changing UI behavior.
- ES modules keep the zero-build-step workflow (open `index.html` or serve statically) while enabling Node-based unit tests.
