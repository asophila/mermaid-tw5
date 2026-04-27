---
mapped_date: 2026-04-26
last_mapped_commit: 
---

# Coding Conventions

## Style

The codebase uses an older JavaScript style consistent with TiddlyWiki 5 conventions and pre-ES6 era code.

### Language Version

- **ES5 with some ES6 features**: `var` is predominantly used, but `let` appears in newer additions (v0.3.8)
- **No transpilation**: Code runs directly in the browser/Node.js
- **Strict mode**: All modules begin with `'use strict';`

### Naming

| Construct | Convention | Examples |
|-----------|------------|----------|
| Constructor functions | PascalCase | `Rocklib`, `MermaidWidget`, `MermaidParser` |
| Variables / functions | camelCase | `uniqueID`, `scriptBody`, `getScriptBody`, `divNode` |
| Private/prototype methods | camelCase on prototype | `Rocklib.prototype.getCanvas` |
| TiddlyWiki module exports | Lowercase matching type | `exports.mermaid`, `exports.rocklib` |
| Tiddler titles | Title Case for display tiddlers | `HelloThere`, `Gitgraph Diagram 1` |

### Indentation & Formatting

- **Indentation**: 4 spaces (no tabs)
- **Braces**: Same-line opening brace for functions and control structures
- **Semicolons**: Present but usage is inconsistent (some lines missing, some with extra)
- **Line length**: No enforced limit; some lines exceed 100 characters

### Comments

- Multi-line block comments for file headers and JSDoc-style descriptions
- Inline comments for attribution and change notes:
  ```javascript
  // Add D3 library to support pan and zoom
  // by fkmiec 2023-05-21
  ```
- Section markers for logical blocks:
  ```javascript
  // START ZOOM LOGIC: Enable zooming the mermaid diagram with D3
  // ...
  //END ZOOM LOGIC
  ```

## Code Patterns

### TiddlyWiki Module Pattern

All source files follow TiddlyWiki's IIFE module pattern:

```javascript
(function() {
    'use strict';
    // module body
    exports.something = Something;
})();
```

### Widget Pattern

```javascript
let WidgetName = function(parseTreeNode, options) {
    this.initialise(parseTreeNode, options);
};
WidgetName.prototype = new Widget();
WidgetName.prototype.render = function(parent, nextSibling) { /* ... */ };
WidgetName.prototype.execute = function() { /* ... */ };
WidgetName.prototype.refresh = function(changedTiddlers) { return false; };
exports.widgetName = WidgetName;
```

### Error Handling

Simple try/catch with direct error display:

```javascript
try {
    // rendering logic
} catch (ex) {
    divNode.innerText = ex;
}
```

No structured error types, no logging framework beyond `console.log`/`console.error`.

### Console Logging

Debug logging is present in the zoom interaction code:
```javascript
console.log("Zoom enabled: " + isZoomEnabled);
console.log("Executing svg.each...");
```

These appear to be development artifacts left in production code.

## TiddlyWiki-Specific Conventions

### Meta Files

Every shadow tiddler has a `.meta` sidecar with TiddlyWiki fields:
```
module-type: widget
title: $:/plugins/orange/mermaid-tw5/wrapper.js
type: application/javascript
```

### Tiddler File Format

`.tid` files use a metadata header followed by a blank line:
```
title: $:/plugins/orange/mermaid-tw5/usage

!mermaid

Content here...
```

## Version Control

- Git repository with `main` branch
- No `.gitignore` present
- No CI/CD configuration files
- No commit message conventions documented

## No Linting / Formatting Tools

- No `.eslintrc`, `.prettierrc`, or similar config files
- No pre-commit hooks
- No automated code quality checks
- JSLint directives appear in comments: `// jslint node: true, browser: true`
