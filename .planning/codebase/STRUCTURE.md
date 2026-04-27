---
mapped_date: 2026-04-26
last_mapped_commit: 
---

# Directory Structure

```
mermaid-tw5/                          # Project root
├── .git/                             # Git repository
├── .nojekyll                         # Disables Jekyll processing on GitHub Pages
├── LICENSE-MIT-SOFTWARE              # MIT license
├── README.md                         # Project readme
├── docs/
│   └── index.html                    # Pre-built TiddlyWiki for GitHub Pages demo
└── mermaid-tw5/                      # TiddlyWiki edition folder
    ├── plugins/
    │   └── mermaid-tw5/              # Plugin bundle
    │       ├── plugin.info           # Plugin metadata (name, version, description)
    │       ├── $__plugins_mermaid-tw5_d3.v6.min.js
    │       ├── $__plugins_mermaid-tw5_d3.v6.min.js.meta
    │       ├── $__plugins_mermaid-tw5_example.tid
    │       ├── $__plugins_mermaid-tw5_license.txt
    │       ├── $__plugins_mermaid-tw5_license.txt.meta
    │       ├── $__plugins_mermaid-tw5_mermaid.min.js
    │       ├── $__plugins_mermaid-tw5_mermaid.min.js.meta
    │       ├── $__plugins_mermaid-tw5_readme.tid
    │       ├── $__plugins_mermaid-tw5_typed-parser.js
    │       ├── $__plugins_mermaid-tw5_typed-parser.js.meta
    │       ├── $__plugins_mermaid-tw5_usage.tid
    │       ├── $__plugins_mermaid-tw5_widget-tools.js
    │       ├── $__plugins_mermaid-tw5_widget-tools.js.meta
    │       ├── $__plugins_mermaid-tw5_wrapper.js
    │       └── $__plugins_mermaid-tw5_wrapper.js.meta
    ├── tiddlers/                     # Demo/example tiddlers (~200+ files)
    │   ├── $__build.tid              # Build info (TW commit, date)
    │   ├── $__config_*.tid           # TW configuration tiddlers
    │   ├── $__DefaultTiddlers.tid
    │   ├── $__language_Docs_Types_text_vnd.tiddlywiki.mermaid.tid
    │   ├── $__SiteSubtitle.tid
    │   ├── $__SiteTitle.tid
    │   ├── $__StoryList.tid
    │   ├── 2022-12-21 (0.3.7) release notes.tid
    │   ├── 2022-12-28 (0.3.7.1) release notes.tid
    │   ├── HelloThere.tid            # Landing page tiddler
    │   ├── Issues.tid                # Known issues documentation
    │   ├── Tips.tid                  # User tips
    │   ├── Various example tiddlers   # ~100+ demo diagrams
    │   │   ├── Flowchart
    │   │   ├── sequenceDiagram 1
    │   │   ├── Class diagrams
    │   │   ├── Gantt 1
    │   │   ├── Gitgraph Diagram 1
    │   │   ├── stateDiagram 1
    │   │   ├── C4 Diagram
    │   │   ├── User Journey Diagram
    │   │   └── ... (many more)
    │   └── [name].meta               # Metadata sidecars for binary tiddlers
    └── tiddlywiki.info               # TiddlyWiki edition configuration
```

## Key Locations

### Plugin Source Code

All plugin JavaScript lives in:

```
mermaid-tw5/plugins/mermaid-tw5/
```

| File | Lines | Purpose |
|------|-------|---------|
| `$__plugins_mermaid-tw5_wrapper.js` | 112 | Main widget — diagram rendering and D3 zoom |
| `$__plugins_mermaid-tw5_widget-tools.js` | 251 | Utility library (text extraction, options, canvas, colors) |
| `$__plugins_mermaid-tw5_typed-parser.js` | 24 | MIME type parser for `text/vnd.tiddlywiki.mermaid` |
| `$__plugins_mermaid-tw5_mermaid.min.js` | 1,283 | Bundled Mermaid.js 9.3.0 (minified) |
| `$__plugins_mermaid-tw5_d3.v6.min.js` | 6 | Bundled D3.js v6 (minified, single-line) |

### Plugin Metadata / Docs

| File | Purpose |
|------|---------|
| `plugin.info` | Plugin descriptor (version 0.3.8, title, description) |
| `$__plugins_mermaid-tw5_readme.tid` | Plugin readme (installation, credits) |
| `$__plugins_mermaid-tw5_usage.tid` | Usage instructions, troubleshooting |
| `$__plugins_mermaid-tw5_example.tid` | Basic usage examples with live demos |
| `$__plugins_mermaid-tw5_license.txt` | MIT license + dependency licenses |

### Demo / Example Content

| Location | Purpose |
|----------|---------|
| `mermaid-tw5/tiddlers/HelloThere.tid` | Landing page with changelog and basic usage |
| `mermaid-tw5/tiddlers/Issues.tid` | Documented known issues |
| `mermaid-tw5/tiddlers/Tips.tid` | User tips for working with the plugin |
| `mermaid-tw5/tiddlers/[Diagram Name]` | ~100+ example tiddlers demonstrating various Mermaid diagram types |

### Distribution

| File | Purpose |
|------|---------|
| `docs/index.html` | Pre-built TiddlyWiki deployed to GitHub Pages |
| `.nojekyll` | Prevents Jekyll from interfering with GitHub Pages |

## Naming Conventions

### TiddlyWiki Shadow Tiddlers

Plugin files follow TiddlyWiki's shadow tiddler naming convention:
- `$:/plugins/orange/mermaid-tw5/{name}` — the logical TiddlyWiki title
- `$__plugins_mermaid-tw5_{name}` — the on-disk filename (dollar signs escaped as `__`)

### Meta Files

Every plugin file has a corresponding `.meta` sidecar file containing TiddlyWiki fields:
```
module-type: widget
title: $:/plugins/orange/mermaid-tw5/wrapper.js
type: application/javascript
```

### Tiddler Files

- `.tid` files — TiddlyWiki tiddlers with inline metadata header
- Files without extension — TiddlyWiki tiddlers with separate `.meta` sidecars
- Binary files (`.png`) — Always paired with a `.meta` sidecar

## File Counts

| Category | Count |
|----------|-------|
| Plugin JS source files | 3 |
| Plugin bundled minified libraries | 2 |
| Plugin metadata/docs | 5 |
| Plugin `.meta` sidecars | 7 |
| Example tiddlers | ~200+ |
| Config/system tiddlers | ~10 |
| Total project files | ~230+ |
