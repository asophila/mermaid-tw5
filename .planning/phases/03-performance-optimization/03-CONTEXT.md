# Phase 3: Performance Optimization - Context

**Gathered:** 2026-04-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Reduce the performance impact of loading mermaid.js and D3.js on TiddlyWiki pages that do not contain Mermaid diagrams. This phase delivers a lazy-loading mechanism that defers library initialization until the first `<$mermaid>` widget renders, with no visible delay for users viewing diagram-containing pages.

**In scope:**
- Lazy loading of `mermaid.min.js` and `d3.v6.min.js`
- Loading state UX during first render
- Caching for subsequent renders
- Automated tests verifying lazy loading behavior
- Bundle size / load impact analysis documentation

**Out of scope:**
- Updating Mermaid.js version (Phase 4)
- Reducing actual minified file sizes
- Async/external script loading (e.g., CDN, dynamic import)
- Service worker caching strategies

</domain>

<decisions>
## Implementation Decisions

### Lazy Loading Trigger & Mechanism
- **D-01:** Move `require()` calls for both `mermaid.min.js` and `d3.v6.min.js` from module-level to inside `MermaidWidget.prototype.render()`. Currently lines 17-22 of `wrapper.js` eagerly load both libraries when the widget module is first required.
- **D-02:** Use module-level closure variables (`mermaidAPI`, `d3`) that are populated on first render and reused by all subsequent widget instances. Once loaded, subsequent renders skip `require()` entirely.
- **D-03:** The loading sequence on first render: (1) show loading indicator, (2) call `require()` for both libraries, (3) initialize `mermaidAPI`, (4) render diagram, (5) attach D3 zoom handler.

### D3 Loading Strategy
- **D-04:** Load D3 lazily alongside mermaid on first widget render. Do not load D3 separately or on-demand for zoom. Both libraries serve the same widget; co-loading keeps the implementation simple and avoids partial-state bugs.
- **D-05:** Rationale: While D3 is smaller (~271KB vs mermaid ~899KB), pages with diagrams will need both. Pages without diagrams save the combined ~1.17MB. Separate lazy loading for D3 adds complexity with minimal real-world benefit.

### Loading State UX
- **D-06:** During first-render library loading, display "Loading diagram…" text inside the diagram container (`divNode`). Use neutral inline styling: gray left border (`border-left: 3px solid #999`), light gray background (`#f5f5f5`), padding (`8px 12px`).
- **D-07:** Replace the loading indicator immediately with the rendered SVG once `mermaidAPI.render()` completes. No spinner animation, no progress bar — minimal overhead.
- **D-08:** If library loading or rendering fails after the loading indicator is shown, fall through to the existing Phase 2 error display (styled error container with user-friendly message).

### Caching & Subsequent Renders
- **D-09:** Cache loaded library exports in module-level variables: `var mermaidAPI = null, d3 = null;`. On each `render()`, check `if (!mermaidAPI)` before calling `require()`. TiddlyWiki's `require()` already caches module execution; this adds a fast null-check per render.
- **D-10:** Do not implement explicit cache invalidation. The plugin is reloaded on full page refresh, which resets the closure variables. This matches TiddlyWiki's single-page application lifecycle.

### Testing Lazy Loading
- **D-11:** Extend existing Phase 2 test suite. Add tests in `tests/wrapper.test.js` verifying:
  - Module evaluation does not call `require('$:/plugins/orange/mermaid-tw5/mermaid.min.js')` or `require('$:/plugins/orange/mermaid-tw5/d3.v6.min.js')`.
  - First `render()` invocation triggers `require()` for both libraries.
  - Second `render()` invocation does not trigger additional `require()` calls.
- **D-12:** Use the existing `tests/helpers/tw-bootstrap.js` mock infrastructure. Spy on `require()` to verify call patterns.

### Bundle Size & Load Impact Documentation
- **D-13:** Create `03-PERFORMANCE.md` in the phase directory with:
  - Table of library sizes (mermaid.min.js ~899KB, d3.v6.min.js ~271KB, total ~1.17MB)
  - Before/after behavior matrix: pages without diagrams no longer execute either library; pages with diagrams load on first render with brief "Loading diagram…" indicator
  - Test verification summary (which tests prove the lazy loading)
