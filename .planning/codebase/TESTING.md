---
mapped_date: 2026-04-26
last_mapped_commit: 
---

# Testing

## Overview

mermaid-tw5 has **no formal test suite**. There are no test files, no test runner configuration, and no automated testing infrastructure.

## Current Testing Approach

Testing is entirely **manual and visual**:

1. **Example tiddlers as test cases**: The ~100+ example tiddlers in `mermaid-tw5/tiddlers/` serve as informal regression tests. Each demonstrates a specific Mermaid diagram type or feature.
2. **Visual verification**: Tests are performed by opening the TiddlyWiki in a browser and visually confirming diagrams render correctly.
3. **GitHub Pages as staging**: The `docs/index.html` build is used to verify the plugin works in a real TiddlyWiki environment.

## Test Coverage

| Aspect | Status | Notes |
|--------|--------|-------|
| Unit tests | ❌ None | No test framework, no unit tests |
| Integration tests | ❌ None | No automated integration tests |
| Visual regression tests | ❌ None | No screenshot comparison |
| Manual testing | ✅ Ad-hoc | Via example tiddlers and GitHub Pages |
| Browser compatibility tests | ❌ None | Not formally tested across browsers |
| Node.js tests | ❌ None | TW for Node.js compatibility is manually verified |

## Example Tiddlers (Informal Test Cases)

The following tiddlers exercise different Mermaid features:

### Flowcharts
- `Flowchart` — Basic flowchart
- `Larger flowchart with some styling` — Styled nodes and edges
- `Subgraph 1` through `Subgraph 4` — Subgraph nesting
- `Setting the direction of the diagram 1/2` — Direction control

### Sequence Diagrams
- `Basic sequence diagram`
- `sequenceDiagram 1/2/3`
- `sequenceDiagram break`
- `sequenceDiagram critical region`
- `sequenceNumbers`
- `Actors`, `Notes 1/2`, `Loops`, `Concurrency`

### Class Diagrams
- `Class diagrams`
- `Relationships`
- `Cardinality / Multiplicity on relations`
- `Defining Relationship`

### State Diagrams
- `stateDiagram 1/2/3`
- `Composite states`
- `Start and End`
- `Choice`
- `Forks`

### Other Diagram Types
- `Gantt 1`, `Gantt 2`, `Gantt #1367` — Gantt charts
- `Gitgraph Diagram 1/2` — Git graphs
- `Pie chart diagrams` — Pie charts
- `User Journey Diagram` — User journeys
- `C4 Diagram` — C4 architecture diagrams
- `Requirement Diagram` — Requirement diagrams
- `Automata`, `Automata 2/3/4` — State machines
- `Data Flow Diagram #1893` — Data flow diagrams

### Interactive Features
- `Examples of clickable links to navigate within TW` — Click events
- Various zoom/pan demos (implicitly tested via click interaction)

## Known Issues (Documented)

File: `mermaid-tw5/tiddlers/Issues.tid`

1. **Font rendering in cardinality diagrams** — Also occurs in mermaid-live-editor, upstream issue
2. **Font rendering in styled flowcharts** — TW-specific, may be related to CSS conflicts
3. **Source map warning in browser console** — Missing `mermaid.min.js.map`; safe to ignore per community

## Testing Infrastructure Gaps

The following would improve reliability but are absent:

- **Unit test framework** (Jest, Mocha, or TiddlyWiki's own test framework)
- **Browser automation** (Playwright, Puppeteer, Selenium)
- **Visual diff testing** for diagram rendering
- **CI pipeline** (GitHub Actions) to test on multiple browsers
- **Node.js smoke tests** for TW on Node.js compatibility

## Recommendation

Given the project's nature (a thin wrapper around Mermaid.js), the highest-value tests would be:
1. **Smoke tests** that verify the plugin loads without errors in TiddlyWiki
2. **Integration tests** that render a few diagram types and verify SVG output
3. **Regression tests** for the known font rendering issues
