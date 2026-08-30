# Technical SEO, Internal Linking & Route Health Audit

Date: 2026-08-30
Scope: local production build only. No deployment or push was performed.

## Methodology

- Inspected Astro, locale, metadata, sitemap, robots, navigation and Knowledge Hub architecture.
- Ran the production build and parsed all generated HTML route files, sitemap XML and internal `href` values.
- Checked titles, descriptions, H1 counts, canonicals, robots directives, hreflang pairs, JSON-LD presence, internal targets and fragment targets.
- Built a basic internal-link graph from generated site links. Header, footer and contextual links are all included in the raw incoming-link figures, so they are not used as a standalone measure of editorial prominence.

## Route inventory

- Generated pages: 483, including the root 404 output.
- Indexable HTML route files inspected: 482.
- German routes: 240.
- English routes: 241.
- Root utility route: 1.
- Sitemap entries use the configured canonical host and trailing slashes.

## Verified healthy signals

- No broken internal route links found in the generated HTML.
- No broken internal fragment targets found.
- No accidental internal `.html` links found.
- No page missing a canonical URL.
- No indexable content page carries `noindex`.
- Main DE/EN FAQ pages have a correct canonical, self/alternate hreflang pair and sitemap entry.
- Main FAQ pages retain 50 accordion questions in each language; the footer points to `/de/faq/` and `/en/faq/`.
- `robots.txt` allows crawling and points to `/sitemap.xml`.
- Existing JSON-LD is valid-looking global `WebSite`, `Person` and `Organization` data. No FAQPage schema was added.
- Knowledge articles are reachable through landing pages, world pages, related articles and language-pair logic. The hub, consultation/contact and home pages are the largest link hubs.

## Fixed finding

### P1 observed: English 404 page was crawlable

`/en/404/` was generated as a normal page, appeared in the sitemap and had neither a robots directive nor an incoming editorial link. This can send an unnecessary indexability signal for a not-found page.

Fix:

- Excluded the route from the Astro sitemap filter.
- Added `noindex, follow` support to the base layout.
- Applied that directive to the root and English 404 pages.

Validation after the fix:

- Neither 404 URL is in the generated sitemap.
- Both 404 outputs include `noindex, follow`.

## Findings retained as recommendations

### P2 recommended: duplicate-title review

The only exact duplicate titles are paired glossary/article or oil-related intents, including Cassia, Magnolia Touch, Vetiver Touch, Patch-Test and doTERRA customer account. They are not automatically treated as duplicates because the route, page type and user intent differ. Review them editorially before making any title changes.

### P2 recommended: structured-data depth

The current global entities are consistent. Article and visual breadcrumb pages do not emit article or BreadcrumbList JSON-LD. This is an enhancement opportunity, not a validated technical error; no speculative schema was added.

### P3 observed: root utility document metadata

The root redirect document has no H1 or description. It is a utility/redirect output rather than a content page and is not a content-quality issue.

## Out of scope / not changed

- No content, design, navigation redesign, analytics, language architecture or Knowledge Hub article changes.
- No redirects were created because no broken or obsolete internal route was verified.
- No mass metadata rewriting or cannibalisation consolidation was performed.
- Untracked `docs/` and image assets were preserved.

## Validation

- Production build: successful, 483 pages.
- Internal-link validation: 0 broken route targets and 0 broken fragment targets.
- Sitemap and canonical checks: successful after the 404 correction.
- `git diff --check`: successful.
