# Phase 5: Developer Experience - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-27
**Phase:** 05-developer-experience
**Areas discussed:** CI Workflow Architecture, Node.js Version, Test Execution, GitHub Pages Deployment, Developer Documentation, Contribution Guidelines, README Updates

---

## CI Workflow Architecture

| Option | Description | Selected |
|--------|-------------|----------|
| Two separate workflows (test.yml + deploy.yml) | Clean separation; tests run everywhere, deploy only on main | ✓ |
| Single workflow with conditional jobs | Simpler file count but harder to read and maintain | |

**Selection:** Two separate workflow files.
**Rationale:** Separation of concerns. The test workflow is lightweight and runs on all branches/PRs. The deploy workflow is heavier (needs npm + tiddlywiki build) and only runs on main.

---

## Node.js Version in CI

| Option | Description | Selected |
|--------|-------------|----------|
| Node 20 LTS | Current LTS, stable, `node --test` fully supported | ✓ |
| Node 18 | Older LTS, still supported but shorter timeline | |
| Multi-version matrix (18, 20, 22) | Broader compatibility but slower and overkill | |

**Selection:** Node 20 LTS, single version.
**Rationale:** The project has no Node-version-specific dependencies. A single version keeps CI fast and simple.

---

## GitHub Pages Deployment

| Option | Description | Selected |
|--------|-------------|----------|
| Build in CI, commit back to main | Uses existing `docs/` folder Pages source; straightforward | ✓ |
| Build in CI, upload artifact to Pages via actions/deploy-pages | Modern approach but requires changing Pages source config | |
| Manual build + commit by maintainer | No automation; defeats the purpose of this phase | |

**Selection:** Build in CI, commit back to main.
**Rationale:** The repository is already configured to serve GitHub Pages from the `docs/` folder on the `main` branch. Rebuilding `docs/index.html` in CI and committing back preserves this setup with minimal configuration changes.

---

## Developer Documentation Location

| Option | Description | Selected |
|--------|-------------|----------|
| README.md "Development" section + CONTRIBUTING.md | README gets quick-start; CONTRIBUTING gets full guidelines | ✓ |
| README.md only | Simpler but mixes user and developer docs | |
| CONTRIBUTING.md only | Clean separation but README lacks dev context | |

**Selection:** README.md gets a "Development" section; CONTRIBUTING.md is created for full guidelines.
**Rationale:** README is the first thing contributors see; a brief dev section there is helpful. CONTRIBUTING.md is the standard open-source location for detailed contribution rules.

---

## Claude's Discretion

- Exact YAML action version pins
- Exact wording of commit messages and CI step names
- Specific git config values for CI bot commits
- Whether to add a PR template

---

## Deferred Ideas

- Automated version bumping on release
- Code coverage reporting
- Multi-Node test matrix
- ESLint/Prettier linting workflow
- Browser E2E testing
- Dependabot for vendored dependencies

---
