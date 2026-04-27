# Phase 3: Performance Optimization - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-27
**Phase:** 03-performance-optimization
**Areas discussed:** Lazy Loading Trigger, D3 Loading Strategy, Loading State UX, Caching Strategy, Testing Approach, Documentation Format
**Mode:** Non-interactive (`--chain` flag, auto-selected decisions)

---

## Lazy Loading Trigger & Mechanism

| Option | Description | Selected |
|--------|-------------|----------|
| On first widget render | Move `require()` calls into `render()`, show loading indicator, then load | ✓ |
| On page load (DOM scan) | Scan for mermaid widgets before loading libraries | |
| On explicit user action | Require user click to load libraries | |

**Selection rationale:** On-first-render is the simplest and most reliable. TiddlyWiki widgets render when encountered in the DOM; no scanning needed. Co-loads both libraries when first diagram is encountered.

---

## D3 Loading Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Co-load with mermaid | Load D3 alongside mermaid on first render | ✓ |
| Separate lazy load | Load D3 only when zoom is first activated | |
| Eager D3, lazy mermaid | Keep D3 at module level, defer mermaid only | |

**Selection rationale:** D3 serves the same widget as mermaid. Pages without diagrams save both (~1.17MB). Separate loading adds state-management complexity for minimal gain.

---

## Loading State UX

| Option | Description | Selected |
|--------|-------------|----------|
| "Loading diagram…" text | Simple text with neutral inline styling | ✓ |
| CSS spinner animation | Animated loading indicator | |
| No indicator | Load silently with potential brief blank state | |

**Selection rationale:** Consistent with Phase 2 error display pattern (inline styled div). No new assets needed. Brief feedback confirms responsiveness.

---

## Caching Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Module-level closure cache | Cache `mermaidAPI` and `d3` in closure variables | ✓ |
| Rely on `require()` cache only | Re-call `require()` every render | |
| Custom cache invalidation | Implement explicit cache clearing logic | |

**Selection rationale:** Fast null-check per render. TiddlyWiki page refreshes reset closures naturally. No invalidation needed.

---

## Testing Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Extend existing wrapper tests | Spy on `require()` in `tests/wrapper.test.js` | ✓ |
| Separate performance test file | New `tests/performance.test.js` | |
| Manual verification only | No automated tests for lazy loading | |

**Selection rationale:** Reuses Phase 2 test infrastructure. Verifies the core behavioral change (when `require()` is called).

---

## Documentation Format

| Option | Description | Selected |
|--------|-------------|----------|
| Phase-specific PERFORMANCE.md | Create `03-PERFORMANCE.md` in phase directory | ✓ |
| Append to PROJECT.md only | Update Key Decisions table only | |
| README.md update | Add performance section to README | |

**Selection rationale:** Dedicated file keeps analysis discoverable. Also update PROJECT.md Key Decisions for cross-reference.

---

## Claude's Discretion

- Exact loading indicator styling (colors, padding, font sizes)
- Exact wording of loading message
- Whether to gate loading indicator with a brief timeout to avoid flashes on fast renders
- Specific formatting of `03-PERFORMANCE.md`

## Deferred Ideas

- CDN-based external loading — network dependency concerns; separate phase
- Service worker caching — v2 enhancement
- Selective widget refresh (ENH-01) — independent from lazy loading
- Custom mermaid build for size reduction — Phase 4 scope
