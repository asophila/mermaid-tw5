# Contributing to mermaid-tw5

Thank you for your interest in improving the mermaid-tw5 plugin!

## Getting Started

1. Fork the repository
2. Clone your fork
3. Run tests to make sure everything is working:
   ```bash
   node --test
   ```

## Coding Standards

- **Indentation:** 4 spaces (no tabs)
- **Quotes:** Single quotes for strings (double quotes are used in some older files — new code should use single)
- **Semicolons:** Use them consistently
- **Variable declarations:** `var` for compatibility with older TW5 environments
- **No debug logging:** Do not leave `console.log` statements in production code
- **Strict mode:** All modules begin with `'use strict';`

## Pull Request Process

1. Create a branch from `main` with a descriptive name:
   - `feature/description` for new capabilities
   - `fix/description` for bug fixes
2. Make your changes
3. Run tests locally: `node --test`
4. Ensure your code follows the coding standards above
5. Open a pull request to `main` with a clear description of what changed and why

## Reporting Issues

When reporting bugs, please include:

- TiddlyWiki version
- Browser and version (if applicable)
- Steps to reproduce
- Sample Mermaid syntax that triggers the issue
- Any error messages (text or screenshot)
