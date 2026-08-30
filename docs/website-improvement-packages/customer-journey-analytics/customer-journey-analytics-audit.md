# Customer Journey, Conversion & Analytics Quality Audit

Date: 2026-08-30
Scope: local repository and production build. No deployment, push, consent change or new tracking was performed.

## Methodology

- Reviewed shared navigation, footer, CTA, Knowledge Article, related-link, Start Here, Starter Set, workshop, business and analytics-consent templates.
- Checked representative generated routes and the internal-link inventory from the technical SEO audit.
- Reviewed the inline GA4/consent implementation statically. A post-consent live collection request was intentionally not generated during this audit.

## Journey results

### A. Search visitor entering through a Knowledge article

**Observed:** Articles provide breadcrumb orientation, world context, related educational links and then an optional personal-guidance CTA. This preserves learning before contact. No dead-end defect found.

### B. Product or Starter Set interest

**Observed:** Starter Set and Products & Systems routes separate explanation, comparison and optional guidance from official ordering. The Start Here path supplies a calm next step. No shop-first pressure defect found.

### C. New customer after a first order

**Observed:** Startbereich/Start Here leads through product orientation, Starter Sets, Safe Use, a first-30-day routine and everyday use. The 30-Day Start Plan and support CTA remain reachable. This is a strong post-purchase path.

### D. Existing customer

**Observed:** Oil Library, Products & Systems, Routines, Safe Use, Knowledge FAQ and direct support remain available without forcing a Starter Set path. Article related links are the preferred educational next step.

### E. Workshop or partnership visitor

**Observed:** Workshop pages route principally to contact, which is the appropriate low-friction enquiry action. No aggressive business CTA was found in the workshop path.

### F. Potential Wellness Advocate

**Observed:** Business Opportunity is a secondary route in Guidance and footer navigation. Existing pages describe customer-first, voluntary participation and no income guarantees. No MLM-style pressure defect found.

## CTA audit

The main CTA patterns are educational navigation, support/contact, WhatsApp, Starter Sets, official doTERRA ordering, workshop enquiry and optional business conversation. Shared components keep CTA appearance consistent.

No deterministic wrong destination, language-crossing CTA or generic article dead end was found. No CTA changes were made.

## Post-purchase assessment

The Start Here, 30-Day Start Plan, Safe Use, Oil Library, Routines, FAQ and contact paths provide a coherent support loop after ordering. The main recommendation is editorial, not technical: retain these links in future product and onboarding work rather than adding more competing CTAs.

## Analytics and consent

- Measurement ID in the implementation: `G-54462FVGLC`.
- One consent-owned loader is present; no separate inline `gtag.js` tag or duplicate custom implementation was found.
- Before consent, the code sets `analytics_storage`, `ad_storage`, `ad_user_data` and `ad_personalization` to `denied`; the Google tag script is not appended.
- After an explicit stored or clicked grant, it updates only `analytics_storage` to `granted`, loads `gtag.js`, and configures GA4 with Google signals and ad personalisation disabled.
- Rejecting through the consent UI updates all consent values to denied and sets the GA disable flag. Footer preferences reopens the same controls.
- No custom analytics events currently exist.

### Event strategy recommendation, intentionally not implemented

If consented GA4 reporting later needs decision-level signals, use a small, privacy-safe set: `consultation_click`, `whatsapp_click`, `starter_set_click`, `official_shop_click`, `workshop_inquiry_click` and `business_interest_click`. Use page context only; never send contact details, free text, wellness questions or health data. This needs a separate approved measurement specification and runtime validation.

## Findings

- **P0:** none.
- **P1:** none.
- **P2, recommended:** Define a small consented CTA-event measurement plan before adding custom events.
- **P3, recommended:** Reassess CTA density when future landing-page modules are added; avoid duplicating contact controls where a relevant educational link is more useful.

## Validation and exclusions

- Assignment 01 FAQ implementation remains unchanged and retains 50 DE and 50 EN questions.
- Assignment 02 404 correction remains in place: both generated 404 outputs are `noindex, follow` and absent from the sitemap.
- No data-collection network request was generated, so post-consent GA4 collection success is not asserted here.
- No customer portal, CRM, email workflow, new funnel, global redesign or analytics rebuild was added.
