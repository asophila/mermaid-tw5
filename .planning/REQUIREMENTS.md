# Requirements: mermaid-tw5

**Defined:** 2026-04-26
**Core Value:** TiddlyWiki users can create and view rich Mermaid diagrams natively within their notebooks without leaving the wiki environment.

## v1 Requirements

Requirements for this maintenance and improvement milestone.

### Code Quality

- [x] **CLEAN-01**: Remove all debug `console.log` statements from production code
- [x] **CLEAN-02**: Remove commented-out dead code (Node.js/browser detection block)
- [x] **STYLE-01**: Establish and apply consistent JavaScript coding style (var vs let, formatting)

### Reliability

- [ ] **QUAL-01**: Replace raw exception display with user-friendly error messages
- [ ] **QUAL-02**: Add automated test suite covering widget rendering and parser behavior

### Performance

- [ ] **PERF-01**: Investigate and implement lazy loading of mermaid.js and D3.js libraries

### Dependencies

- [x] **UPDT-01**: Evaluate modern Mermaid.js versions (or lite builds) and adopt if bundle size is acceptable — Evaluated in Phase 4; deferred. All modern versions (10.9.0, 11.14.0, tiny) exceed size threshold.

### Automation

- [x] **AUTO-01**: Set up CI/CD pipeline for build verification and GitHub Pages deployment — Completed in Phase 5

### Documentation

- [x] **DOCS-02**: Add developer setup instructions and contribution guidelines — Completed in Phase 5

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhancements

- **ENH-01**: Selective widget refresh instead of full re-render on tiddler changes
- **ENH-02**: Accessibility improvements (ARIA labels, keyboard navigation for zoom)
- **ENH-03**: Custom theme integration with TiddlyWiki's palette system

### Advanced Features

- **ADV-01**: Export diagrams as PNG/SVG from within TiddlyWiki
- **ADV-02**: Live diagram editor with syntax highlighting

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real-time collaboration | Not core to a single-user TiddlyWiki plugin |
| Server-side rendering | Plugin is client-side only by design |
| Custom diagram types beyond Mermaid | Out of scope; leverage upstream Mermaid |
| Mobile-native app wrapper | Web-first; mobile browsers are sufficient |
| Multi-user security hardening | Plugin targets personal notebooks; documented trade-off |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CLEAN-01 | Phase 1 | Complete |
| CLEAN-02 | Phase 1 | Complete |
| STYLE-01 | Phase 1 | Complete |
| QUAL-01 | Phase 2 | Pending |
| QUAL-02 | Phase 2 | Pending |
| PERF-01 | Phase 3 | Pending |
| UPDT-01 | Phase 4 | Deferred |
| AUTO-01 | Phase 5 | Complete |
| DOCS-02 | Phase 5 | Complete |

**Coverage:**
- v1 requirements: 8 total
- Mapped to phases: 8
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-26*
*Last updated: 2026-04-26 after initial definition*
