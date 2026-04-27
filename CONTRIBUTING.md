# Contributing to mermaid-tw5

Thank you for your interest in improving the mermaid-tw5 plugin!

## Getting Started

1. Fork the repository
2. Clone your fork
3. Run tests to ensure everything is working:
   ```bash
   node --test
   ```

## Coding Standards

We follow the conventions documented in the codebase. Key points:

- **Indentation:** 4 spaces (no tabs)
- **Quotes:** Single quotes for strings
- **Semicolons:** Use them consistently
- **Variable declarations:** Prefer `let` for new code; `var` is acceptable for consistency within existing functions
- **No debug logging:** Do not leave `console.log` or `console.error` in production code
- **Strict mode:** All modules begin with `'use strict';`

## Pull Request Process

1. Create a branch from `main` with a descriptive name:
   - `feature/description` for new capabilities
   - `fix/description` for bug fixes
2. Make your changes
3. Run tests locally: `node --test`
4. Ensure your code follows the coding standards above
5. Open a pull request to `main` with:
   - A clear description of what changed and why
   - Confirmation that tests pass
   - Note if the change affects the demo site (may need a rebuild)

## What to Expect

- Automated tests will run on your PR via GitHub Actions
- The demo site is rebuilt and deployed automatically when PRs are merged to `main`
- Reviews focus on correctness, consistency with existing patterns, and test coverage

## Reporting Issues

When reporting bugs, please include:
- TiddlyWiki version
- Browser and version (if applicable)
- Steps to reproduce
- Sample Mermaid syntax that triggers the issue
- Any error messages (text or screenshot)
