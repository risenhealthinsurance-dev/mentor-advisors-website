# Mentor Advisors Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an exact, VS Code-ready static reproduction of the approved Mentor Advisors Superdesign website.

**Architecture:** A semantic `index.html` contains the three hash-addressable content views. `styles.css` owns all design tokens, responsive layout, and interaction states; `script.js` owns view switching, contact scrolling, unknown-hash fallback, and form submission prevention. Dependency-free Node tests inspect the files and exercise the navigation controller with a minimal fake DOM.

**Tech Stack:** HTML5, CSS3, browser JavaScript, Node.js built-in test runner

## Global Constraints

- Reproduce Superdesign draft `451b98f9-9841-4b41-ba16-5329fb96b631` from project `9eec9b55-26b9-4c04-a0f8-db82aca4aa1b` without redesigning it.
- Use plain HTML, CSS, and JavaScript with no frontend framework, build step, backend, database, or form service.
- Preserve navy `#003d82`, accent blue `#0066cc`, white, light gray `#f5f5f5`, and Satoshi-style typography.
- Preserve all approved business, consent, Privacy Policy, and SMS Terms copy.
- Keep the consent checkbox unchecked by default.
- Prevent form submission, storage, transmission, logging, and persistence.
- Support desktop, tablet, and mobile layouts with visible keyboard focus.

---

## File Structure

- `index.html`: semantic website content, three page views, form, legal copy, and external asset declarations.
- `styles.css`: design tokens, exact visual treatment, responsive grids, focus states, and view visibility.
- `script.js`: hash routing, page visibility, contact scrolling, and form prevention.
- `tests/site.test.mjs`: dependency-free structural and behavior regression tests.
- `package.json`: test and local-preview commands only; no dependencies.
- `README.md`: VS Code preview, testing, and static deployment instructions.

### Task 1: Static Content and Compliance Structure

**Files:**
- Create: `package.json`
- Create: `tests/site.test.mjs`
- Create: `index.html`

**Interfaces:**
- Consumes: Approved copy and structure from the design specification.
- Produces: Elements with IDs `home-page`, `privacy-page`, `sms-terms-page`, `contact`, `updates-form`, and `sms-consent`; stylesheet and script references at `styles.css` and `script.js`.

- [ ] **Step 1: Write failing structural tests**

Create `package.json`:

```json
{
  "name": "mentor-advisors-website",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test",
    "serve": "npx --yes serve ."
  }
}
```

