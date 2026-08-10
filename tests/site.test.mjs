import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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
