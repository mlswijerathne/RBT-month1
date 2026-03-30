# Bug Fix Documentation — Month 1 Challenge

## Bug #1: Button disabled prop does not prevent clicks

- **Location:** `src/components/Button/Button.tsx:21`
- **Symptom:** Button with `disabled` prop looks visually disabled (CSS class applied) but is still clickable and fires the `onClick` handler
- **Root Cause:** The `<button>` element was missing the HTML `disabled` attribute. Only a CSS class `btn-disabled` was applied, which styled the button but did not stop browser interactions
- **Test Written:** `"respects disabled prop"` — renders a disabled button, clicks it, asserts `toBeDisabled()` and that `onClick` was not called
- **Fix Applied:** Added `disabled={disabled || loading}` to the `<button>` element so the native HTML disabled behaviour is enforced

---

## Bug #2: Button loading prop does not disable interactions

- **Location:** `src/components/Button/Button.tsx:21`
- **Symptom:** Button in loading state shows a spinner and "Loading..." text but remains clickable, allowing duplicate form submissions
- **Root Cause:** Same as Bug #1 — the `loading` prop only swapped the button content, it never set the HTML `disabled` attribute
- **Test Written:** `"shows loading state and disables interactions"` — renders a loading button, clicks it, asserts `toBeDisabled()` and that `onClick` was not called
- **Fix Applied:** Same fix as Bug #1 — `disabled={disabled || loading}` covers both cases in one attribute

---

## Bug #3: Toggle onChange callback never called on click

- **Location:** `src/components/Toggle/Toggle.tsx:20`
- **Symptom:** Clicking the toggle switches the visual state but the `onChange` prop is never invoked, so parent components cannot react to the change
- **Root Cause:** `handleClick` called `setInternalChecked(!isChecked)` to update local state but never called the `onChange` callback
- **Test Written:** `"renders with label and toggles"` — renders a Toggle with an `onChange` mock, clicks the switch, asserts `onChange` was called with `true`
- **Fix Applied:** Added `onChange?.(!isChecked)` inside `handleClick` after the state update

---

## Bug #4: Tabs onChange receives 1-based index instead of 0-based

- **Location:** `src/components/Tabs/Tabs.tsx:19`
- **Symptom:** When clicking the second tab, `onChange` is called with `2` instead of `1`. Parent components using the index to drive state (e.g. `activeIndex`) get the wrong value
- **Root Cause:** `handleTabClick` passed `index + 1` to `onChange` instead of `index`. Array indices are 0-based so clicking the second tab (index `1`) incorrectly reported `2`
- **Test Written:** `"renders default tab and switches on click, onChange receives zero-based index"` — clicks the second tab and asserts `onChange` was called with `1`
- **Fix Applied:** Changed `onChange?.(index + 1)` to `onChange?.(index)`

---

## Bug #5: Input aria-describedby contains literal string "undefined"

- **Location:** `src/components/Input/Input.tsx:47`
- **Symptom:** When an `Input` has an error but no `label`, the rendered HTML contains `aria-describedby="undefined-error"` — an invalid accessibility attribute pointing to a non-existent element
- **Root Cause:** The component derives its `id` from the `label` prop: `const id = label ? \`input-\${...}\` : undefined`. When `label` is absent, `id` is `undefined`. Template literal interpolation then produced the string `"undefined-error"` instead of omitting the attribute
- **Test Written:** `"when no label is provided, aria-describedby should not contain 'undefined'"` — renders an Input with an error but no label, asserts `aria-describedby` is `null` (attribute not present)
- **Fix Applied:** Guarded both `aria-describedby` and the error span `id` with `error && id` so both are `undefined` (omitted) when no label is provided
