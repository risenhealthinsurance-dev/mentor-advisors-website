# Mentor Advisors Website Design

## Objective

Create a VS Code-ready static website that faithfully reproduces the approved Superdesign draft `451b98f9-9841-4b41-ba16-5329fb96b631` from project `9eec9b55-26b9-4c04-a0f8-db82aca4aa1b`.

The website is an informational and A2P-compliance landing page for Mentor Advisors Equity Group LLC. It must preserve the existing visual design, copy, legal content, and responsive behavior without adding new product features.

## Technical Approach

Use plain HTML, CSS, and JavaScript. The implementation will have no framework, build step, backend, database, or third-party form service. This keeps the deployed output close to the Superdesign source and makes it compatible with any static host.

The local project will contain:

- `index.html` for semantic content and page sections
- `styles.css` for responsive styling and design tokens
- `script.js` for hash navigation and non-submitting form behavior
- A concise `README.md` with local preview and deployment instructions

## Visual Fidelity

The implementation will reproduce the current Superdesign draft rather than redesign it. It will preserve:

- Satoshi-style typography with a safe sans-serif fallback
- Primary navy `#003d82`, accent blue `#0066cc`, white, and light gray `#f5f5f5`
- Sticky white header and shield-check brand mark
- Navy gradient hero with dotted decorative pattern
- Two-column About section and existing team image
- Three support cards with matching icons
- Blue-topped communication form card
- Dark three-column footer
- Existing spacing, borders, radii, shadows, hover states, and responsive breakpoints

## Content and Navigation

The website will preserve the three existing content views:

1. Home landing page
2. Privacy Policy
3. SMS Terms & Conditions

Navigation will remain hash-based using `#home`, `#privacy`, and `#sms-terms`. Only one content view will be visible at a time. Legal-page back buttons will return to the home view, and contact links will return home and scroll to the form.

All copy will match the current Superdesign draft, including the Mentor Advisors business description, contact email, phone number, consent disclosure, Privacy Policy, and SMS Terms.

## Form Behavior

The communication form is visual-only. It will contain:

- Full Name
- Email Address
- Mobile Phone Number
- An unchecked SMS consent checkbox
- The existing A2P consent disclosure and legal links
- A “Subscribe to Updates” button

JavaScript will prevent submission and network activity. No entered data will be stored, transmitted, logged, or persisted.

## Responsive and Accessibility Behavior

The layout will support desktop, tablet, and mobile widths. Desktop grids will collapse to single-column layouts on smaller screens. Navigation, form controls, links, headings, and page landmarks will use semantic HTML and visible keyboard focus states. The consent checkbox will remain unchecked by default.

## Error Handling

Unknown URL hashes will fall back to the home view. JavaScript will guard against missing target elements so navigation does not break the page. If remote fonts, icons, or the existing image fail to load, the content and page structure will remain readable.

## Verification

Verification will include:

- Local static-server smoke test
- Desktop and mobile visual inspection against the Superdesign draft
- Navigation checks for Home, Privacy Policy, SMS Terms, Contact, and back links
- Confirmation that the consent checkbox starts unchecked
- Confirmation that form submission creates no request or page reload
- Console-error check
- Basic HTML validation and link/asset checks

## Deliverable

The completed website will be stored as a self-contained local project in the shared workspace and will be ready to open in VS Code and deploy to a static hosting provider.
