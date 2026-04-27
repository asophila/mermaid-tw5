# Plan 04-01 Summary: Evaluate Candidate Mermaid Versions

**Phase:** 04-dependency-modernization
**Plan:** 01
**Executed:** 2026-04-27
**Status:** Complete

## What Was Done

1. **Downloaded three candidate Mermaid.js versions** to `/tmp/`:
   - Mermaid 10.9.0: `dist/mermaid.min.js`
   - Mermaid 11.14.0: `dist/mermaid.min.js`
   - @mermaid-js/tiny v11: `dist/mermaid.tiny.min.js`

2. **Measured exact file sizes**:
   | Version | Bytes | KB | Ratio vs 9.3.0 |
   |---------|-------|----|----------------|
   | 9.3.0 (baseline) | 898,904 | 877.8 | 1.0× |
   | 10.9.0 | 3,335,646 | 3,257.5 | 3.7× |
   | 11.14.0 | 3,164,970 | 3,090.8 | 3.5× |
   | 11.14.0 tiny | 2,117,703 | 2,067.1 | 2.4× |

3. **Verified API signatures** using `vm.runInThisContext` in Node.js (v11 UMD bundle requires browser DOM; pure `require()` fails due to esbuild namespace issue):
   - v9.3.0 exports `mermaidAPI` object with callback-based `render(id, source, callback)`
   - v11.14.0 exports `mermaid` global only with Promise-based `render(id, source)` → `{ svg, bindFunctions }`
   - v11.14.0 `initialize()` accepts `securityLevel: 'loose'` without error

4. **Created `04-SIZE-COMPARISON.md`** with size table and API verification section.

5. **Ran test suite** — all 13 tests pass, no regressions.

## Key Findings

- All modern Mermaid versions exceed the 1.5 MB deferral threshold.
- The smallest candidate (@mermaid-js/tiny at ~2.07 MB) is still 2.4× larger than current v9.3.0.
- API migration is feasible (~15–25 lines in wrapper.js) but size alone blocks adoption.
- No lite build available upstream (mermaid-js/mermaid#4616 still open).

## Acceptance Criteria

- [x] `/tmp/mermaid-10.9.0.min.js` exists and is > 3,000,000 bytes (3,335,646)
- [x] `/tmp/mermaid-11.14.0.min.js` exists and is > 3,000,000 bytes (3,164,970)
- [x] `/tmp/mermaid-tiny-11.min.js` exists and is > 2,000,000 bytes (2,117,703)
- [x] `04-SIZE-COMPARISON.md` exists with complete markdown table
- [x] Table includes exact byte counts for each file
- [x] `04-SIZE-COMPARISON.md` contains API Verification section
- [x] API section documents v9.3.0 exports `mermaidAPI`
- [x] API section documents v11.14.0 exports `mermaid` global only
- [x] API section documents v11.14.0 `render()` returns Promise
- [x] API section documents v11.14.0 `securityLevel: 'loose'` is accepted
- [x] Migration impact (~15–25 lines) documented
- [x] `node --test` exits with code 0 (13/13 tests pass)