- **D-14:** Update PROJECT.md Key Decisions table with a new entry documenting the lazy loading approach and its impact.

### Claude's Discretion
- Exact styling of the loading indicator (specific colors, padding, font size)
- Exact wording of "Loading diagram…" message
- Whether to add a small timeout/delay before showing the loading indicator (to avoid flash on very fast renders)
- Additional edge-case tests beyond the required scope
- Formatting details of `03-PERFORMANCE.md`

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Plugin Source
- `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_wrapper.js` — Widget rendering and current eager library loading (lines 17-22)
- `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_mermaid.min.js` — Bundled Mermaid.js 9.3.0 (module-type: library)
- `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_d3.v6.min.js` — Bundled D3.js v6 (module-type: library)

### Codebase Intelligence
- `.planning/codebase/ARCHITECTURE.md` — Component responsibilities, data flow, entry points
- `.planning/codebase/CONCERNS.md` — Bundle size documentation, performance notes
- `.planning/codebase/CONVENTIONS.md` — TiddlyWiki module pattern, IIFE structure

### Project Requirements
- `.planning/REQUIREMENTS.md` — PERF-01 requirement
- `.planning/ROADMAP.md` — Phase 3 goal, success criteria, requirements mapping

### Prior Phase Context
- `.planning/phases/02-reliability-testing/02-CONTEXT.md` — Error display decisions (D-01 through D-05) that constrain loading-error fallback behavior

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `wrapper.js` module-level `require()` calls (lines 17-22) — direct relocation target for lazy loading
- `wrapper.js` `render()` method (lines 60-130) — insertion point for lazy loading check and loading indicator
- Phase 2 error HTML template (lines 114-126) — pattern to follow for loading indicator styling

### Established Patterns
- TiddlyWiki IIFE module pattern with closure-level variables — ideal for caching loaded APIs across widget instances
- `divNode.innerHTML = svgCode` — standard DOM insertion; loading indicator uses same mechanism
- `require()` for TiddlyWiki modules — synchronous, cached after first call
- No reactive state, `refresh()` returns `false` — simplifies lazy loading (no need to handle state transitions)

### Integration Points
- Lazy loading changes are localized to `wrapper.js` only — no changes to `typed-parser.js`, `widget-tools.js`, or library files
- Loading indicator must coexist with Phase 2 error display (same container, different content)
- Phase 2 test infrastructure (`tests/helpers/tw-bootstrap.js`, `tests/helpers/dom-mock.js`) — extend for lazy loading tests
- Phase 5 (CI/CD) will run lazy loading tests alongside existing tests

</code_context>

<specifics>
## Specific Ideas

- Keep the implementation compatible with TiddlyWiki 5's synchronous `require()` system. No async/await, no Promises, no dynamic script injection.
- The loading indicator should use inline styles (no new CSS files) to stay consistent with the Phase 2 error display approach.
- Consider whether a very brief loading indicator "flash" is acceptable. If library execution is fast (<50ms), the indicator may appear and disappear quickly. This is acceptable — it confirms the system is responsive.
- Ensure the D3 zoom event listener attachment still works correctly when D3 is loaded lazily. The click handler closure captures the `d3` variable; verify it's populated before the user can click.

</specifics>

<deferred>
## Deferred Ideas

- CDN-based lazy loading (load libraries from external URL) — would reduce TiddlyWiki file size but introduces network dependency and CSP concerns; belongs in a separate architecture phase
- Service worker caching for offline diagram rendering — v2 enhancement
- Selective widget refresh instead of full re-render on tiddler changes (ENH-01 from REQUIREMENTS.md v2) — independent optimization
- Reducing mermaid bundle size via custom build or tree-shaking — blocked by no-build-tools constraint and upstream lite version request; belongs in Phase 4

</deferred>

---

*Phase: 03-performance-optimization*
*Context gathered: 2026-04-27*
