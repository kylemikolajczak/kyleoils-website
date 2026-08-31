# Technical SEO, Internal Linking & Route Health Audit

Date: 2026-08-31
Scope: current local production build plus a read-only live HTTP and GEO verification. No deployment or push was performed.

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

## Current technical re-verification

### Route and indexability inventory

- Generated HTML pages: 483.
- Indexable documents: 481. The two 404 outputs are deliberately `noindex, follow` and are excluded from the sitemap.
- Generated DE routes: 240. Generated EN routes: 241. The root redirect document is a utility document and canonicals to `/de/`.
- Sitemap entries: 481. Every indexable non-root document is present exactly once in the generated sitemap; no `noindex` 404 page is included.
- Canonicals: no missing canonical, locale-crossing canonical or non-root canonical mismatch found.
- Hreflang: no missing self-reference, missing target or non-reciprocal DE/EN pair found among paired public pages. `x-default` consistently points to the German counterpart by the current site convention.
- Robots: `robots.txt` permits `User-agent: *` and references `https://kyleoils.com/sitemap.xml`. No unintended `noindex`, `nosnippet`, `noarchive`, `nocache` or `X-Robots-Tag` was found on the sampled public HTML responses.

### Internal linking and route health

- Generated HTML analysis found 0 broken internal page targets, 0 broken fragment targets, 0 accidental internal `.html` links, 0 duplicate DOM IDs and 0 missing generated image assets.
- Both public 30-day-plan PDFs exist in the build output. Their direct-download links are valid static-asset links, not route failures.
- No indexable route is an absolute orphan in the generated internal-link graph. Many individual Knowledge articles have one or two incoming links because they are intentionally reached through their parent world, related-content links and language pairing; this is not a deterministic defect.
- Hub pages include the DE/EN Oil Library, Glossary, FAQ, Products & Systems, Routines and Start Here / Startbereich. No indexable document is a dead end in the generated graph.
- Header, footer, breadcrumbs and the Knowledge world/article templates resolve to existing locale-correct routes in the generated site.

### Metadata, headings, assets and structured data

- All content documents have one H1, a title and a canonical. The root redirect document intentionally has no H1 or description.
- No invalid heading sequence, empty link, missing image `alt` attribute, malformed JSON-LD or language mismatch was found in generated HTML.
- Exact duplicate titles are limited to intentionally overlapping glossary/article or brand-name pairs, for example the DE customer-account and Patch-Test entries, plus language-neutral oil names such as Cassia. These are editorial cannibalisation-review candidates, not an automatic technical change.
- Existing global JSON-LD is parseable and consistently emits `WebSite`, `Person` and `Organization`. Knowledge articles use semantic `<article>` and breadcrumb navigation in server-rendered HTML, but do not currently emit `Article` or `BreadcrumbList` JSON-LD. This is an optional P2 enhancement, not a markup defect, so it was not added.
- The production image build has no missing referenced assets. Large original source images remain in the output alongside optimized responsive primary assets; this is a separate P2 performance review topic, not an SEO or crawlability defect in this audit.

## GEO / generative-search technical audit

### Machine-readable and semantic content

- Representative DE/EN home, Knowledge landing, Oil Library article and main FAQ pages expose their substantive text directly in server-rendered `<main>` HTML. It is not dependent on client-side rendering or image-only text.
- The sampled pages expose one H1, ordered H2/H3 structure, semantic `<main>`, `<nav>`, `<footer>` and, where applicable, `<article>` and labelled breadcrumbs. The main FAQ answer content remains available in HTML.
- Entity clarity is technically consistent: the visible Kyle Oils brand and the global `WebSite`, `Person` and `Organization` entities use the same public site URL and a real named person. No unsupported qualification, review or medical fact was added.

### Live crawler access (read-only check on 2026-08-31)

The following representative live paths were requested using normal browser, Googlebot Smartphone, Googlebot Desktop, Bingbot and OAI-SearchBot user agents: `/`, `/de/`, `/en/`, `/de/wissen/`, `/en/knowledge/`, DE/EN Lavender articles, `/robots.txt`, `/sitemap.xml` and `/sitemap-0.xml`.

- Normal browser, Googlebot Smartphone, Googlebot Desktop and Bingbot each received HTTP 200 for every sampled public HTML, robots and sitemap endpoint. HTML was `text/html`; robots was `text/plain`; sitemap documents were `application/xml`. No sampled response carried `X-Robots-Tag`.
- OAI-SearchBot received HTTP 403 on each sampled HTML page and both sitemap URLs, while it received HTTP 200 for `/robots.txt`.
- The OAI 403 is directly evidenced as a Cloudflare response: `Server: cloudflare`, `CF-RAY: a33e5f531e16e504-TXL`, `Cache-Control: no-store`, content type `text/plain`, body `Your request was blocked.` No repository source, Worker middleware or `wrangler.jsonc` rule filters OAI-SearchBot or user agents.
- This is a P1 OBSERVED GEO discovery blocker for ChatGPT Search visibility. Google AI readiness is technically healthy in the sampled access path because Googlebot received 200; Bing/Copilot readiness is technically healthy in the sampled access path because Bingbot received 200. OAI-SearchBot / ChatGPT Search access is currently not healthy.

### GEO decisions and recommended next step

- No `llms.txt`, non-standard AI meta tags, crawler allowlist, keyword stuffing or artificial FAQ/schema content was added. None is justified by this evidence.
- IndexNow is not implemented. It is compatible in principle with the static sitemap/canonical architecture, but should remain a P2 operational enhancement only after a product decision and a safe deploy-time integration point are defined. It was not implemented.
- No repository change can safely repair the observed OAI 403. The narrow next step is in the Cloudflare zone dashboard: inspect WAF custom rules, Bot Fight Mode / Super Bot Fight Mode, Bot Management and rate-limit rules for the Cloudflare Ray ID and establish whether the request is classified as a verified OAI search crawler. If the site owner wants ChatGPT Search discoverability, exempt only the verified crawler signal/rule path that produced this block, then re-test the same URLs. Do not create a broad user-agent-string allowlist and do not weaken general bot protection.
- Optional editorial GEO opportunity, not implemented: selected core guidance pages could add human-edited, source-backed answer summaries where that improves visitors' understanding. This requires a separate content decision and is not a technical repair.

## Priority summary

- P0: none observed.
- P1: OAI-SearchBot receives a Cloudflare 403 on public content and sitemap URLs; external configuration review required.
- P2: review intentional duplicate-title pairs editorially; evaluate page-type schema and IndexNow only as planned enhancements; assess non-critical large original image assets separately.
- P3: root utility redirect has no H1/description/hreflang by design.

## Current validation and change control

- Production build: successful, 483 pages.
- Static route, sitemap, canonical, hreflang, link, fragment, image, heading and JSON-LD checks: passed as described above.
- Local production preview smoke: desktop 1440px and mobile 390px on representative DE/EN home, Knowledge, article, Safe Use/Oil Library, Starter Sets, consultation, FAQ and workshops pages. All sampled pages had one H1, main and footer; no sampled horizontal overflow or console errors occurred.
- Analytics/consent sanity: source references the expected measurement ID `G-54462FVGLC`; no analytics or consent code was changed.
- `git diff --check`: successful after this report update.
- Files changed in this audit run: this audit report only.
- No commit created. No deployment. No push.
