# Phase 2: Reliability & Testing - Context

**Gathered:** 2026-04-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Improve user-facing error handling for diagram rendering failures and establish an automated test suite covering widget rendering and typed parser behavior. No new capabilities — this phase hardens existing functionality.

</domain>

<decisions>
## Implementation Decisions

### Error Display Format
- **D-01:** Replace `divNode.innerText = ex` with a styled HTML error container. Use a `<div>` with inline styles: red left border (`border-left: 3px solid #ff4444`), light red background (`#fff0f0`), and padding (`8px 12px`).
- **D-02:** Display a user-friendly message first: "Mermaid diagram could not be rendered. The diagram syntax may contain an error."
- **D-03:** Include the original mermaid source code in a `<pre>` block below the error message so users can see what failed.

### Error Detail Level
- **D-04:** Show raw exception details in a collapsible section labeled "Technical details". Default state: collapsed. Use a `<details>`/`<summary>` HTML element for zero-JS expand/collapse.
- **D-05:** Technical details include: exception message, exception name, and a simplified stack trace (first 3 frames, file names only, no full system paths).

### Test Framework
- **D-06:** Use Node.js built-in `node:test` and `node:assert` modules (available since Node 18+). No external test dependencies.
- **D-07:** Create a minimal TiddlyWiki bootstrap script (`tests/helpers/tw-bootstrap.js`) that mocks `$tw` globals and TW's `require()` module system so plugin IIFE modules can load in Node.js.
- **D-08:** Tests run via `node --test` command. No npm scripts or `package.json` needed.

### Test Scope
- **D-09:** Smoke test: verify all three plugin modules load without errors (`wrapper.js`, `typed-parser.js`, `widget-tools.js`).
- **D-10:** Widget integration test: instantiate `MermaidWidget` with valid sample diagram source, verify `render()` produces a DOM element containing an SVG.
- **D-11:** Parser integration test: instantiate `MermaidParser` with sample mermaid text, verify output tree has correct structure (`type: 'mermaid'`, `tag: '$mermaid'`).
- **D-12:** Error handling test: pass invalid mermaid syntax to widget, verify error container is produced instead of throwing an uncaught exception.

### Test Organization
- **D-13:** Test files live in a new `tests/` directory at project root.
- **D-14:** One test file per plugin module: `tests/wrapper.test.js`, `tests/typed-parser.test.js`, `tests/widget-tools.test.js`.
- **D-15:** Shared test utilities (TW bootstrap mock, DOM mock) in `tests/helpers/tw-bootstrap.js` and `tests/helpers/dom-mock.js`.

### Claude's Discretion
- Exact CSS styling of error boxes (specific colors, padding values, font sizes)
- Exact wording of user-friendly error messages
- Exact structure of mock TW bootstrap (which globals to expose, how deeply to mock)
- Whether to test `rocklib` color utility functions (nice-to-have, not required)
- Additional edge-case tests beyond the required scope

</decisions>

<specifics>
## Specific Ideas

- Error display should be visually distinct from normal diagram output — users must immediately recognize something went wrong.
- Keep the test setup minimal. The project has no npm, no bundler, no transpiler — the test approach must honor that constraint.
- The `<details>` element for collapsible technical info is ideal because it requires no JavaScript and degrades gracefully.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Plugin Source
- `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_wrapper.js` — Widget rendering and current error handling (lines 82-84)
- `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_typed-parser.js` — MIME type parser implementation
- `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_widget-tools.js` — Rocklib utilities

### Codebase Intelligence
- `.planning/codebase/TESTING.md` — Current testing state, manual test approach, infrastructure gaps
- `.planning/codebase/CONCERNS.md` — Error handling weakness documentation (line 69-76), security trade-offs
- `.planning/codebase/ARCHITECTURE.md` — Component responsibilities, data flow, entry points
- `.planning/codebase/CONVENTIONS.md` — TiddlyWiki module pattern, error handling conventions, naming

### Project Requirements
- `.planning/REQUIREMENTS.md` — QUAL-01 and QUAL-02 requirements
- `.planning/ROADMAP.md` — Phase 2 goal, success criteria, requirements mapping

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `wrapper.js` error catch block (lines 82-84) — direct replacement target for improved error handling
- `typed-parser.js` simple tree structure — trivial to instantiate and assert against in tests
- `widget-tools.js` `getCanvas()` — creates DOM elements with predictable IDs (`tag_uniqueID`)

### Established Patterns
- TiddlyWiki IIFE module pattern — tests must mock `exports`, `$tw`, and TW's `require()` before loading modules
- `divNode.innerHTML = svgCode` — standard DOM insertion pattern in widget
- No reactive state, `refresh()` returns `false` — simplifies widget testing (no state transitions)
- Error handling is a single `try/catch` wrapping all render logic — modification is localized

### Integration Points
- Error display changes integrate into `wrapper.js` `render()` method only
- Test files are additive — no changes to plugin source needed for test infrastructure
- Phase 5 (CI/CD) will run `node --test` in GitHub Actions — tests must be headless and exit with proper codes

</code_context>

<deferred>
## Deferred Ideas

- Visual regression testing for diagram rendering — would require screenshot comparison infrastructure; belongs in a dedicated testing-enhancement phase or backlog
- Browser compatibility testing across multiple browsers — Phase 5 CI matrix could add this
- Performance benchmarks for rendering speed — not related to reliability
- Accessibility testing for error messages (ARIA labels, screen-reader friendly) — v2 enhancement (ENH-02)
- Test coverage reporting ( Istanbul/nyc) — requires npm; out of scope given no-build-tools constraint

</deferred>

---

*Phase: 02-reliability-testing*
*Context gathered: 2026-04-26*
