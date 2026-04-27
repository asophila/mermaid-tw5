# Phase 2: Reliability & Testing - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-26
**Phase:** 02-reliability-testing
**Areas discussed:** Error Display Format, Error Detail Level, Test Framework, Test Scope, Test Organization
**Mode:** auto (non-interactive — Claude selected recommended defaults)

---

## Error Display Format

| Option | Description | Selected |
|--------|-------------|----------|
| Plain text replacement | Keep current approach but with friendlier text | |
| Styled HTML error box | Use visual styling (border, background, padding) to signal failure | ✓ |
| Icon + message | Add a warning icon alongside text | |

**Auto-selected:** Styled HTML error box (recommended default)
**Rationale:** Raw exception text is a poor UX. A styled container makes errors immediately recognizable and separates them from normal diagram output. The `<details>` element provides collapsibility without JavaScript.

---

## Error Detail Level

| Option | Description | Selected |
|--------|-------------|----------|
| Friendly message only | Hide all technical details from users | |
| Friendly + technical always visible | Show everything at once | |
| Friendly with expandable technical details | Default to friendly message; user can expand for raw error | ✓ |

**Auto-selected:** Friendly with expandable technical details (recommended default)
**Rationale:** Users need actionable info; developers need stack traces. `<details>`/`<summary>` satisfies both without clutter.

---

## Test Framework

| Option | Description | Selected |
|--------|-------------|----------|
| TiddlyWiki built-in test runner | Use TW's own browser-based test framework | |
| Node.js built-in test runner | Use `node:test` + `node:assert` with mocked TW globals | ✓ |
| Browser automation (Playwright) | Full browser tests for rendering accuracy | |

**Auto-selected:** Node.js built-in test runner (recommended default)
**Rationale:** No external dependencies required, CI-friendly, headless by default. TW built-in runner is browser-based and harder to automate in CI without a full TW environment. Playwright is overkill for this phase's scope.

---

## Test Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Smoke tests only | Verify modules load without errors | |
| Integration tests (required) | Test widget rendering and parser behavior as specified in QUAL-02 | ✓ |
| Unit + integration | Also test individual rocklib functions | |

**Auto-selected:** Integration tests plus smoke tests (recommended default)
**Rationale:** Requirements explicitly call for widget rendering and parser behavior coverage. Smoke tests ensure the plugin loads. Unit tests for rocklib are nice-to-have but not required.

---

## Test Organization

| Option | Description | Selected |
|--------|-------------|----------|
| Co-located with source | Test files next to plugin files | |
| Separate `tests/` directory | Centralized test directory at project root | ✓ |

**Auto-selected:** Separate `tests/` directory (recommended default)
**Rationale:** Keeps plugin bundle clean. TiddlyWiki's plugin system includes all files in `plugins/mermaid-tw5/` — co-locating tests would bloat the plugin.

---

## Claude's Discretion

- Exact CSS styling of error boxes
- Exact wording of user-friendly error messages
- Exact structure of mock TW bootstrap
- Additional edge-case tests beyond required scope

## Deferred Ideas

- Visual regression testing — future phase/backlog
- Browser compatibility matrix testing — Phase 5 CI enhancement
- Performance benchmarks — out of scope
- Accessibility testing for error messages — v2 (ENH-02)
- Test coverage reporting (Istanbul/nyc) — requires npm; out of scope
