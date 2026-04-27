# mermaid-tw5

*Last edited: 2026-04-27*

A TiddlyWiki 5 plugin that embeds [Mermaid](https://mermaid.js.org), enabling you to render diagrams directly inside your wiki notebooks.

**Live demo:** <https://asophila.github.io/mermaid-tw5>  
**Install:** Open the demo and drag the `$:/plugins/orange/mermaid-tw5` tiddler into your wiki.

---

## What You Get

- **24+ diagram types** — from flowcharts to mindmaps, timelines, Sankey diagrams, and more
- **Lazy loading** — libraries only load when a page actually contains a diagram
- **Click-to-zoom** — pan and zoom any diagram with D3.js
- **Clickable links** — navigate between tiddlers from inside diagrams
- **Safe errors** — malformed diagrams show friendly messages, not raw stack traces

---

## Supported Diagram Types

The plugin uses **Mermaid 11.14.0**.

### Core types
- **Flowchart** — process flows and decision trees
- **Sequence Diagram** — interaction sequences and message flows
- **Class Diagram** — object-oriented class relationships
- **State Diagram** — state machines and stateful flows
- **Entity Relationship (ER)** — database relationships
- **Gantt Chart** — project scheduling and timelines
- **Pie Chart** — proportional data visualization
- **Git Graph** — Git workflow and branching visualization
- **User Journey** — user experience flows
- **Requirement Diagram** — requirements and traceability
- **C4 Context** — system architecture diagrams

### New in Mermaid 10–11
- **Mindmap** — hierarchical mind mapping
- **Timeline** — chronological events and milestones
- **Sankey** — flow diagrams with proportional width
- **XY Chart** — scatter and line charts
- **Quadrant Chart** — four-quadrant analysis
- **Block Diagram** — block diagram structures
- **Architecture** — system architecture diagrams
- **Kanban** — Kanban board states
- **Packet** — network packet structures
- **Radar** — multi-variable comparison charts
- **Wardley Map** — business strategy mapping *(beta)*
- **TreeView** — tree structures
- **Ishikawa** — fishbone / cause-and-effect diagrams *(beta)*

---

## How to Use

### Method 1: The `<$mermaid>` widget

```html
<$mermaid text='
graph TD
    A --> B
    B --> C
'></$mermaid>
```

### Method 2: Block syntax

Use `$$$text/vnd.tiddlywiki.mermaid` and `$$$` as delimiters:

```
$$$text/vnd.tiddlywiki.mermaid
mindmap
  root((My Idea))
    Branch 1
      Sub-item A
    Branch 2
$$$
```

### Method 3: Tiddler type

Set a tiddler's type to `text/vnd.tiddlywiki.mermaid` and write diagram syntax directly:

```
timeline
    title Project Roadmap
    2024 : Discovery
    2025 : Build
    2026 : Launch
```

Then transclude it anywhere with `{{MyDiagramTiddler}}`.

---

## Development

### Running Tests

```bash
node --test
```

Tests cover widget rendering, typed parser behavior, lazy loading, and utility functions.

### Building the Demo

```bash
npm install -g tiddlywiki
tiddlywiki mermaid-tw5 --build index
cp mermaid-tw5/output/index.html docs/index.html
```

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards and the pull request process.

---

## Credits

This plugin is a continuation of earlier community efforts:

- <https://github.com/gt6796c/mermaid-tw5>
- <https://github.com/jasonmhoule/tw5-mermaid>
- <https://github.com/cedarvera/mermaid-tw5>
- <https://github.com/jceb/mermaid-tw5>
- <https://github.com/mermaid-js/mermaid>

Current maintenance by **asophila**.

---

## Notes

1. **Mermaid 11.14.0** (~3.0 MB) replaces the previous 9.3.0 (~0.9 MB). The size increase unlocks 10+ new diagram types. Lazy loading ensures pages *without* diagrams pay zero cost.
2. Some new diagram types (mindmap, timeline, block, etc.) use Mermaid's async renderer. The widget automatically falls back from sync to async rendering when needed.
3. D3 zoom (click to toggle pan/zoom) works for all compatible diagram types.
