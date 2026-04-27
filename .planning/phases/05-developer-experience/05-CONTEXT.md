# Phase 5: Developer Experience - Context

**Gathered:** 2026-04-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Automate build verification and improve project documentation for contributors. This phase delivers CI/CD pipelines (GitHub Actions) that run tests on every push/PR and deploy the demo to GitHub Pages, plus developer setup instructions and contribution guidelines.

**In scope:**
- GitHub Actions workflow for automated testing
- GitHub Actions workflow for GitHub Pages demo deployment
- Developer setup instructions (local development, running tests)
- Contribution guidelines (coding standards, PR process)

**Out of scope:**
- New plugin features or diagram types
- Changing the TiddlyWiki build system architecture
- npm/package.json for the plugin itself
- Code coverage reporting tools (require npm)
- Multi-browser testing matrices

</domain>

<decisions>
## Implementation Decisions

### CI Workflow Architecture
- **D-01:** Two separate workflow files: `.github/workflows/test.yml` and `.github/workflows/deploy.yml`. Separation keeps concerns clean — tests run everywhere, deploy only on main.
- **D-02:** `test.yml` triggers on `push` to any branch and `pull_request` to `main`. Runs `node --test` from project root.
- **D-03:** `deploy.yml` triggers on `push` to `main` only. It depends on tests passing (uses `needs: test` job dependency or runs tests inline before deploy).

### Node.js Version in CI
- **D-04:** Use Node.js 20 (LTS) in all workflows. `node --test` is stable from Node 18+; Node 20 is the current LTS with longer support.
- **D-05:** Single Node version matrix (not multi-version). The project has no Node-version-specific dependencies; simplicity outweighs matrix value.

### Test Execution in CI
- **D-06:** Run `node --test` directly. No npm install step needed for tests (tests use built-in `node:test` and `node:assert`).
- **D-07:** Test job should checkout code and run `node --test` with working directory at project root. Tests live in `tests/` and are automatically discovered.

### GitHub Pages Deployment
- **D-08:** Build the TiddlyWiki demo in CI using the global `tiddlywiki` npm package (`npm install -g tiddlywiki`). This is the ONLY npm usage in the project and is CI-only — the project itself remains npm-free.
- **D-09:** Build command: `tiddlywiki mermaid-tw5 --build index`. Output is `mermaid-tw5/output/index.html`.
- **D-10:** Copy built `mermaid-tw5/output/index.html` to `docs/index.html` and commit back to the `main` branch. GitHub Pages serves from `docs/` folder (existing configuration).
- **D-11:** Deploy workflow uses a git commit + push pattern with `GITHUB_TOKEN`. Commit message: `chore(docs): rebuild demo [skip ci]` to avoid recursive CI triggers.
- **D-12:** Only deploy if tests pass. The deploy job runs after the test job succeeds.

### Developer Documentation Location
- **D-13:** Add a "Development" section to `README.md` with: clone, run tests (`node --test`), build demo (`npm install -g tiddlywiki && tiddlywiki mermaid-tw5 --build index`), and project structure overview.
- **D-14:** Create `CONTRIBUTING.md` at project root with full contribution guidelines: coding standards, PR checklist, issue reporting, and code of conduct reference.

### Contribution Guidelines Content
- **D-15:** Coding standards reference `.planning/codebase/CONVENTIONS.md`: 4-space indentation, `var`/`let` consistency (prefer `let` for new code), single quotes, semicolons, no `console.log` in production code.
- **D-16:** PR checklist: tests pass (`node --test`), no new `console.log` statements, consistent code style, describe what changed and why.
- **D-17:** No build step required for plugin changes — the plugin is raw JavaScript. Only documentation/demo changes require TiddlyWiki rebuild.
- **D-18:** Branch naming: `feature/description` or `fix/description`. PRs target `main`.

### README Updates
- **D-19:** Keep existing README content (credits, installation, notes about bundle size). Append the new Development section before the Notes section.
- **D-20:** Add a "Contributing" link in README pointing to `CONTRIBUTING.md`.

