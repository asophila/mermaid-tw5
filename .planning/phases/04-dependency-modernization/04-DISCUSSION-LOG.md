# Phase 4: Dependency Modernization - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-27
**Phase:** 4-dependency-modernization
**Areas discussed:** Version Evaluation Strategy, Size Control Approach, Compatibility Testing Scope, API Migration Approach, Adoption vs Deferral Criteria

---

## Version Evaluation Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Evaluate 11.x only | Focus on latest stable version only | |
| Evaluate 10.x and 11.x | Compare both recent major versions for size and compatibility | ✓ |
| Evaluate all 10.x releases | Exhaustive search across all 10.x versions | |

**User's choice:** Evaluate latest stable Mermaid 11.x and most recent 10.x LTS. Bundlephobia suggests v11.14.0 is ~624 KB minified, significantly smaller than old 3.2 MB estimates.
**Notes:** Download official minified builds from unpkg/jsdelivr for evaluation. No npm usage — project has no package manager.

---

## Size Control Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Full minified bundle only | Use pre-built UMD bundle if size acceptable | ✓ |
| ESM selective imports | Import only needed diagram types | |
| Lite build | Use upstream lite build if available | |

**User's choice:** Primary strategy is full pre-built minified bundle if ≤1.2 MB. No ESM approach for this phase — TiddlyWiki's synchronous require() expects UMD/IIFE.
**Notes:** Fallback: evaluate if ≤1.5 MB with significant benefits. Defer if >1.5 MB.

---

## Compatibility Testing Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Smoke test only | Test one diagram type quickly | |
| All existing diagram types | Flowcharts, sequence, class, state, Gantt, Git graphs | ✓ |
| All diagram types + new ones | Include pie charts, mindmaps, etc. | |

**User's choice:** Test all existing diagram types across all three rendering paths (widget, typed parser, $$$ block syntax). Include D3 zoom and click interaction verification.
**Notes:** Use existing Phase 2 test suite as regression baseline.

---

## API Migration Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Migrate to new async API | Adapt wrapper.js to Promise-based render() | ✓ |
| Use compatibility shim | Wrap new API in callback interface | |
| Stay on old API | Find a version that supports callback API | |

**User's choice:** Evaluate migration to async API using .then() pattern (TiddlyWiki render() is synchronous). If too complex, consider deferral.
**Notes:** Current code uses mermaidAPI.render(id, source, callback). Mermaid 10+ uses mermaid.render(id, source) returning Promise.

---

## Adoption vs Deferral Criteria

| Option | Description | Selected |
|--------|-------------|----------|
| Adopt if smaller | Any size reduction justifies upgrade | |
| Adopt with criteria | Size ≤1.2 MB + compatibility + easy migration | ✓ |
| Always defer | Wait for upstream lite build (#4616) | |

**User's choice:** Adopt if ALL criteria met: bundle ≤1.2 MB, all diagrams render, API migration straightforward (≤50 lines), D3 zoom works. Defer if ANY criterion fails.
**Notes:** If deferring, document rationale in PROJECT.md with upstream tracking reference.

---

## Claude's Discretion

- Exact Mermaid version number to evaluate (researcher picks latest stable)
- Whether to also evaluate Mermaid 10.x alongside 11.x
- Specific test diagrams for compatibility verification
- Exact wording of deferral rationale in PROJECT.md

## Deferred Ideas

- CDN-based loading with local fallback — architecture redesign phase
- Custom Mermaid build with selective diagram types — requires build pipeline
- D3.js version update to v7 — separate dependency concern
- Adding new diagram types (pie charts, mindmaps) — enhancement phase
