# Phase 2: Reliability & Testing — Research

**Researched:** 2026-04-26
**Researcher:** orchestrator (auto-mode, non-interactive)

---

## Domain: Testing TiddlyWiki Plugins Without npm

The project has no `package.json`, no npm, no bundler. Tests must run with only Node.js built-ins.

### TiddlyWiki Module System

TiddlyWiki plugins are IIFE-wrapped CommonJS modules. Each module:
- Runs in an IIFE: `(function() { 'use strict'; ... exports.x = X; })()`
- Uses a global `require()` function that resolves module titles like `$:/plugins/orange/mermaid-tw5/widget-tools.js`
- Uses `exports` to expose values
- Expects `$tw` global to exist with wiki store, utils, and module registry

In Node.js, TW bootstraps itself via `require('./tiddlywiki/boot/boot.js').TiddlyWiki()` which creates the `$tw` global and module system.

### Testing Approach

**Option A: Mock `$tw` and `require` manually**
- Create a minimal `$tw` object with `wiki` (Tiddler store), `utils`, `modules` registry
- Implement a `require()` that maps TW title paths to local files
- Pros: Fast, no external dependencies, fully headless
- Cons: Need to understand TW internals

**Option B: Bootstrap full TiddlyWiki in Node.js**
- Load `tiddlywiki/boot/boot.js` and run the boot process
- Pros: Most realistic environment
- Cons: Requires tiddlywiki npm package or git clone; slower startup; overkill for unit tests

**Recommended: Option A** — The plugin code is small (3 JS files, ~400 lines total). A minimal mock is sufficient and aligns with the no-build-tools constraint.

### Minimal `$tw` Mock Requirements

For `wrapper.js`:
- `$tw.wiki.getTiddler(title)` / `$tw.wiki.tiddlerExists(title)` — for `getOptions`
- `$tw.wiki.getTiddlerData(title)` — for data tiddler options
- `$tw.modules.execute(moduleName, moduleRoot)` — for TW `require()`

For `typed-parser.js`:
- Just `exports` — no `$tw` dependency

For `widget-tools.js`:
- `$tw.wiki.getTiddler(title)` — for option loading
- `$tw.wiki.tiddlerExists(title)` — for data tiddler check

### DOM Mocking

`wrapper.js` uses `document.createElement()`, `div.innerHTML`, `addEventListener`. In Node.js tests:
- Use `jsdom` from npm — rejected (no npm allowed)
- Use a minimal hand-rolled DOM mock — preferred
- A 30-line mock providing `createElement`, `innerHTML`, `innerText`, `setAttribute`, `addEventListener`, `insertBefore` is sufficient

### Node.js Test Runner Patterns

`node --test` (stable since Node 18):
- Files matching `*.test.js` are auto-discovered
- `describe`/`it` via `node:test` (Node 20+)
- Assertions via `node:assert`
- Exit code reflects pass/fail — CI-friendly

Example:
```javascript
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('MermaidParser', () => {
  it('creates correct tree structure', () => {
    const parser = new MermaidParser('text/vnd.tiddlywiki.mermaid', 'graph TD; A-->B', {});
    assert.strictEqual(parser.tree[0].type, 'mermaid');
  });
});
```

### Error Handling Patterns

Current: `catch (ex) { divNode.innerText = ex; }`

Better approach:
- Build error HTML string in catch block
- Use template literal for readability
- Include user-friendly prefix + source preview + collapsible details

Example structure:
```javascript
const errorHtml = `
  <div style="border-left:3px solid #ff4444;background:#fff0f0;padding:8px 12px;">
    <strong>⚠ Diagram Error</strong>
    <p>The diagram could not be rendered. Check your Mermaid syntax.</p>
    <pre>${escapeHtml(scriptBody)}</pre>
    <details><summary>Technical details</summary>${escapeHtml(ex.message)}</details>
  </div>
`;
divNode.innerHTML = errorHtml;
```

Need a minimal `escapeHtml` utility to prevent XSS from error injection.

## Validation Architecture

> Nyquist Dimension 8: Validation & Verification

Since this phase introduces tests, validation is self-reinforcing:
- Plan 1 (error handling) is validated by the test suite added in Plan 2
- Test suite is validated by running `node --test` and observing exit code 0
- No external validation dependencies needed

## Threat Model

No security threats introduced by this phase. Error handling improvements reduce XSS surface (escaping error output instead of raw `innerText = ex`).