### Claude's Discretion
- Exact YAML indentation and action version pins in workflow files
- Exact wording of commit messages and PR templates
- Specific git config user name/email for CI commits
- Whether to add a PR template (`.github/pull_request_template.md`)
- Exact structure and section ordering of CONTRIBUTING.md
- Whether to cache `npm install -g tiddlywiki` between CI runs

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Requirements
- `.planning/REQUIREMENTS.md` — AUTO-01 and DOCS-02 requirements
- `.planning/ROADMAP.md` — Phase 5 goal, success criteria, requirements mapping

### Codebase Intelligence
- `.planning/codebase/CONVENTIONS.md` — Coding style, naming, indentation, error handling conventions
- `.planning/codebase/STACK.md` — Technology stack, no-build-tools constraint, TiddlyWiki version
- `.planning/codebase/STRUCTURE.md` — Directory layout, key file locations
- `.planning/codebase/TESTING.md` — Current test approach, `node --test` infrastructure

### Plugin Source
- `mermaid-tw5/tiddlywiki.info` — Build targets (`index` renders to `index.html`)
- `mermaid-tw5/plugins/mermaid-tw5/plugin.info` — Plugin metadata

### Existing Documentation
- `README.md` — Current readme (to be extended)
- `docs/index.html` — Pre-built demo (to be rebuilt in CI)
- `.nojekyll` — GitHub Pages Jekyll bypass

### Prior Phase Context
- `.planning/phases/02-reliability-testing/02-CONTEXT.md` — Test infrastructure decisions (D-06 through D-08, `node --test`)
- `.planning/phases/03-performance-optimization/03-CONTEXT.md` — Lazy loading decisions that affect demo behavior
- `.planning/phases/04-dependency-modernization/04-CONTEXT.md` — Deferral decision and upstream tracking reference

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `tests/` directory with `wrapper.test.js`, `typed-parser.test.js`, `widget-tools.test.js` — existing test suite that CI will run
- `tests/helpers/tw-bootstrap.js` and `tests/helpers/dom-mock.js` — test infrastructure already in place
- `docs/index.html` — pre-built demo, target for CI rebuild and deploy
- `.nojekyll` — already exists for GitHub Pages

### Established Patterns
- No npm/package.json in the project — CI is the only place npm is used (for `tiddlywiki` CLI)
- `node --test` is the test runner — no external test dependencies
- TiddlyWiki build uses `tiddlywiki <edition> --build index` — standard TW CLI
- Git repository with `main` branch — no commit message conventions yet
- Plugin version is manual in `plugin.info` — no automated versioning

### Integration Points
- GitHub Actions workflows must be created in `.github/workflows/`
- CI tests must pass before deploy (job dependency)
- Deploy updates `docs/index.html` on `main` branch; GitHub Pages serves from `docs/` folder
- CONTRIBUTING.md and README.md changes are documentation-only, no code impact
- Phase 5 workflows will run tests created in Phase 2 and extended in Phase 3

</code_context>

<specifics>
## Specific Ideas

- Keep the project npm-free at the root level. Only CI uses npm to install the `tiddlywiki` CLI globally for demo builds.
- The README should remain user-focused; developer details go in a dedicated "Development" section or CONTRIBUTING.md.
- GitHub Pages is already configured to serve from `docs/` on `main` branch (`.nojekyll` confirms this).
- Use `actions/checkout@v4` and `actions/setup-node@v4` in workflows for stability.
- Committing back to main from CI requires `permissions: contents: write` and proper `GITHUB_TOKEN` usage.

</specifics>

<deferred>
## Deferred Ideas

- Automated version bumping in `plugin.info` on release — requires release workflow and tag parsing; belongs in release automation phase
- Code coverage reporting (Istanbul/nyc) — requires npm devDependencies; violates no-build-tools constraint
- Multi-Node-version test matrix — unnecessary complexity for this project
- Linting workflow (ESLint/Prettier) — requires npm devDependencies; violates constraint
- Browser-based E2E testing — would require Playwright/Cypress and npm; significant new infrastructure
- Automated dependency update scanning (Dependabot) — limited value since dependencies are vendored minified files

</deferred>

---

*Phase: 05-developer-experience*
*Context gathered: 2026-04-27*
