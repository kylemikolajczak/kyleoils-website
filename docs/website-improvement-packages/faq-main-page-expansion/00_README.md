# Kyle Oils – Main FAQ Expansion Pack

## Architecture decision

Keep both FAQ systems, but give them different jobs.

**Main website FAQ**
- DE: `/de/faq/`
- EN: `/en/faq/`
- broad user-facing FAQ
- this is the FAQ that belongs in the footer
- target: about 50 strong questions per locale

**Knowledge FAQ world**
- DE: `/de/wissen/faq/`
- EN: `/en/knowledge/faq/`
- Codex reported 32 existing FAQ Knowledge Hub articles per locale
- preserve as a deeper knowledge resource
- it can be linked from the main FAQ

The previous Codex run currently points the footer FAQ link to the Knowledge FAQ world. The next run should correct the footer back to the main FAQ.

The bilingual draft files in this package are editorial source material. Codex must inspect the current FAQ pages first, preserve strong existing content, remove duplicates, verify market-sensitive wording and resolve all internal routes from the repository before implementation.

No deploy or push without explicit instruction.
