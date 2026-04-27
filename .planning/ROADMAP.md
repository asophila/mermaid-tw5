# Roadmap: mermaid-tw5

**Created:** 2026-04-26
**Granularity:** Standard
**Mode:** YOLO

## Overview

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Cleanup & Polish | Remove technical debt and establish code quality baseline | CLEAN-01, CLEAN-02, STYLE-01 | 3 |
| 2 | Reliability & Testing | Improve user-facing reliability and add automated tests | QUAL-01, QUAL-02 | 2 |
| 3 | Performance Optimization | Reduce initial load impact of bundled libraries | PERF-01 | 2 |
| 4 | Dependency Modernization | Evaluate and adopt modern Mermaid.js within size constraints | UPDT-01 | 2 |
| 5 | Developer Experience | Automate builds and improve project documentation | AUTO-01, DOCS-02 | 2 |

---

## Phase 1: Cleanup & Polish

**Goal:** Remove accumulated technical debt and establish consistent code style.

**Requirements:** CLEAN-01, CLEAN-02, STYLE-01

**Success Criteria:**
1. No `console.log` statements remain in `wrapper.js` zoom logic
2. Commented-out Node.js/browser detection block is removed
3. JavaScript style is consistent across all plugin source files (var/let, indentation, quotes)
4. All existing examples continue to render correctly after cleanup

**UI hint:** no

---

## Phase 2: Reliability & Testing

**Goal:** Improve error handling and establish automated testing.

**Requirements:** QUAL-01, QUAL-02

**Success Criteria:**
1. Rendering errors display user-friendly messages instead of raw exception text
2. Test suite runs automatically and covers widget rendering path
3. Test suite covers typed parser behavior
4. Tests can be run locally and in CI

**UI hint:** no

---

## Phase 3: Performance Optimization

**Goal:** Reduce the performance impact of loading mermaid.js and D3.js on pages without diagrams.

**Requirements:** PERF-01

**Success Criteria:**
1. Lazy loading mechanism is implemented and functional
2. Pages without mermaid content do not load mermaid.min.js or d3.v6.min.js
3. Pages with mermaid content load libraries on demand with no visible delay
4. Bundle size analysis documents before/after impact

**UI hint:** no

---

## Phase 4: Dependency Modernization

**Goal:** Evaluate and adopt a modern Mermaid.js version while controlling bundle size.

**Requirements:** UPDT-01

**Success Criteria:**
1. Modern Mermaid.js versions (10.x+) are evaluated for size and compatibility
2. Lite build or modular import strategy is investigated
3. Decision is documented in PROJECT.md Key Decisions
4. If adopted, all existing diagram examples render correctly
5. If deferred, rationale is documented with upstream tracking reference

**UI hint:** no

---

## Phase 5: Developer Experience

**Goal:** Automate build verification and improve project documentation for contributors.

**Requirements:** AUTO-01, DOCS-02

**Success Criteria:**
1. GitHub Actions workflow runs tests on push/PR
2. GitHub Actions workflow builds and deploys demo to GitHub Pages
3. Developer setup instructions are added to README or CONTRIBUTING.md
4. Contribution guidelines specify coding standards and PR process

**UI hint:** no

---

## Milestone Definition

**Milestone 1 (v0.4.0):** Phases 1–3
- Focus: Code quality, reliability, performance
- Deliverable: Cleaner, tested, faster plugin

**Milestone 2 (v0.5.0):** Phases 4–5
- Focus: Modernization and automation
- Deliverable: Up-to-date dependencies and automated workflows

---

*Roadmap created: 2026-04-26*
*Last updated: 2026-04-26 after initialization*
