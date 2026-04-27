# Mermaid.js Size Comparison

**Measured:** 2026-04-27
**Source:** jsDelivr CDN (`dist/mermaid.min.js` standalone UMD bundles)

| Version | File | Bytes | KB | Ratio vs 9.3.0 |
|---------|------|-------|----|----------------|
| 9.3.0 | `dist/mermaid.min.js` | 898,904 | 877.8 | 1.0× |
| 10.9.0 | `dist/mermaid.min.js` | 3,335,646 | 3,257.5 | 3.7× |
| 11.14.0 | `dist/mermaid.min.js` | 3,164,970 | 3,090.8 | 3.5× |
| 11.14.0 | `@mermaid-js/tiny/dist/mermaid.tiny.min.js` | 2,117,703 | 2,067.1 | 2.4× |

**Note:** Bundlephobia reports v11.14.0 as ~624 KB. This measures the npm package's contribution to a tree-shaken webpack bundle, not the standalone UMD file. For this project (no build tools, vendored minified files), the standalone UMD size is the relevant metric.

## API Verification

### v9.3.0
- Export: `mermaidAPI` object via `require('...').mermaidAPI`
- Render: `mermaidAPI.render(id, source, callback)` — callback-based
- Initialize: `mermaidAPI.initialize(config)`

### v11.14.0
- Export: `mermaid` global only (no `mermaidAPI` exported from UMD bundle)
- Render: `mermaid.render(id, source)` — returns Promise resolving to `{ svg, bindFunctions }`
- Initialize: `mermaid.initialize(config)`
- `securityLevel: 'loose'`: OK

### Migration Impact on wrapper.js
- Change `require('...').mermaidAPI` → `require('...')` or use `global.mermaid`
- Change `mermaidAPI.initialize(...)` → `mermaid.initialize(...)`
- Change callback render to Promise: `mermaid.render(id, source).then(result => _insertSVG(result.svg, result.bindFunctions))`
- Estimated lines changed: ~15–25
