---
phase: 4
slug: dependency-modernization
status: draft
nyquist_compliant: false
wave_0_complete: true
created: 2026-04-27
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js built-in + shell commands |
| **Config file** | none |
| **Quick run command** | `node --test` |
| **Full suite command** | `node --test` |
| **Estimated runtime** | ~3 seconds |

---

## Sampling Rate

- **After every task commit:** Run `node --test` (ensures no regression in existing tests)
- **After every plan wave:** Run `node --test`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 4-01-01 | 01 | 1 | UPDT-01 | — | N/A | script | `ls -la /tmp/mermaid-*.min.js && wc -c /tmp/mermaid-*.min.js` | ✅ | ⬜ pending |
| 4-01-02 | 01 | 1 | UPDT-01 | — | N/A | script | `node -e "require('/tmp/mermaid-11.14.0.min.js')"` | ✅ | ⬜ pending |
| 4-02-01 | 02 | 1 | UPDT-01 | — | N/A | grep | `grep "Modern Mermaid" .planning/PROJECT.md` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. The Phase 2 test suite (`node --test`) provides regression protection.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| D3 zoom SVG structure compatibility | UPDT-01 | Requires actual browser rendering to verify zoom works with modern Mermaid SVG output | Load TiddlyWiki with candidate Mermaid version, render a flowchart, click to toggle zoom, verify pan/zoom functions |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
