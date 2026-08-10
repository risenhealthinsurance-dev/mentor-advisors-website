# Business Address Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish Mentor Advisors Equity Group LLC's physical address in the website footer and Privacy Policy contact section.

**Architecture:** Extend the existing static HTML only; no new components or dependencies are needed. Protect the compliance placement with an automated source-level test, then push the verified commit to the GitHub Pages repository.

**Tech Stack:** HTML5, Node.js built-in test runner, GitHub Pages

## Global Constraints

- Use this exact content: `Mentor Advisors Equity Group LLC`, `545 NE 141st St`, and `North Miami, FL 33161-3128`.
- Show the address in both the footer Contact Us section and Privacy Policy Contact Us section.
- Preserve all existing consent language, form behavior, navigation, and visual styling.
- Use semantic `<address>` markup and readable line breaks.

---

### Task 1: Add and publish the business address

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: the existing static HTML structure and Node.js test suite.
- Produces: two public `<address>` elements containing the approved business identity and postal address.

- [ ] **Step 1: Write the failing test**

Add a test that reads `index.html`, extracts every `<address>` block, and requires exactly two blocks containing all three approved address lines:

```js
test('shows the business address in both compliance contact locations', () => {
  const addressBlocks = [...html.matchAll(/<address[^>]*>([\s\S]*?)<\/address>/g)].map((match) => match[1]);

  assert.equal(addressBlocks.length, 2);
  for (const block of addressBlocks) {
    assert.match(block, /Mentor Advisors Equity Group LLC/);
    assert.match(block, /545 NE 141st St/);
    assert.match(block, /North Miami, FL 33161-3128/);
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`

Expected: FAIL because `index.html` does not contain two `<address>` elements.

- [ ] **Step 3: Add the minimal HTML**

Add this markup to the Privacy Policy Contact Us section and footer Contact Us section, preserving the existing email and phone details:

```html
<address>
  Mentor Advisors Equity Group LLC<br>
  545 NE 141st St<br>
  North Miami, FL 33161-3128
</address>
```

- [ ] **Step 4: Run the complete test suite**

Run: `npm test`

Expected: 8 tests pass and 0 tests fail.

- [ ] **Step 5: Review and commit the change**

Run: `git diff --check`

Then commit `tests/site.test.mjs` and `index.html` with message `feat: add business address to compliance contacts`.

- [ ] **Step 6: Publish and verify**

Push `master` to `origin`, wait for GitHub Pages to rebuild, and request the public page. Confirm the response is HTTP 200 and its HTML contains the address twice.
