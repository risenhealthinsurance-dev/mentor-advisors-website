import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { normalizePageId, showPage } from "../script.js";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

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

test("shows the business address in both compliance contact locations", () => {
  const addressBlocks = [...html.matchAll(/<address[^>]*>([\s\S]*?)<\/address>/g)].map((match) => match[1]);

  assert.equal(addressBlocks.length, 2);
  for (const block of addressBlocks) {
    assert.match(block, /Mentor Advisors Equity Group LLC/);
    assert.match(block, /545 NE 141st St/);
    assert.match(block, /North Miami, FL 33161-3128/);
  }
});

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
