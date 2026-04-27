# Phase 4: Dependency Modernization - Context

**Gathered:** 2026-04-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Evaluate and adopt a modern Mermaid.js version while controlling bundle size. This phase delivers a documented decision on whether to upgrade from Mermaid 9.3.0 to a modern version (10.x+), with implementation if adoption criteria are met.

**In scope:**
- Research modern Mermaid.js versions (10.x, 11.x) for bundle size and API compatibility
- Investigate lite build or modular import strategies
- Test all existing diagram types with candidate version
- Document adoption or deferral decision in PROJECT.md
- Update bundled library file if adopted
- Verify D3 zoom integration and click interactions still work

**Out of scope:**
- Custom build pipeline or tree-shaking (no build tools in project)
- CDN-based loading (network dependency violates offline-first design)
- New diagram types beyond what Mermaid 9.3.0 already supports
- D3.js version update (separate concern)

</domain>

<decisions>
## Implementation Decisions

### Version Evaluation Strategy
- **D-01:** Evaluate two candidate versions: latest stable Mermaid 11.x and the most recent 10.x LTS. Mermaid 11.x reports ~624 KB minified (Bundlephobia), which is smaller than current 9.3.0 (~899 KB). The old 3.2 MB figure for 10.x may have been for specific releases or included all diagram types.
- **D-02:** Download official minified builds from unpkg/jsdelivr CDN for evaluation. Do not use npm — the project has no package manager and libraries are vendored as raw minified files.
- **D-03:** Compare sizes of: (a) full minified bundle, (b) ESM build if available for selective imports. No custom builds due to no-build-tools constraint.

### Size Control Approach
- **D-04:** Primary strategy: use the full pre-built minified bundle if its size is ≤1.2 MB (comparable to current mermaid 9.3.0). This keeps the plugin simple with no module system changes.
- **D-05:** Fallback strategy: if full bundle exceeds 1.2 MB but is ≤1.5 MB, evaluate whether the security/feature benefits justify the increase. Threshold for deferral: >1.5 MB or unacceptable compatibility issues.
- **D-06:** No ESM/modular import approach for this phase — the project uses TiddlyWiki's synchronous `require()` system which expects UMD/IIFE libraries. Converting to ESM would require significant architecture changes.

### Compatibility Testing Scope
- **D-07:** Test all existing diagram types supported by the plugin: flowcharts (graph TD/LR), sequence diagrams, class diagrams, state diagrams, Gantt charts, and Git graphs.
- **D-08:** Test all three rendering paths: `<$mermaid>` widget, `text/vnd.tiddlywiki.mermaid` typed parser, and `$$$text/vnd.tiddlywiki.mermaid` block syntax.
- **D-09:** Test D3 zoom integration (click-to-toggle pan/zoom) and click interactions (securityLevel: 'loose' bindings). These are fragile integration points.
- **D-10:** Use existing Phase 2 test suite as regression baseline. Add tests for new Mermaid version if adopted.

### API Migration Approach
- **D-11:** Mermaid 10+ changed from `mermaidAPI.render(id, source, callback)` to async `mermaid.render(id, source)` returning a Promise. The current wrapper.js uses the callback-based API.
- **D-12:** Evaluate migration path: if the new API requires async/await or Promise handling, adapt wrapper.js accordingly. TiddlyWiki's render() is synchronous, so use `.then()` pattern or synchronous fallback if available.
- **D-13:** If API changes are too extensive (require major wrapper.js rewrite), consider deferring upgrade until a later phase or staying on a compatible version.

