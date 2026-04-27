# mermaid-tw5

## What This Is

A TiddlyWiki 5 plugin that embeds the Mermaid.js diagramming library, enabling users to render flowcharts, sequence diagrams, class diagrams, state diagrams, Gantt charts, Git graphs, and more directly inside TiddlyWiki notebooks. The plugin provides both a `<$mermaid>` widget and a dedicated MIME-type parser for seamless integration.

## Core Value

TiddlyWiki users can create and view rich Mermaid diagrams natively within their notebooks without leaving the wiki environment.

## Requirements

### Validated

- ✓ **RENDER-01**: Render Mermaid diagrams via `<$mermaid>` widget — existing
- ✓ **RENDER-02**: Render diagrams via `text/vnd.tiddlywiki.mermaid` typed parser — existing
- ✓ **RENDER-03**: Support `$$$text/vnd.tiddlywiki.mermaid` block syntax — existing (v0.3.8)
- ✓ **INTERACT-01**: Pan and zoom diagrams via D3.js click interaction — existing (v0.3.8)
- ✓ **INTERACT-02**: Clickable links within diagrams for TiddlyWiki navigation — existing
- ✓ **CONFIG-01**: Configurable diagram options via tiddler fields and widget attributes — existing
- ✓ **ERROR-01**: Basic rendering error catching and display — existing
- ✓ **DOCS-01**: Plugin readme, usage instructions, and example tiddlers — existing
- ✓ **QUAL-01**: Improve error handling with user-friendly messages instead of raw exceptions — validated in Phase 2
- ✓ **QUAL-02**: Add automated test suite for widget rendering and parser behavior — validated in Phase 2
- ✓ **DIST-01**: Pre-built TiddlyWiki demo hosted on GitHub Pages — existing

### Active

- [ ] **UPDT-01**: Evaluate and adopt a modern Mermaid.js version (or lite build) that controls bundle size
- [ ] **CLEAN-01**: Remove debug `console.log` statements from production code
- [ ] **CLEAN-02**: Remove commented-out dead code (Node.js/browser detection)
- [ ] **PERF-01**: Investigate lazy loading of mermaid.js and D3.js to reduce initial load
- [ ] **DOCS-02**: Add developer setup and contribution guidelines
- [ ] **AUTO-01**: Set up CI/CD for automated build verification and GitHub Pages deployment
- [ ] **STYLE-01**: Establish and apply consistent JavaScript coding style

### Out of Scope

- **Real-time collaboration** — Not core to a single-user TiddlyWiki plugin
- **Server-side rendering** — Plugin is client-side only by design
- **Custom diagram types beyond Mermaid** — Out of scope; leverage upstream Mermaid
- **Mobile-native app wrapper** — Web-first; mobile browsers are sufficient
- **Multi-user security hardening** — Plugin targets personal notebooks; `securityLevel: 'loose'` is a documented trade-off

## Context

- **Technical environment**: TiddlyWiki 5 plugin architecture with no build pipeline, no npm, no bundler
- **Prior work**: Consolidation of multiple earlier community efforts (gt6796c, jasonmhoule, cedarvera, jceb)
- **Bundle size tension**: Empty TW 5.3.3 is ~2.4 MB; mermaid 9.3.0 adds ~0.9 MB; mermaid 10.x would add ~3.2 MB — maintainer intentionally stayed on older version
- **Upstream tracking**: Waiting on mermaid-js/mermaid#4616 (lite version request)
- **Maintenance model**: Single maintainer (E Furlan), infrequent updates, no automated dependency updates
- **Fragile areas**: WikiText un-parsing (`getScriptBody`) described by original author as "twitchy difficult to maintain and buggy"

## Constraints

- **Tech stack**: Must remain compatible with TiddlyWiki 5 module system; no npm/build tools introduced without strong justification
- **Bundle size**: Plugin overhead must remain reasonable relative to empty TiddlyWiki (~2.4 MB)
- **Compatibility**: Must work in both browser and Node.js TiddlyWiki environments
- **Dependencies**: Mermaid.js and D3.js are vendored; updates require manual verification

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Stay on Mermaid 9.3.0 | Mermaid 10.x is 3.2 MB minified, considered too large | ⚠️ Revisit — missing security patches and new diagram types |
| `securityLevel: 'loose'` | Required for clickable diagram interactions within TiddlyWiki | ✓ Good — documented trade-off for personal notebooks |
| Inline rocklib (v0.3.5) | Remove external dependency on `$:/plugins/orange/mermaid-tw5/widget-tools.js` | ✓ Good — reduced fragility from external plugin dependency |
| D3 zoom via click toggle | Enables pan/zoom without complex UI chrome | ⚠️ Revisit — unconventional UX pattern |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-27 after Phase 2 completion*
