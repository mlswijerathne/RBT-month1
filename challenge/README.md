# Hearts Component Library — Month 1 Submission

**Participant:** Lakshitha Wijerathne
**Track:** Engineer
**Challenge:** Code Quality & Testing Foundations

---

## Submission Files

| File | Description |
|------|-------------|
| `lakshitha-wijerathne-month1-test-suite.zip` | All test files (unit, integration, E2E) |
| `lakshitha-wijerathne-month1-coverage-report.html` | Jest HTML coverage report |
| `lakshitha-wijerathne-month1-bug-fixes.md` | Bug documentation (5 bugs) |
| `lakshitha-wijerathne-month1-tdd-commits.md` | Git log showing TDD progression |

---

## Results Summary

### Test Coverage

| Metric | Result | Threshold |
|--------|--------|-----------|
| Statements | 100% | 80% |
| Branches | 95.74% | 80% |
| Functions | 100% | 80% |
| Lines | 100% | 80% |

### Test Suites

| Suite | Tests | Status |
|-------|-------|--------|
| Alert | 8 | Passed |
| Button | 12 | Passed |
| Card | 11 | Passed |
| Dropdown | 8 | Passed |
| Input | 10 | Passed |
| Modal | 10 | Passed |
| Tabs | 8 | Passed |
| Toggle | 9 | Passed |
| Bug fixes (components) | 5 | Passed |
| Integration | 6 | Passed |
| **Total** | **87** | **All passed** |

### Cypress E2E

| Spec | Tests | Status |
|------|-------|--------|
| app.cy.ts | 10 | All passed |

---

## Bugs Fixed (TDD)

| # | Component | Bug | Fix |
|---|-----------|-----|-----|
| 1 | Button | `disabled` prop not preventing clicks | Added `disabled={disabled \|\| loading}` to `<button>` |
| 2 | Button | Loading state missing `aria-busy` | Added `aria-busy={loading \|\| undefined}` |
| 3 | Toggle | `onChange` callback never called | Added `onChange?.(!isChecked)` in `handleClick` |
| 4 | Tabs | `onChange` passing 1-based index | Changed `onChange?.(index + 1)` to `onChange?.(index)` |
| 5 | Input | `aria-describedby` containing `"undefined"` | Guarded attribute with `error && id` check |

Full details in `lakshitha-wijerathne-month1-bug-fixes.md`.

---

## How to Run

### Install dependencies
```bash
npm install
```

### Run unit and integration tests
```bash
npm test
```

### Run with coverage report
```bash
npm run test:coverage
```

### Run Cypress E2E tests
```bash
npm run dev          # start dev server first
npm run cypress:run  # run E2E headless
```

### View component demos
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

---

## Components

| # | Component | Location |
|---|-----------|----------|
| 1 | Button | `src/components/Button/` |
| 2 | Input | `src/components/Input/` |
| 3 | Modal | `src/components/Modal/` |
| 4 | Card | `src/components/Card/` |
| 5 | Dropdown | `src/components/Dropdown/` |
| 6 | Toggle | `src/components/Toggle/` |
| 7 | Alert | `src/components/Alert/` |
| 8 | Tabs | `src/components/Tabs/` |

## Tech Stack

- React 18 + TypeScript
- Jest 30 + React Testing Library
- Cypress 15
- Vite 6