### Adoption vs Deferral Criteria
- **D-14:** Adopt if ALL of: (1) minified bundle ≤1.2 MB, (2) all existing diagrams render correctly, (3) API migration is straightforward (≤50 lines changed in wrapper.js), (4) D3 zoom and click interactions work.
- **D-15:** Defer if ANY of: (1) bundle >1.5 MB, (2) breaking API changes require significant rewrite, (3) compatibility issues with existing diagrams that can't be resolved quickly, (4) D3 integration breaks.
- **D-16:** If deferring, document rationale in PROJECT.md Key Decisions with upstream tracking reference (mermaid-js/mermaid#4616) and re-evaluation trigger (e.g., "Revisit when upstream lite build is available or bundle drops below 1.2 MB").

### Claude's Discretion
- Exact Mermaid version number to evaluate (researcher picks latest stable)
- Whether to also evaluate Mermaid 10.x alongside 11.x
- Specific test diagrams to use for compatibility verification
- Exact wording of deferral rationale in PROJECT.md
- Whether to update plugin.info version number if library is updated

</decisions>

<specifics>
## Specific Ideas

- The Bundlephobia size for mermaid v11.14.0 (~624 KB minified) suggests modern versions may actually be smaller than 9.3.0, making adoption more attractive than when the project originally evaluated 10.x at 3.2 MB.
- Keep the same file naming convention: `$__plugins_mermaid-tw5_mermaid.min.js` — just replace contents.
- If upgrading, verify that `securityLevel: 'loose'` still works the same way — this is critical for click interactions.
- The D3 zoom logic wraps SVG content in a `<g>` element and uses `d3.zoom()` — verify this still works with SVG output from modern Mermaid.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Plugin Source
- `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_wrapper.js` — Current widget using mermaidAPI.render() callback API (lines 73-115)
- `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_mermaid.min.js` — Bundled Mermaid.js 9.3.0 (to be evaluated for replacement)
- `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_d3.v6.min.js` — Bundled D3.js v6 (zoom integration target)
- `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_typed-parser.js` — MIME type parser (verify compatibility)

### Codebase Intelligence
- `.planning/codebase/STACK.md` — Current library versions, size documentation
- `.planning/codebase/CONCERNS.md` — Bundle size tension, outdated mermaid version concern
- `.planning/codebase/ARCHITECTURE.md` — Component responsibilities, data flow

### Project Requirements
- `.planning/REQUIREMENTS.md` — UPDT-01 requirement
- `.planning/ROADMAP.md` — Phase 4 goal, success criteria, requirements mapping
- `.planning/PROJECT.md` — Key Decisions table (to be updated with adoption/deferral decision)

### Prior Phase Context
- `.planning/phases/03-performance-optimization/03-CONTEXT.md` — Lazy loading decisions (D-01 through D-14) that affect how new library is loaded
- `.planning/phases/02-reliability-testing/02-CONTEXT.md` — Error handling and test infrastructure decisions

### Performance Documentation
- `.planning/phases/03-performance-optimization/03-PERFORMANCE.md` — Current library sizes and lazy loading impact

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `wrapper.js` `render()` method (lines 56-134) — contains mermaidAPI initialization and render call; primary migration target
- `wrapper.js` lazy loading block (lines 75-79) — loads mermaid.min.js via `require()`; replace target library while keeping loading mechanism
- Phase 2 test suite (`tests/wrapper.test.js`, `tests/typed-parser.test.js`) — regression baseline for compatibility testing
- Phase 3 lazy loading tests — verify new library still loads lazily

### Established Patterns
- TiddlyWiki IIFE module pattern with `require()` for library loading — new library must be UMD or IIFE format
- `mermaidAPI.initialize({...})` followed by `mermaidAPI.render(id, source, callback)` — current API pattern
- `securityLevel: 'loose'` required for click interactions — must verify equivalent in modern versions
- D3 zoom wraps SVG in `<g>` and applies transforms — verify SVG structure compatibility

### Integration Points
- Library file is referenced by TiddlyWiki title: `$:/plugins/orange/mermaid-tw5/mermaid.min.js`
- Module-type is `library` in the tiddler metadata
- Lazy loading (Phase 3) means new library is only loaded on first diagram render — reduces risk of breaking non-diagram pages
- D3 integration is tightly coupled to SVG output structure

</code_context>

<deferred>
## Deferred Ideas

- CDN-based loading with local fallback — would reduce bundle size but introduces network dependency; belongs in architecture redesign phase
- Custom Mermaid build with only needed diagram types — requires build pipeline (npm/rollup); blocked by no-build-tools constraint
- D3.js version update to v7 — separate dependency concern, not tied to Mermaid upgrade
- Tree-shaking or dead-code elimination — requires bundler; out of scope
- Adding new diagram types (pie charts, mindmaps, etc.) that modern Mermaid supports — new capability, belongs in enhancement phase

</deferred>

---

*Phase: 04-dependency-modernization*
*Context gathered: 2026-04-27*
