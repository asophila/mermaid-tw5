# mermaid-tw5

*Last edited: 2026-04-27*

The mermaid-tw5 plugin is a wrapper for Mermaid (<https://mermaid.js.org>).

TiddlyWiki notebook including the plugin: <http://efurlanm.github.io/mermaid-tw5> . You can install the plugin by navigating to the site and dragging the plugin link to your TiddlyWiki.

I'm not the author of the plugin, I just got what I was already ready, and updated the mermaid.min.js. All credits are from the original authors:

* <http://github.com/gt6796c/mermaid-tw5>
* <http://github.com/jasonmhoule/tw5-mermaid>
* <http://github.com/cedarvera/mermaid-tw5>
* <http://github.com/jceb/mermaid-tw5>
* <https://github.com/mermaid-js/mermaid>
* and others

## Supported Diagram Types

The plugin uses **Mermaid 11.14.0** and supports all of the following diagram types:

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
- **Mindmap** — hierarchical mind mapping *(Mermaid 10+)*
- **Timeline** — chronological events and milestones *(Mermaid 10+)*
- **Sankey** — flow diagrams with proportional width *(Mermaid 10+)*
- **XY Chart** — scatter and line charts *(Mermaid 10+)*
- **Quadrant Chart** — four-quadrant analysis *(Mermaid 10+)*
- **Block Diagram** — block diagram structures *(Mermaid 11+)*
- **Architecture** — system architecture diagrams *(Mermaid 11+)*
- **Kanban** — Kanban board states *(Mermaid 11+)*
- **Packet** — network packet structures *(Mermaid 11+)*
- **Radar** — multi-variable comparison charts *(Mermaid 11+)*
- **Wardley Map** — business strategy mapping *(Mermaid 11+, beta)*
- **TreeView** — tree structures *(Mermaid 11.14+)*
- **Ishikawa** — fishbone / cause-and-effect diagrams *(Mermaid 11.13+, beta)*

## Development

### Running Tests

This project uses Node.js built-in test runner. No npm install is required.

```bash
node --test
```

Tests live in the `tests/` directory and cover widget rendering, typed parser behavior, and utility functions.

### Building the Demo

The demo site is a pre-built TiddlyWiki hosted on GitHub Pages. To rebuild it locally:

```bash
npm install -g tiddlywiki
tiddlywiki mermaid-tw5 --build index
cp mermaid-tw5/output/index.html docs/index.html
```

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for coding standards and the pull request process.

## Notes

1. The plugin uses **Mermaid 11.14.0** (~3.0 MB). This is a significant increase from the previous 9.3.0 (~0.9 MB), but enables 10+ new diagram types including mindmaps, timelines, Sankey diagrams, XY charts, and more.
2. Libraries are loaded **lazily** — pages without diagrams do not load `mermaid.min.js` or `d3.v6.min.js` until the first diagram is rendered.
3. The D3 zoom interaction (click to toggle pan/zoom) is preserved for all compatible diagram types.
