---
phase: 02
slug: reliability-testing
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-26
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js built-in test runner (node:test + node:assert) |
| **Config file** | none |
| **Quick run command** | `node --test` |
| **Full suite command** | `node --test` |
| **Estimated runtime** | ~3 seconds |

---

## Sampling Rate

- **After every task commit:** Run `node --test`
- **After every plan wave:** Run `node --test`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | QUAL-01 | — | Error output is HTML-escaped | unit | `node --test` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | QUAL-01 | — | Invalid syntax produces error container | unit | `node --test` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | QUAL-02 | — | Plugin modules load without errors | unit | `node --test` | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 1 | QUAL-02 | — | Widget renders valid diagram to SVG | unit | `node --test` | ❌ W0 | ⬜ pending |
| 02-02-03 | 02 | 1 | QUAL-02 | — | Parser produces correct tree structure | unit | `node --test` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/helpers/tw-bootstrap.js` — minimal TW mock for module loading
- [ ] `tests/helpers/dom-mock.js` — minimal DOM mock for widget rendering
- [ ] `tests/wrapper.test.js` — widget rendering and error handling tests
- [ ] `tests/typed-parser.test.js` — parser structure tests
- [ ] `tests/widget-tools.test.js` — rocklib utility tests

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual error styling in browser | QUAL-01 | CSS rendering requires real browser | Open TiddlyWiki with invalid mermaid syntax; verify error box has red border and padding |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
