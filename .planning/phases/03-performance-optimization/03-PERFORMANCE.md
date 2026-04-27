# Phase 3: Performance Analysis

**Date:** 2026-04-27

## Library Sizes

| Library | Size |
|---------|------|
| mermaid.min.js | ~899 KB |
| d3.v6.min.js | ~271 KB |
| **Combined** | **~1,170 KB (~1.17 MB)** |

## Before/After Behavior

| Scenario | Before | After |
|----------|--------|-------|
| Page with no mermaid diagrams | Both libraries loaded eagerly (~1.17 MB parsed and executed on every page load) | Libraries not loaded; zero overhead |
| Page with mermaid diagrams | Both libraries loaded at module initialization (~1.17 MB on every page load) | Libraries loaded on first widget render; brief "Loading diagram…" indicator shown during initialization |
| Subsequent diagrams on same page | Libraries already loaded (TiddlyWiki require() cache) | Libraries already loaded (module-level closure variables); no additional load |

## Impact Summary

- **Pages without diagrams:** Save ~1.17 MB of JavaScript parse and execute time.
- **Pages with diagrams:** Incur the same ~1.17 MB load, but deferred until the first diagram is encountered. A minimal loading indicator provides user feedback during the brief initialization.
- **No cache invalidation:** Closure variables are reset on full page refresh, matching TiddlyWiki's single-page application lifecycle.

## Test Verification

The following automated tests verify lazy loading behavior (run with `node --test`):

- `wrapper.test.js` — Module evaluation does not trigger `require()` for `mermaid.min.js` or `d3.v6.min.js`
- `wrapper.test.js` — First `render()` invocation triggers `require()` for both libraries
- `wrapper.test.js` — Second `render()` invocation does not trigger additional `require()` calls

## Technical Notes

- Implementation uses TiddlyWiki's synchronous `require()` system; no async/await, Promises, or dynamic script injection.
- Both libraries are co-loaded on first render to keep implementation simple and avoid partial-state bugs.
- Loading indicator uses inline styles (no additional CSS files) consistent with Phase 2 error display approach.
