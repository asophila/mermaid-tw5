# Phase 4: Dependency Modernization — Research

**Researched:** 2026-04-27
**Researcher:** orchestrator (auto-mode, non-interactive)

---

## Domain: Modern Mermaid.js Versions (10.x, 11.x)

### Bundle Size Investigation

The critical constraint for this phase is bundle size. The current bundled `mermaid.min.js` (v9.3.0) is **~899 KB**. The project has no build pipeline, so libraries must be used as pre-built standalone files (UMD/IIFE), not as npm packages that get tree-shaken by a bundler.

**Actual downloaded file sizes from jsDelivr CDN:**

| Version | File | Size | Ratio vs 9.3.0 |
|---------|------|------|----------------|
| 9.3.0 | `dist/mermaid.min.js` | **898,905 bytes (~899 KB)** | 1.0× (baseline) |
| 10.9.0 | `dist/mermaid.min.js` | **3,335,646 bytes (~3.34 MB)** | 3.7× |
| 11.0.0 | `dist/mermaid.min.js` | **2,334,234 bytes (~2.33 MB)** | 2.6× |
| 11.4.0 | `dist/mermaid.min.js` | **2,571,838 bytes (~2.57 MB)** | 2.9× |
| 11.14.0 | `dist/mermaid.min.js` | **3,164,970 bytes (~3.16 MB)** | 3.5× |
| 11.14.0 | `@mermaid-js/tiny/dist/mermaid.tiny.min.js` | **2,117,703 bytes (~2.12 MB)** | 2.4× |

**Key finding:** Bundlephobia reports mermaid v11.14.0 as **623.7 KB minified**. This figure is misleading for this project. Bundlephobia measures the npm package's *contribution* to a tree-shaken webpack bundle (where shared dependencies are deduplicated and unused code is eliminated). The standalone `dist/mermaid.min.js` UMD bundle includes all dependencies inline and is **~3.16 MB** — more than 5× the Bundlephobia figure.

**Size history:** Per GitHub discussion [#4314](https://github.com/orgs/mermaid-js/discussions/4314), Mermaid bundle size jumped 3× from v9.3.0 (~878 KB) to v9.4.0 (~2.65 MB) and has remained in the 2.3–3.3 MB range since.

### Lite Build Investigation

- **Upstream issue [#4616](https://github.com/mermaid-js/mermaid/issues/4616)** (lite version request) is **still open** as of 2026.
- **`@mermaid-js/tiny`** exists as a smaller subset but:
  - Is still **~2.12 MB** (more than 2× current)
  - Does **not** support Mindmap, Architecture diagrams, KaTeX rendering, or lazy loading
  - Is designed for CDN use, not as a drop-in replacement
  - The official docs recommend using the full library unless there is a "very specific reason to reduce bundle size"
- **No custom build pipeline** is available in this project (no npm, no bundler, no rollup)

### API Compatibility Investigation

**Current API (v9.3.0):**
```javascript
var mermaidAPI = require('.../mermaid.min.js').mermaidAPI;
mermaidAPI.initialize({ securityLevel: 'loose', ... });
mermaidAPI.render(id, source, callback);  // callback(svgCode, bindFunctions)
```

**Modern API (v10+, v11+):**
- `mermaidAPI` is **deprecated for direct use** and is no longer exported from the UMD bundle
- The UMD bundle exports only a global `mermaid` object
- `mermaid.initialize(config)` — initialization (same semantics)
- `mermaid.render(id, source)` — returns a **Promise** resolving to `{ svg, bindFunctions }`
- `mermaid.parse(text)` — async, returns Promise

**Migration impact on `wrapper.js`:**
1. Change `require('...').mermaidAPI` → `require('...')` (the module exports `mermaid` directly)
2. Change `mermaidAPI.initialize(...)` → `mermaid.initialize(...)`
3. Change callback-based `mermaidAPI.render(id, source, _insertSVG)` → Promise-based:
   ```javascript
   mermaid.render(id, source).then(function(result) {
       _insertSVG(result.svg, result.bindFunctions);
   });
   ```
4. TiddlyWiki's `render()` method is synchronous; using Promises inside it is acceptable as long as the DOM insertion happens in the `.then()` handler

**Estimated wrapper.js changes:** ~15–25 lines (well under the 50-line threshold from D-14)

### `securityLevel` Compatibility

`securityLevel: 'loose'` is **still supported** in v10+ and v11+. The official docs explicitly state it is required for click functionality, which the plugin depends on.

### D3 Zoom Integration

Unknown risk. Modern Mermaid still outputs SVG, but the internal SVG structure may have changed. The D3 zoom code wraps the SVG's inner HTML in a `<g>` element:
```javascript
svg.html('<g>' + svg.html() + '</g>');
```
This assumes the SVG root contains plain child elements. If modern Mermaid wraps content differently, the zoom logic may break. This would require hands-on testing with actual renders.

### UMD/IIFE Availability

Mermaid still provides `dist/mermaid.min.js` as a UMD bundle. It is compatible with TiddlyWiki's synchronous `require()` system. No ESM migration is required.

---

## Validation Architecture

> Nyquist Dimension 8: Validation & Verification

Validation for this phase is straightforward:
- File size measurements are objective (byte counts)
- API compatibility can be verified by loading the bundle in a Node.js script and checking exported methods
- The deferral/adoption decision is documented in PROJECT.md and is human-reviewable

## Threat Model

No security threats introduced by this phase. The plugin does not change its `securityLevel: 'loose'` configuration. Investigating modern versions does not modify production code.
