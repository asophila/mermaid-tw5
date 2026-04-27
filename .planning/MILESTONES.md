# Milestones: mermaid-tw5

## v0.5.0 — Maintenance & Automation

**Shipped:** 2026-04-27
**Phases:** 5 (1-5)
**Plans:** 10

### What Was Built

1. **Code quality cleanup** — Removed debug artifacts and dead code; established consistent JavaScript style across all plugin files.
2. **Error handling & testing** — Replaced raw exception display with XSS-safe, user-friendly error containers; created 13-test automated suite with TiddlyWiki mocks.
3. **Performance optimization** — Implemented lazy loading of mermaid.min.js and d3.v6.min.js, deferring ~1.17 MB until first diagram render.
4. **Dependency evaluation** — Evaluated Mermaid 10.9.0, 11.14.0, and @mermaid-js/tiny; documented deferral due to bundle size exceeding threshold.
5. **Developer experience** — Added GitHub Actions CI/CD (test + deploy) and comprehensive developer documentation (README + CONTRIBUTING.md).

### Stats

- 5 phases, 10 plans, all complete
- 10 JavaScript files, ~2,134 LOC
- 104 git commits total
- Timeline: 2022-05-07 → 2026-04-27

### Key Decisions

- Stay on Mermaid 9.3.0 — modern versions exceed size threshold; tracking upstream mermaid-js/mermaid#4616
- Lazy loading confirmed as critical for controlling perceived load

### Known Gaps

- None. All v1 requirements addressed (one deferred with documented rationale).

---

*For milestone archives, see `.planning/milestones/v0.5.0-ROADMAP.md` and `.planning/milestones/v0.5.0-REQUIREMENTS.md`*