Create `tests/site.test.mjs` with these initial assertions:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("contains all approved content views", () => {
  for (const id of ["home-page", "privacy-page", "sms-terms-page"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
});

test("keeps consent unchecked and the form locally controlled", () => {
  assert.match(html, /id="updates-form"/);
  assert.match(html, /id="sms-consent"/);
  assert.doesNotMatch(html, /id="sms-consent"[^>]*\schecked(?:\s|>|=)/);
  assert.doesNotMatch(html, /<form[^>]+action=/);
});

test("contains required A2P disclosures", () => {
  assert.match(html, /Message frequency varies/);
  assert.match(html, /Message and data rates may apply/);
  assert.match(html, /Reply STOP to opt out or HELP for assistance/);
  assert.match(html, /Consent is not a condition of purchase/);
});
```

- [ ] **Step 2: Run tests and confirm the missing-site failure**

Run: `npm test`

Expected: FAIL with `ENOENT` for `index.html`.

- [ ] **Step 3: Create the semantic HTML**

Create one complete `index.html` document that:

- Loads `styles.css`, Iconify, and `script.js` with `defer`.
- Uses a sticky header with the Mentor Advisors shield mark and Home/Stay Connected navigation.
- Reproduces the hero, About, three support cards, and the communication form.
- Uses `<main id="home-page" class="page-content active">`, `<main id="privacy-page" class="page-content">`, and `<main id="sms-terms-page" class="page-content">`.
- Copies the approved Privacy Policy and SMS Terms text verbatim from the specification’s Superdesign source.
- Uses `<form id="updates-form">` with no `action`, `method`, or external endpoint.
- Uses `<input id="sms-consent" type="checkbox">` without `checked`.
- Uses unique IDs on navigation links and `data-page` attributes for home/privacy/terms navigation.
- Adds `data-scroll-target="contact"` to contact links.
- Reproduces the dark footer and approved contact information.

The document head must include:

```html
<link rel="stylesheet" href="styles.css">
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
<script src="script.js" defer></script>
```

- [ ] **Step 4: Run structural tests**

Run: `npm test`

Expected: all three structural tests PASS.

- [ ] **Step 5: Commit the content structure**

```powershell
git add package.json index.html tests/site.test.mjs
git commit -m "feat: add Mentor Advisors site content"
```

### Task 2: Exact Styling and Responsive Layout

**Files:**
- Modify: `tests/site.test.mjs`
- Create: `styles.css`

**Interfaces:**
- Consumes: Classes and IDs emitted by `index.html`.
- Produces: CSS variables `--primary-blue`, `--accent-blue`, and `--light-bg`; `.page-content` visibility contract; desktop and mobile visual layout.

- [ ] **Step 1: Add failing CSS contract tests**

Append to `tests/site.test.mjs`:

```js
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

test("defines the approved visual tokens", () => {
  assert.match(css, /--primary-blue:\s*#003d82/i);
  assert.match(css, /--accent-blue:\s*#0066cc/i);
  assert.match(css, /--light-bg:\s*#f5f5f5/i);
});

test("supports routed visibility and responsive layout", () => {
  assert.match(css, /\.page-content\s*\{[^}]*display:\s*none/s);
  assert.match(css, /\.page-content\.active\s*\{[^}]*display:\s*block/s);
  assert.match(css, /@media\s*\(max-width:\s*768px\)/);
  assert.match(css, /:focus-visible/);
});
```

- [ ] **Step 2: Run tests and confirm the missing-styles failure**

Run: `npm test`

Expected: FAIL with `ENOENT` for `styles.css`.

- [ ] **Step 3: Implement exact desktop styling**

Create `styles.css` with:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

:root {
  --primary-blue: #003d82;
  --accent-blue: #0066cc;
  --light-bg: #f5f5f5;
  --text: #1a1a1a;
  --muted: #4b5563;
  --content-width: 80rem;
}

.page-content { display: none; }
.page-content.active { display: block; }
:focus-visible { outline: 3px solid rgba(0, 102, 204, 0.45); outline-offset: 3px; }
```

Complete the stylesheet to match the Superdesign structure: sticky 80px header, constrained containers, navy gradient hero with dot pattern, 24/32px section rhythm, About grid, three-card support grid, form panel with blue heading, dark footer, legal-page typography, transitions, radii, borders, and shadows.

- [ ] **Step 4: Add responsive rules**

Add `@media (max-width: 768px)` rules that collapse navigation spacing, hero typography, About/support/footer grids, and form field rows to one column while preserving readable padding and tap targets.

- [ ] **Step 5: Run CSS contract tests**

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 6: Commit styling**

```powershell
git add styles.css tests/site.test.mjs
git commit -m "feat: reproduce Mentor Advisors styling"
```

### Task 3: Navigation, Form Safety, and Documentation

**Files:**
- Modify: `tests/site.test.mjs`
- Create: `script.js`
- Create: `README.md`

**Interfaces:**
- Consumes: DOM IDs and `data-page`/`data-scroll-target` attributes from `index.html`.
- Produces: `normalizePageId(hash) -> "home" | "privacy" | "sms-terms"`, `showPage(pageId, documentRef, windowRef) -> string`, and `initializeSite(documentRef, windowRef) -> void`.

- [ ] **Step 1: Add failing behavior tests**

Append to `tests/site.test.mjs`:

```js
import { normalizePageId, showPage } from "../script.js";

test("normalizes supported and unknown hashes", () => {
  assert.equal(normalizePageId("#privacy"), "privacy");
  assert.equal(normalizePageId("#sms-terms"), "sms-terms");
  assert.equal(normalizePageId("#unknown"), "home");
});

test("showPage activates one view and scrolls to the top", () => {
  const pages = ["home", "privacy", "sms-terms"].map((name) => ({
    id: `${name}-page`,
    classList: {
      active: name === "home",
      add(value) { if (value === "active") this.active = true; },
      remove(value) { if (value === "active") this.active = false; }
    }
  }));
  const documentRef = {
    querySelectorAll: () => pages,
    getElementById: (id) => pages.find((page) => page.id === id)
  };
  let scrollArgs;
  const windowRef = { scrollTo: (...args) => { scrollArgs = args; } };

  assert.equal(showPage("privacy", documentRef, windowRef), "privacy");
  assert.equal(pages.find((page) => page.id === "privacy-page").classList.active, true);
  assert.deepEqual(scrollArgs, [0, 0]);
});
```

- [ ] **Step 2: Run tests and confirm the missing-module failure**

Run: `npm test`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `script.js`.

- [ ] **Step 3: Implement routing and initialization**

Create `script.js` with exported functions and browser initialization:

```js
const supportedPages = new Set(["home", "privacy", "sms-terms"]);

export function normalizePageId(hash = "") {
  const candidate = hash.replace(/^#/, "");
  return supportedPages.has(candidate) ? candidate : "home";
}

export function showPage(pageId, documentRef = document, windowRef = window) {
  const normalized = supportedPages.has(pageId) ? pageId : "home";
  documentRef.querySelectorAll(".page-content").forEach((page) => page.classList.remove("active"));
  documentRef.getElementById(`${normalized}-page`)?.classList.add("active");
  windowRef.scrollTo(0, 0);
  return normalized;
}
```

`initializeSite` must register link handlers, a `hashchange` handler, and a form `submit` handler that calls `preventDefault()` only. Contact handlers must show Home and scroll `#contact` into view. Run initialization after `DOMContentLoaded` in browsers while keeping module imports safe in Node.

- [ ] **Step 4: Run behavior tests**

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 5: Document local use and deployment**

Create `README.md` containing:

```markdown
# Mentor Advisors Website

Static reproduction of the approved Mentor Advisors Superdesign website.

## Preview in VS Code

Run `npm run serve`, then open the local URL printed in the terminal.

## Test

Run `npm test`.

## Deploy

Upload `index.html`, `styles.css`, and `script.js` to any static host. Configure `www.mentoradvisors.org` using the DNS record supplied by that host.

The communication form is intentionally non-submitting and does not transmit or store visitor data.
```

- [ ] **Step 6: Run complete verification**

Run:

```powershell
npm test
git diff --check
```

Expected: all tests PASS and `git diff --check` returns no output.

Start the local server with `npm run serve`, inspect desktop and mobile views, exercise every navigation link, verify the checkbox is initially clear, press the form button, and confirm there is no reload, request, or console error.

- [ ] **Step 7: Commit behavior and documentation**

```powershell
git add script.js tests/site.test.mjs README.md
git commit -m "feat: add safe navigation and local documentation"
```
