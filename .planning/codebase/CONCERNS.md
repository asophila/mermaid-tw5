---
mapped_date: 2026-04-26
last_mapped_commit: 
---

# Concerns

## Security

### `securityLevel: 'loose'`

File: `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_wrapper.js` (line 65)

The widget explicitly sets `securityLevel: 'loose'` in `mermaidAPI.initialize()` to support click event bindings on diagram elements. This is a deliberate trade-off that:
- **Enables**: Interactive diagrams with clickable links and navigation within TiddlyWiki
- **Risks**: Allows JavaScript execution within Mermaid diagrams, which could be exploited if untrusted content is rendered

**Mitigation**: The plugin is intended for personal/single-user TiddlyWiki notebooks where the user controls all content. Not recommended for multi-user or untrusted-content scenarios without review.

### No Content Security Policy

There is no CSP configuration. The plugin injects raw SVG into the DOM via `divNode.innerHTML = svgCode`, which is standard for Mermaid but carries the usual XSS risks if diagram source is attacker-controlled.

## Technical Debt

### 1. Outdated Mermaid Version

- **Current**: mermaid 9.3.0 (released ~2022)
- **Latest upstream**: 10.x+ (as of 2024)
- **Blocker**: mermaid 10.9.0 is 3.2 MB minified, vs 0.9 MB for 9.3.0 — considered too large relative to empty TiddlyWiki (2.4 MB)
- **Status**: Tracked upstream at https://github.com/mermaid-js/mermaid/issues/4616 (lite version request)
- **Risk**: Missing security patches, bug fixes, and new diagram types from upstream

### 2. Debug Code in Production

File: `mermaid-tw5/plugins/mermaid-tw5/$__plugins_mermaid-tw5_wrapper.js`

Multiple `console.log()` statements remain in the zoom interaction code (lines 49-52, 73, 75, 77):
```javascript
console.log("calling bindFunctions");
console.log("done calling bindFunctions");
console.log("Zoom enabled: " + isZoomEnabled);
```

These are development artifacts that should be removed or gated behind a debug flag.

### 3. Commented-Out Dead Code

Lines 25-29 contain commented-out Node.js/browser detection logic from a previous version. Should be removed to reduce confusion.

### 4. Mixed `var` and `let`

The codebase uses `var` predominantly but newer additions (zoom logic, D3 integration) use `let`. No consistent style. While functional, it indicates incremental changes without a style guide.

### 5. No Input Sanitization

The `getScriptBody()` function attempts to "un-parse" WikiText, but this is described in the usage docs as "twitchy difficult to maintain and buggy." There is no robust sanitization of user input before passing to mermaidAPI.render().

## Bugs & Known Issues

### Documented in `Issues.tid`

1. **Font rendering glitch in cardinality diagrams** — Occurs in mermaid-live-editor too, likely upstream bug
2. **Font rendering glitch in styled flowcharts** — TW-specific, potentially CSS-related
3. **Browser console source map warning** — Missing `mermaid.min.js.map`; harmless but noisy

### Error Handling Weakness

Rendering errors are caught and displayed as plain text:
```javascript
catch (ex) {
    divNode.innerText = ex;
}
```

This is a poor user experience and leaks exception details to the UI. No user-friendly error messages.

## Performance

### Bundle Size

| Component | Size |
|-----------|------|
| mermaid.min.js | ~899 KB |
| d3.v6.min.js | ~271 KB |
| Plugin JS source | ~15 KB |
| **Total plugin** | **~1.2 MB** |

The plugin increases TiddlyWiki file size by ~46%. The maintainer is aware and intentionally stayed on an older mermaid version to control size.

### No Lazy Loading

Both mermaid.js and D3.js are loaded eagerly via TiddlyWiki's `require()` system. There is no lazy loading or code splitting. Even pages without diagrams load the full libraries.

## Maintenance Risks

### Single Maintainer

- Primary maintainer: E Furlan
- Based on forks of multiple earlier efforts
- Infrequent updates (last release: 2024-03-18)
- No automated dependency update process

### No Test Suite

See `TESTING.md`. Manual testing only. Regressions are likely to go undetected.

### No CI/CD

- No GitHub Actions
- No automated build verification
- No automated deployment to GitHub Pages
- `docs/index.html` appears to be manually built and committed

## Fragile Areas

1. **WikiText un-parsing** (`getScriptBody`) — Described by the original author as "of dubious value" and "twitchy difficult to maintain and buggy"
2. **D3 zoom integration** — Complex DOM manipulation with event listeners; click-to-toggle zoom is an unconventional UX pattern
3. **TiddlyWiki internal APIs** — Relies on `$tw` globals and TiddlyWiki module system internals, which may change between TW versions
4. **mermaidAPI internal API** — Uses `mermaidAPI.render(id, source, callback)` which may have signature changes in newer mermaid versions

## Documentation Gaps

- No developer setup instructions
- No contribution guidelines
- No changelog file (changelog is embedded in `HelloThere.tid`)
- No API documentation for the widget attributes and options
