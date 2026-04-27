# mermaid-tw5 — Project Instructions

This project uses the GSD (Get Shit Done) workflow. All planning artifacts live in `.planning/`.

## Project Context

- **Type:** TiddlyWiki 5 plugin (client-side JavaScript, no build pipeline)
- **Core Value:** TiddlyWiki users can create and view rich Mermaid diagrams natively within their notebooks
- **Current Phase:** Not started (initialized 2026-04-26)
- **Milestone:** Milestone 1 (v0.4.0) — Code quality, reliability, performance

## Technology Stack

- **Host:** TiddlyWiki 5 (v5.3.3)
- **Languages:** JavaScript, TiddlyWiki tiddler format, JSON
- **Dependencies:** Mermaid.js 9.3.0 (vendored), D3.js v6 (vendored)
- **No npm / build tools:** Manual dependency management

## Key Constraints

1. **Bundle size:** Plugin must remain reasonable relative to empty TW (~2.4 MB)
2. **Compatibility:** Must work in browser and Node.js TiddlyWiki environments
3. **No build pipeline:** Prefer solutions that don't require introducing npm/webpack

## Fragile Areas (Handle With Care)

1. `getScriptBody()` in `widget-tools.js` — WikiText un-parsing is buggy and hard to maintain
2. D3 zoom integration — complex DOM event handling
3. TiddlyWiki internal APIs — relies on `$tw` globals

## Workflow Commands

- `/gsd-discuss-phase 1` — Gather context before planning
- `/gsd-plan-phase 1` — Create detailed plan for Phase 1
- `/gsd-execute-phase 1` — Execute Phase 1 plans
- `/gsd-verify-work` — Verify deliverables against requirements
- `/gsd-progress` — Check project status

## File Locations

| Artifact | Path |
|----------|------|
| Project context | `.planning/PROJECT.md` |
| Requirements | `.planning/REQUIREMENTS.md` |
| Roadmap | `.planning/ROADMAP.md` |
| State tracker | `.planning/STATE.md` |
| Config | `.planning/config.json` |
| Codebase map | `.planning/codebase/` |

## GSD Rules

1. Always read `.planning/STATE.md` and `.planning/PROJECT.md` at session start
2. Update STATE.md after every phase transition
3. Commit planning docs alongside code changes
4. Run `/gsd-verify-work` after executing phases
5. Prefer minimal changes — this is a small, stable plugin
