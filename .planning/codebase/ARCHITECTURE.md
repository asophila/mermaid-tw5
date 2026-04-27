---
mapped_date: 2026-04-26
last_mapped_commit: 
---

# Architecture

## Pattern

mermaid-tw5 follows the **TiddlyWiki 5 Plugin Architecture**. It is a small, focused plugin that extends TiddlyWiki's widget and parser systems. There is no layered architecture, no dependency injection, and no framework beyond TiddlyWiki's own module system.

## Components

### 1. Mermaid Widget (`wrapper.js`)

File: `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_wrapper.js`

The main user-facing component. Registers as widget type `mermaid`.

**Responsibilities:**
- Renders Mermaid diagrams inside TiddlyWiki tiddlers
- Extracts diagram source text from widget attributes or child content
- Initializes mermaidAPI with configuration (theme, security level, flowchart options)
- Handles click-to-zoom interaction via D3.js
- Catches and displays rendering errors

**Key Methods:**
- `render(parent, nextSibling)` — DOM insertion and diagram rendering
- `execute()` — No-op (widget has no reactive state)
- `refresh(changedTiddlers)` — Returns `false` (no selective refresh)

**Data Flow:**
```
Tiddler content / widget attributes
    → rocklib.getScriptBody()  → raw mermaid syntax string
    → rocklib.getOptions()     → mermaid configuration object
    → mermaidAPI.initialize()  → configured renderer
    → mermaidAPI.render()      → SVG output
    → _insertSVG()             → DOM insertion
    → D3 zoom binding          → interactive pan/zoom
```

### 2. Typed Parser (`typed-parser.js`)

File: `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_typed-parser.js`

Registers a parser for MIME type `text/vnd.tiddlywiki.mermaid`.

**Responsibilities:**
- Allows tiddlers with type `text/vnd.tiddlywiki.mermaid` to contain raw mermaid syntax
- Wraps the tiddler body into a `mermaid` widget tree node
- Bypasses TiddlyWiki's WikiText parsing for mermaid content

**Data Flow:**
```
Tiddler body (raw mermaid syntax)
    → MermaidParser(type, text, options)
    → tree = [{type: "mermaid", tag: "$mermaid", text: text}]
    → Widget renderer
```

### 3. Widget Tools / Rocklib (`widget-tools.js`)

File: `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_widget-tools.js`

Internal utility library. Originally an external dependency, inlined in v0.3.5.

**Responsibilities:**
- `getScriptBody(src, attr)` — Extract raw text from widget parse tree, reversing WikiText parsing for links, entities, and elements
- `getOptions(src, tag, options)` — Merge options from tiddler fields (prefixed with tag name), widget attributes, and referenced data tiddlers
- `getCanvas(src, tag, type)` — Create DOM elements (div/canvas) with dimensions
- Color utilities (`nextColor`, `rgb_to_hsv`, `hsv_to_rgb`)

### 4. Bundled Libraries

- **mermaid.min.js** — The Mermaid.js rendering engine (v9.3.0)
- **d3.v6.min.js** — D3.js for SVG manipulation (pan/zoom)

## Data Flow (End-to-End)

### Usage via `<$mermaid>` Widget

```
User writes: <$mermaid text='graph TD; A-->B'></$mermaid>
    → TiddlyWiki parses WikiText
    → MermaidWidget.render() called
    → rocklib.getScriptBody() extracts "graph TD; A-->B"
    → rocklib.getOptions() reads config from fields/attributes
    → mermaidAPI.initialize({ securityLevel: 'loose', ... })
    → mermaidAPI.render(id, source, callback)
    → SVG inserted into DOM div
    → D3 zoom listener attached on click
```

### Usage via Mermaid Tiddler Type

```
User creates tiddler with type=text/vnd.tiddlywiki.mermaid
    → TiddlyWiki routes to MermaidParser
    → Parser wraps body in mermaid widget node
    → Widget render path (same as above)
```

### Usage via `$$$` Block Syntax

```
User writes: $$$text/vnd.tiddlywiki.mermaid\ngraph TD...$$$
    → TiddlyWiki recognizes typed block
    → Routes to MermaidParser
    → Same render path as above
```

## Security Configuration

The widget sets `securityLevel: 'loose'` in `mermaidAPI.initialize()` to support click event bindings in diagrams. This is a deliberate trade-off for interactivity.

## State Management

- **No reactive state**: The widget's `refresh()` always returns `false`
- **No state persistence**: Diagrams are re-rendered on full page refresh
- **Zoom state**: Stored in closure variables (`isZoomEnabled`, `zoomEventListenersApplied`) per widget instance

## Error Handling

Rendering errors are caught in a try/catch block and displayed as plain text inside the diagram container:

```javascript
try {
    // ... render logic
} catch (ex) {
    divNode.innerText = ex;
}
```

## Entry Points

| Entry Point | File | Description |
|-------------|------|-------------|
| Widget export | `wrapper.js` | `exports.mermaid = MermaidWidget` |
| Parser export | `typed-parser.js` | `exports["text/vnd.tiddlywiki.mermaid"] = MermaidParser` |
| Library export | `widget-tools.js` | `exports.rocklib = Rocklib` |
| Plugin manifest | `plugin.info` | TiddlyWiki plugin descriptor |
