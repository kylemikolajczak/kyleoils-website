# CODEX ASSIGNMENT 01B
## Kyle Oils – Main FAQ Architecture Correction & Full Expansion

**Recommended setting: GPT-5.6 Tera – Medium**

Continue the previous FAQ task. Do not restart or rebuild the project.

### Confirmed context from the previous run
- main FAQ pages exist at `/de/faq/` and `/en/faq/`
- Knowledge FAQ worlds exist at `/de/wissen/faq/` and `/en/knowledge/faq/`
- 32 FAQ Knowledge Hub articles were reported per locale
- previous run changed the footer FAQ destination to the Knowledge FAQ world

### Intended final architecture
- Footer DE FAQ -> `/de/faq/`
- Footer EN FAQ -> `/en/faq/`
- Main FAQ becomes the broad approximately 50-question website FAQ
- Knowledge FAQ remains a separate deeper resource

### Prepared package
Read all files in:
`docs/website-improvement-packages/faq-main-page-expansion/`

Treat the bilingual FAQ drafts as an editorial source, not blind copy.

### Work order
1. Inspect current repository and previous FAQ diff.
2. Read existing DE and EN main FAQ completely.
3. Inspect Knowledge FAQ sufficiently to avoid duplication.
4. Correct footer destination back to the main FAQ.
5. Preserve Knowledge FAQ.
6. Expand main FAQ to about 50 strong questions per locale, reusing good existing questions.
7. Use the prepared drafts as the content bank.
8. Verify factual and market-sensitive wording against current project / approved doTERRA sources.
9. Resolve every internal link from real repository routes.
10. Link selected FAQ answers to deeper Knowledge Hub content where helpful.
11. Preserve current visual system and accordion implementation unless a real defect requires a minimal fix.
12. Check metadata, canonical, indexability, sitemap, locale behaviour and current structured-data approach.
13. Check accessibility.
14. Run build and existing validations.
15. Perform 1440px and 390px visual QA.
16. Do not deploy and do not push.

### Scope protection
Do not redesign the website, create a new repository, refactor unrelated systems, rebuild analytics, rewrite unrelated Knowledge Hub articles, deploy or push.

### Final report
Report architecture found, old vs final footer destinations, main FAQ counts before/after for DE/EN, categories, preserved/used/omitted content, internal links, Knowledge FAQ relationship, metadata/canonical/sitemap results, structured-data decision, accessibility, files changed, validation results, 1440px QA, 390px QA, out-of-scope findings, git status, commit status and explicit confirmation of no deploy/no push.
