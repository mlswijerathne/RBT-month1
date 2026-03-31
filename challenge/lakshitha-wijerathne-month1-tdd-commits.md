# TDD Commit History — Month 1 Challenge

This document shows the red → green → refactor progression for each bug fix.

---

## Git Log

| Hash | Date | Message |
|------|------|---------|
| `f5dffc6` | 2026-02-24 | Initial commit: Add React component challenge codebase |
| `82e0287` | 2026-02-24 | Setup the Testing Environment |
| `bdd1ad7` | 2026-02-24 | write test cases |
| `de67fba` | 2026-03-30 | fix button disabled state |
| `3baacf5` | 2026-03-30 | fix toggle onChange callback |
| `f9896e0` | 2026-03-30 | fix tabs zero-based index |
| `c9bc568` | 2026-03-30 | fix input aria-describedby |
| `9610a38` | 2026-03-30 | fix failing test selectors |
| `f00c52b` | 2026-03-30 | add cypress e2e tests |
| `aa5a3eb` | 2026-03-30 | ignore coverage folder |
| `725671b` | 2026-03-30 | add bug fix documentation |

---

## TDD Cycle Per Bug

### Bug #1 & #2 — Button disabled/loading state

| Phase | Commit | Description |
|-------|--------|-------------|
| 🔴 Red | `bdd1ad7` | Wrote `Button.test.tsx` — tests for `disabled` and `loading` props fail because `<button>` has no HTML `disabled` attribute |
| 🟢 Green | `de67fba` | Added `disabled={disabled \|\| loading}` to `<button>` — both tests now pass |

---

### Bug #3 — Toggle onChange not called

| Phase | Commit | Description |
|-------|--------|-------------|
| 🔴 Red | `bdd1ad7` | Wrote `Toggle.test.tsx` — test for `onChange` callback fails because `handleClick` never calls `onChange` |
| 🟢 Green | `3baacf5` | Added `onChange?.(!isChecked)` inside `handleClick` — test now passes |

---

### Bug #4 — Tabs zero-based index

| Phase | Commit | Description |
|-------|--------|-------------|
| 🔴 Red | `bdd1ad7` | Wrote `Tabs.test.tsx` — test asserts `onChange` called with `1` when second tab clicked, fails because code passes `index + 1` |
| 🟢 Green | `f9896e0` | Changed `onChange?.(index + 1)` to `onChange?.(index)` — test now passes |

---

### Bug #5 — Input aria-describedby undefined

| Phase | Commit | Description |
|-------|--------|-------------|
| 🔴 Red | `bdd1ad7` | Wrote `components.test.tsx` — test asserts `aria-describedby` is null when no label, fails because value is `"undefined-error"` |
| 🟢 Green | `c9bc568` | Guarded `aria-describedby` and error span `id` with `error && id` — test now passes |

---

## Test Coverage Result

After all green phases completed:

```
Test Suites : 10 passed, 10 total
Tests       : 87 passed, 87 total
Statements  : 100%
Branches    : 95.74%
Functions   : 100%
Lines       : 100%
```

All thresholds exceed the required **80%** minimum.
