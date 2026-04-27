---
phase: 05-developer-experience
plan: 02
status: complete
commit: 8ec3ba4
---

# Plan 05-02: Developer Documentation

## What Changed

- Added `## Development` section to `README.md` with test instructions, demo build instructions, and link to `CONTRIBUTING.md`
- Created `CONTRIBUTING.md` at project root with coding standards, PR process, and issue reporting guidelines

## Decisions Applied

- README gets quick-start dev info; CONTRIBUTING.md gets full guidelines (D-13, D-14)
- Coding standards reference CONVENTIONS.md: 4-space indent, let/var consistency, single quotes, semicolons, no console.log (D-15)
- PR checklist: tests pass, no new console.log, consistent style, describe changes (D-16)
- Branch naming: `feature/description` or `fix/description` (D-18)
- README links to CONTRIBUTING.md (D-20)

## Verification

- `README.md` contains `## Development` with `node --test` and build instructions
- `CONTRIBUTING.md` exists with coding standards, PR process, and issue reporting
- Original README content preserved

## Notes

- CONTRIBUTING.md does not require npm for the plugin itself; npm is only mentioned for installing the `tiddlywiki` CLI to build the demo
