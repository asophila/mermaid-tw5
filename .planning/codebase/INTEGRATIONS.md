---
mapped_date: 2026-04-26
last_mapped_commit: 
---

# External Integrations

## Overview

mermaid-tw5 has minimal external integrations by design. It is a self-contained plugin that bundles all dependencies and does not require network connectivity at runtime.

## External Libraries (Bundled)

### Mermaid.js
- **Version**: 9.3.0 (bundled, minified)
- **Source**: https://github.com/mermaid-js/mermaid
- **License**: MIT
- **Usage**: Core diagram rendering via `mermaidAPI.render()`
- **File**: `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_mermaid.min.js`

### D3.js
- **Version**: v6 (bundled, minified)
- **Source**: https://d3js.org/
- **Usage**: Pan, zoom, and click event handling on rendered SVG diagrams
- **File**: `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_d3.v6.min.js`
- **Added by**: fkmiec (2023-05-21) via PR #5

## Platform Integration

### TiddlyWiki 5
- **Required version**: 5.3.3 (as of plugin v0.3.8)
- **Compatibility**: Browser and Node.js environments
- **Integration points**:
  - Widget system (`module-type: widget`)
  - Parser system (`module-type: parser`)
  - Tiddler type registration (`text/vnd.tiddlywiki.mermaid`)

### TiddlyWeb / File System
- Configured in `tiddlywiki.info` as host plugins
- Used for saving/persisting the TiddlyWiki notebook

## External Services (None at Runtime)

The plugin does **not** communicate with:
- External APIs
- CDN resources
- Analytics services
- Authentication providers
- Webhooks

All functionality is client-side and offline-capable.

## Distribution

### GitHub Pages
- **URL**: http://efurlanm.github.io/mermaid-tw5
- **Purpose**: Live demo and plugin distribution
- **File**: `docs/index.html` (pre-built TiddlyWiki)

### GitHub Repository
- **URL**: https://github.com/efurlanm/mermaid-tw5
- **License**: MIT (`LICENSE-MIT-SOFTWARE`)

## Upstream Dependencies (for Updates)

When updating the plugin, maintainers fetch new versions from:
- Mermaid.js releases: https://github.com/mermaid-js/mermaid/releases
- TiddlyWiki releases: https://github.com/Jermolene/TiddlyWiki5

## Mermaid Diagram Types Supported

Via bundled mermaid 9.3.0, the plugin supports all standard Mermaid diagram types:
- Flowcharts
- Sequence diagrams
- Class diagrams
- State diagrams
- Gantt charts
- Pie charts
- Git graphs
- User journey diagrams
- Requirement diagrams
- C4 diagrams
- ER diagrams

## Known Size Constraint

Mermaid 10.x (current upstream) is ~3.2 MB minified, which the maintainer considers too large compared to the empty TiddlyWiki (~2.4 MB). The project tracks upstream issue https://github.com/mermaid-js/mermaid/issues/4616 for a potential "lite" version that could enable future upgrades.
