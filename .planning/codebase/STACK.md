---
mapped_date: 2026-04-26
last_mapped_commit: 
---

# Technology Stack

## Overview

mermaid-tw5 is a TiddlyWiki 5 plugin that embeds the Mermaid.js diagramming library into TiddlyWiki notebooks. It is a client-side JavaScript plugin with no build pipeline, no package manager, and no server-side runtime.

## Languages

| Language | Usage | Files |
|----------|-------|-------|
| JavaScript | Plugin source, widget logic, parser, utilities | `mermaid-tw5/plugins/mermaid-tw5/*.js` |
| TiddlyWiki Tiddler Format | Documentation, examples, configuration, metadata | `mermaid-tw5/tiddlers/*`, `mermaid-tw5/plugins/mermaid-tw5/*.tid` |
| HTML | Pre-built TiddlyWiki distribution | `docs/index.html` |
| JSON | Plugin metadata and TiddlyWiki config | `mermaid-tw5/plugins/mermaid-tw5/plugin.info`, `mermaid-tw5/tiddlywiki.info` |

## Runtime & Framework

- **Host Platform**: TiddlyWiki 5 (v5.3.3 as of plugin v0.3.8)
- **Execution Environment**: Browser (primary) and Node.js (TiddlyWiki for Node.js)
- **Module System**: TiddlyWiki's proprietary module system (`module-type: widget`, `module-type: parser`, `module-type: library`)
- **No npm / Node.js build tools**: The project has no `package.json`, no bundler, no transpiler

## Dependencies

### Bundled Libraries (Vendored)

| Library | Version | Size (minified) | Purpose | File |
|---------|---------|-----------------|---------|------|
| mermaid.js | 9.3.0 | ~899 KB | Core diagram rendering engine | `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_mermaid.min.js` |
| D3.js | v6 | ~271 KB | Pan, zoom, and click interaction support | `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_d3.v6.min.js` |

### TiddlyWiki Core Dependencies

- `$:/core/modules/widgets/widget.js` — Widget base class
- `$:/plugins/orange/mermaid-tw5/widget-tools.js` — Internal utility library (rocklib)

### Host TiddlyWiki Plugins (from `tiddlywiki.info`)

- `tiddlywiki/tiddlyweb` — TiddlyWeb sync support
- `tiddlywiki/filesystem` — File system sync support

### Host TiddlyWiki Themes

- `tiddlywiki/vanilla`
- `tiddlywiki/snowwhite`

## Configuration

### Plugin Metadata

File: `mermaid-tw5/plugins/mermaid-tw5/plugin.info`

```json
{
    "description": "wrapper for the Mermaid diagramming library",
    "name": "Mermaid",
    "plugin-type": "plugin",
    "title": "$:/plugins/orange/mermaid-tw5",
    "version": "0.3.8"
}
```

### TiddlyWiki Build Configuration

File: `mermaid-tw5/tiddlywiki.info`

Defines two build targets:
- `index` — Renders offline save template to `index.html`
- `static` — Renders static HTML and CSS files

## Version History

| Version | Date | Notable Changes |
|---------|------|-----------------|
| 0.3.8 | 2024-03-18 | Added `$$$` block syntax support; added D3 pan/zoom/click interactions |
| 0.3.7.1 | 2022-12-28 | Node.js compatibility fixes |
| 0.3.7 | 2022-12-21 | Updated mermaid to 9.3.0; TiddlyWiki to 5.2.5 |
| 0.3.6 | 2022-05-30 | Updated mermaid to 9.1.1 |
| 0.3.5 | 2022-05-08 | External rocklib no longer needed (inlined) |
| 0.3.4 | 2022-05-07 | Updated mermaid to 9.0.1; TiddlyWiki to 5.2.2 |
| 0.3.3 | 2021-10-11 | Cleanup, tests, minor modifications |
| 0.3.2 | 2021-10-10 | Updated mermaid to 8.13.2 |

## File Size Impact

- Empty TiddlyWiki 5.3.3: ~2.4 MB
- Plugin overhead (mermaid + d3): ~1.1 MB
- Total with plugin: ~3.6 MB

The maintainer intentionally stayed on mermaid 9.3.0 because mermaid 10.9.0 is 3.2 MB (see `README.md` notes).
