# Roadmap: mermaid-tw5

**Created:** 2026-04-26
**Granularity:** Standard
**Mode:** YOLO

## Milestones

- ✅ **v0.5.0 Maintenance & Automation** — Phases 1-5 (shipped 2026-04-27)
- 📋 **v0.6.0+** — Future enhancements (planned)

## Phases

<details>
<summary>✅ v0.5.0 (Phases 1-5) — SHIPPED 2026-04-27</summary>

### Phase 1: Cleanup & Polish

**Goal:** Remove accumulated technical debt and establish consistent code style.
**Requirements:** CLEAN-01, CLEAN-02, STYLE-01
**Success Criteria:**
1. No `console.log` statements remain in `wrapper.js` zoom logic
2. Commented-out Node.js/browser detection block is removed
3. JavaScript style is consistent across all plugin source files
4. All existing examples continue to render correctly after cleanup

### Phase 2: Reliability & Testing

**Goal:** Improve error handling and establish automated testing.
**Requirements:** QUAL-01, QUAL-02
**Success Criteria:**
1. Rendering errors display user-friendly messages instead of raw exception text
2. Test suite runs automatically and covers widget rendering path
3. Test suite covers typed parser behavior
4. Tests can be run locally and in CI

### Phase 3: Performance Optimization

**Goal:** Reduce the performance impact of loading mermaid.js and D3.js on pages without diagrams.
**Requirements:** PERF-01
**Success Criteria:**
1. Lazy loading mechanism is implemented and functional
2. Pages without mermaid content do not load mermaid.min.js or d3.v6.min.js
3. Pages with mermaid content load libraries on demand with no visible delay
4. Bundle size analysis documents before/after impact

### Phase 4: Dependency Modernization

**Goal:** Evaluate and adopt a modern Mermaid.js version while controlling bundle size.
**Requirements:** UPDT-01
**Success Criteria:**
1. Modern Mermaid.js versions (10.x+) are evaluated for size and compatibility
2. Lite build or modular import strategy is investigated
3. Decision is documented in PROJECT.md Key Decisions
4. N/A — adoption criteria not met (size >1.5 MB)
5. Rationale documented with upstream tracking reference (mermaid-js/mermaid#4616)

### Phase 5: Developer Experience

**Goal:** Automate build verification and improve project documentation for contributors.
**Requirements:** AUTO-01, DOCS-02
**Success Criteria:**
1. GitHub Actions workflow runs tests on push/PR
2. GitHub Actions workflow builds and deploys demo to GitHub Pages
3. Developer setup instructions are added to README or CONTRIBUTING.md
4. Contribution guidelines specify coding standards and PR process

</details>

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
| ----- | --------- | -------------- | ------ | --------- |
| 1. Cleanup & Polish | v0.5.0 | 2/2 | Complete | 2026-04-27 |
| 2. Reliability & Testing | v0.5.0 | 2/2 | Complete | 2026-04-27 |
| 3. Performance Optimization | v0.5.0 | 2/2 | Complete | 2026-04-27 |
| 4. Dependency Modernization | v0.5.0 | 2/2 | Complete | 2026-04-27 |
| 5. Developer Experience | v0.5.0 | 2/2 | Complete | 2026-04-27 |

---

*Roadmap created: 2026-04-26*
*Last updated: 2026-04-27 after v0.5.0 milestone completion*
