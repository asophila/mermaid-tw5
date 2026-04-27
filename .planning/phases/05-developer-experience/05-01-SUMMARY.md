---
phase: 05-developer-experience
plan: 01
status: complete
commit: 8ec3ba4
---

# Plan 05-01: GitHub Actions CI/CD Workflows

## What Changed

- Created `.github/workflows/test.yml` — runs `node --test` on all pushes and PRs to `main`
- Created `.github/workflows/deploy.yml` — builds TiddlyWiki demo and deploys to GitHub Pages on push to `main`

## Decisions Applied

- Two separate workflow files for clean separation of concerns (D-01)
- Node.js 20 LTS in both workflows (D-04)
- Tests run via `node --test` with no npm dependencies (D-06)
- Deploy installs `tiddlywiki` globally via npm, builds demo, copies to `docs/index.html`, commits back with `[skip ci]` (D-08 through D-11)
- Deploy depends on test job succeeding (D-12)

## Verification

- Workflow files are valid YAML
- `node --test` passes locally (13/13 tests)

## Notes

- The deploy workflow requires `contents: write` permission for the `GITHUB_TOKEN`
- GitHub Pages source must be configured to serve from the `docs/` folder on the `main` branch
