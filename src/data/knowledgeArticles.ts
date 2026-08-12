import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { KnowledgeWorldId } from './knowledge';

export type ArticleBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'unordered-list'; items: string[] }
  | { type: 'ordered-list'; items: string[] };

export interface KnowledgeArticle {
  id: string;
  title: string;
  route: string;
  worldId: KnowledgeWorldId;
  worldLabel: string;
  seoTitle: string;
  description: string;
  risk: 'low' | 'medium' | 'high';
  cta?: string;
  reviewedBy: string;
  medicalDisclaimerRequired: boolean;
  relatedArticleIds: string[];
  searchKeywords: string[];
  blocks: ArticleBlock[];
}

export interface EnglishKnowledgeArticle extends Omit<KnowledgeArticle, 'risk'> {
  sourceDeId: string;
}

export type KnowledgeArticleSummary = Pick<KnowledgeArticle, 'title' | 'route' | 'worldId' | 'worldLabel' | 'description' | 'searchKeywords'>;

interface ArticleIndexItem {
  id: string;
  title: string;
  route: string;
  worldId: KnowledgeWorldId;
  worldLabel: string;
  seoTitle: string;
  description: string;
  risk?: 'low' | 'medium' | 'high';
  riskLevel?: 'low' | 'medium' | 'high';
  relatedArticleIds?: string[];
  related?: string[];
  pair?: string;
  translationPairId?: string;
  language?: 'de' | 'en';
}

interface EnglishArticleIndexItem extends Omit<ArticleIndexItem, 'risk' | 'riskLevel'> {
  sourceDeId?: string;
}

const approvedGermanContentPacks = [
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-02-content-pack-01/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-02-content-pack-01/article-index.wave-02.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-03-content-pack-02/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-03-content-pack-02/article-index.wave-03.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-04-oil-lexicon-starter/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-04-oil-lexicon-starter/article-index.wave-04.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-06-products-systems-content-pack-03/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-06-products-systems-content-pack-03/article-index.wave-06.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-14-bilingual-faq-starter/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-14-bilingual-faq-starter/article-index.wave-14.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-15-header-logo-glossary-starter/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-15-header-logo-glossary-starter/article-index.wave-15.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-17-footer-oil-lexicon-expansion-01/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-17-footer-oil-lexicon-expansion-01/article-index.wave-17.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-18-safety-expansion-01/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-18-safety-expansion-01/article-index.wave-18.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-20-products-systems-expansion-02/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-20-products-systems-expansion-02/article-index.wave-20.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-21-faq-expansion-02/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-21-faq-expansion-02/article-index.wave-21.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-22-oil-lexicon-expansion-02/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-22-oil-lexicon-expansion-02/article-index.wave-22.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-23-everyday-use-expansion-01/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-23-everyday-use-expansion-01/article-index.wave-23.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-25-glossary-expansion-02/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-25-glossary-expansion-02/article-index.wave-25.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-26-routines-expansion-02/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-26-routines-expansion-02/article-index.wave-26.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-27-safety-polish-expansion-02/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-27-safety-polish-expansion-02/article-index.wave-27.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-29-core-product-blend-pillar-expansion-01/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-29-core-product-blend-pillar-expansion-01/article-index.wave-29.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-30-oil-library-expansion-03/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-30-oil-library-expansion-03/article-index.wave-30.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-32-starter-set-customer-path-conversion-01/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-32-starter-set-customer-path-conversion-01/article-index.wave-32.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-35-buyer-objection-faq-expansion-01/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-35-buyer-objection-faq-expansion-01/article-index.wave-35.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-37-first-30-days-starter-routine-01/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-37-first-30-days-starter-routine-01/article-index.wave-37.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-38-oil-library-expansion-04/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-38-oil-library-expansion-04/article-index.wave-38.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-39-seasonal-household-routine-expansion-01/de'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-39-seasonal-household-routine-expansion-01/article-index.wave-39.json'),
  },
];

const approvedEnglishContentPacks = [
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-07-en-sync-01-basics-safety/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-07-en-sync-01-basics-safety/article-index.wave-07.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-08-en-sync-02-routines-everyday-use/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-08-en-sync-02-routines-everyday-use/article-index.wave-08.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-09-en-sync-03-oil-lexicon-starter/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-09-en-sync-03-oil-lexicon-starter/article-index.wave-09.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-10-en-sync-04-products-systems/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-10-en-sync-04-products-systems/article-index.wave-10.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-14-bilingual-faq-starter/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-14-bilingual-faq-starter/article-index.wave-14.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-15-header-logo-glossary-starter/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-15-header-logo-glossary-starter/article-index.wave-15.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-17-footer-oil-lexicon-expansion-01/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-17-footer-oil-lexicon-expansion-01/article-index.wave-17.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-18-safety-expansion-01/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-18-safety-expansion-01/article-index.wave-18.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-20-products-systems-expansion-02/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-20-products-systems-expansion-02/article-index.wave-20.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-21-faq-expansion-02/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-21-faq-expansion-02/article-index.wave-21.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-22-oil-lexicon-expansion-02/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-22-oil-lexicon-expansion-02/article-index.wave-22.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-23-everyday-use-expansion-01/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-23-everyday-use-expansion-01/article-index.wave-23.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-25-glossary-expansion-02/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-25-glossary-expansion-02/article-index.wave-25.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-26-routines-expansion-02/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-26-routines-expansion-02/article-index.wave-26.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-27-safety-polish-expansion-02/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-27-safety-polish-expansion-02/article-index.wave-27.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-29-core-product-blend-pillar-expansion-01/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-29-core-product-blend-pillar-expansion-01/article-index.wave-29.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-30-oil-library-expansion-03/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-30-oil-library-expansion-03/article-index.wave-30.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-32-starter-set-customer-path-conversion-01/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-32-starter-set-customer-path-conversion-01/article-index.wave-32.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-35-buyer-objection-faq-expansion-01/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-35-buyer-objection-faq-expansion-01/article-index.wave-35.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-37-first-30-days-starter-routine-01/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-37-first-30-days-starter-routine-01/article-index.wave-37.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-38-oil-library-expansion-04/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-38-oil-library-expansion-04/article-index.wave-38.json'),
  },
  {
    articleDirectory: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-39-seasonal-household-routine-expansion-01/en'),
    articleIndexPath: resolve(process.cwd(), 'review/knowledge-hub/articles/wave-39-seasonal-household-routine-expansion-01/article-index.wave-39.json'),
  },
];

const germanIndex = approvedGermanContentPacks.flatMap(({ articleIndexPath }) =>
  JSON.parse(readFileSync(articleIndexPath, 'utf8')) as ArticleIndexItem[],
).filter((item) => item.language !== 'en');

const englishIndex = approvedEnglishContentPacks.flatMap(({ articleIndexPath }) =>
  JSON.parse(readFileSync(articleIndexPath, 'utf8')) as EnglishArticleIndexItem[],
).filter((item) => item.language !== 'de');

function readFrontmatter(source: string) {
  const [, frontmatter = '', body = ''] = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/) ?? [];
  const values: Record<string, string | boolean | string[]> = {};
  let currentListKey: string | undefined;

  for (const line of frontmatter.split(/\r?\n/)) {
    const listItem = line.match(/^\s+-\s+"?(.+?)"?\s*$/);
    if (listItem && currentListKey) {
      const list = values[currentListKey];
      if (Array.isArray(list)) list.push(listItem[1]);
      continue;
    }
    const field = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (!field) continue;
    const [, key, rawValue] = field;
    currentListKey = undefined;
    if (!rawValue) {
      values[key] = [];
      currentListKey = key;
    } else if (rawValue === 'true' || rawValue === 'false') {
      values[key] = rawValue === 'true';
    } else {
      values[key] = rawValue.replace(/^"|"$/g, '');
    }
  }

  return { values, body };
}

function toBlocks(markdown: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  const lines = markdown.trim().split(/\r?\n/);
  let paragraph: string[] = [];
  let unorderedItems: string[] = [];
  let orderedItems: string[] = [];

  const flush = () => {
    if (paragraph.length) blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
    if (unorderedItems.length) blocks.push({ type: 'unordered-list', items: unorderedItems });
    if (orderedItems.length) blocks.push({ type: 'ordered-list', items: orderedItems });
    paragraph = [];
    unorderedItems = [];
    orderedItems = [];
  };

  for (const line of lines) {
    if (line.startsWith('# ')) continue;
    const heading = line.match(/^(##|###)\s+(.+)$/);
    if (heading) {
      flush();
      blocks.push({ type: 'heading', level: heading[1].length as 2 | 3, text: heading[2] });
      continue;
    }
    const unordered = line.match(/^-\s+(.+)$/);
    if (unordered) {
      if (paragraph.length || orderedItems.length) flush();
      unorderedItems.push(unordered[1]);
      continue;
    }
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      if (paragraph.length || unorderedItems.length) flush();
      orderedItems.push(ordered[1]);
      continue;
    }
    if (!line.trim()) {
      flush();
      continue;
    }
    paragraph.push(line.trim());
  }
  flush();
  return blocks;
}

function getRawArticles(contentPacks: typeof approvedGermanContentPacks | typeof approvedEnglishContentPacks) {
  return contentPacks.flatMap(({ articleDirectory }) =>
  readdirSync(articleDirectory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => readFrontmatter(readFileSync(resolve(articleDirectory, name), 'utf8'))),
  );
}

const rawGermanArticles = getRawArticles(approvedGermanContentPacks);
const rawEnglishArticles = getRawArticles(approvedEnglishContentPacks);

function normalizeWorldId(worldId: string): KnowledgeWorldId {
  if (worldId === 'products') return 'products-systems';
  if (worldId === 'everyday') return 'everyday-use';
  return worldId as KnowledgeWorldId;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value : undefined;
}

const pillarSearchKeywords: Record<string, string[]> = {
  'KO-W03-002': ['abendroutine', 'schlafroutine', 'schlafenszeit'],
  'KO-W03-004': ['bewegung', 'körperpflege', 'körperkomfort', 'massage', 'hautpflege', 'pflegegefühl'],
  'KO-W03-006': ['raumluft', 'atemgefühl'],
  'KO-W03-007': ['stressiger alltag', 'innere orientierung'],
  'KO-W06-005': ['bauchgefühl', 'essensalltag'],
  'KO-W20-DE-001': ['produktauswahl', 'erste produktauswahl'],
  'KO-W20-DE-008': ['produktauswahl', 'orientierung'],
  'KO-W21-DE-008': ['emotionen', 'duftanker'],
  'KO-W26-DE-007': ['familie', 'sichere alltagsroutinen'],
  'KO-W08-002': ['evening routine', 'sleep routine', 'bedtime'],
  'KO-W08-004': ['movement', 'body care', 'body comfort', 'massage', 'skin care', 'care feel'],
  'KO-W08-006': ['room air', 'breathing feel'],
  'KO-W08-007': ['stressful day', 'inner orientation'],
  'KO-W10-005': ['digestive feel', 'food routines'],
  'KO-W20-EN-001': ['product choice', 'first product choice'],
  'KO-W20-EN-008': ['product choice', 'orientation'],
  'KO-W21-EN-008': ['emotions', 'scent anchors'],
  'KO-W26-EN-007': ['family', 'safe everyday routines'],
  'KO-W29-DE-001': ['deep blue', 'bewegung', 'massage', 'k\u00f6rperkomfort', 'k\u00fchlend', 'pflegegef\u00fchl'],
  'KO-W29-DE-002': ['zengest', 'bauchgef\u00fchl', 'essensalltag', 'mahlzeiten', 'reisen'],
  'KO-W29-DE-003': ['on guard', 'schutz-routine', 'jahreszeiten', 'familie'],
  'KO-W29-DE-004': ['serenity', 'abendroutine', 'schlafroutine', 'schlafenszeit'],
  'KO-W29-DE-005': ['doterra air', 'atemgef\u00fchl', 'frische raumluft', 'diffuser'],
  'KO-W29-DE-006': ['adaptiv', 'stressiger alltag', 'duftanker', 'innere orientierung'],
  'KO-W29-DE-007': ['lavender', 'lavendel', 'abendroutine', 'hautpflege', 'pflegegef\u00fchl'],
  'KO-W29-DE-008': ['kapsel rezepte', 'kapselrezept', 'flu bomb', 'flubomb', 'innere anwendung'],
  'KO-W29-EN-001': ['deep blue', 'movement', 'massage', 'body comfort', 'cooling', 'care feel'],
  'KO-W29-EN-002': ['zengest', 'digestive feel', 'food routines', 'meals', 'travel'],
  'KO-W29-EN-003': ['on guard', 'protective routine', 'seasons', 'family'],
  'KO-W29-EN-004': ['serenity', 'evening routine', 'sleep routine', 'bedtime'],
  'KO-W29-EN-005': ['doterra air', 'breathing feel', 'fresh room air', 'diffuser'],
  'KO-W29-EN-006': ['adaptiv', 'stressful days', 'scent anchors', 'inner orientation'],
  'KO-W29-EN-007': ['lavender', 'evening routine', 'skin care', 'care feel'],
  'KO-W29-EN-008': ['capsule recipes', 'capsule recipe', 'flu bomb', 'flubomb', 'internal use'],
  'KO-W30-DE-001': ['basil', 'basilikum', 'kr\u00e4uter\u00f6l', 'essensalltag'],
  'KO-W30-DE-002': ['cardamom', 'kardamom', 'gew\u00fcrz\u00f6l', 'essensalltag', 'bauchgef\u00fchl'],
  'KO-W30-DE-003': ['ginger', 'ingwer', 'gew\u00fcrz\u00f6l', 'essensalltag', 'bauchgef\u00fchl'],
  'KO-W30-DE-004': ['fennel', 'fenchel', 'kr\u00e4uter\u00f6l', 'essensalltag', 'bauchgef\u00fchl'],
  'KO-W30-DE-005': ['coriander', 'koriandersamen', 'koriander', 'kr\u00e4uter\u00f6l', 'gew\u00fcrz\u00f6l', 'essensalltag', 'bauchgef\u00fchl'],
  'KO-W30-DE-006': ['marjoram', 'majoran', 'kr\u00e4uter\u00f6l', 'abendroutine', 'massage'],
  'KO-W30-DE-007': ['cinnamon bark', 'zimtrinde', 'hot oil', 'gew\u00fcrz\u00f6l'],
  'KO-W30-DE-008': ['patchouli', 'patschuli', 'hautpflege', 'pflegegef\u00fchl', 'basisnote'],
  'KO-W30-EN-001': ['basil', 'herbal oil', 'food routines'],
  'KO-W30-EN-002': ['cardamom', 'spice oil', 'food routines', 'digestive feel'],
  'KO-W30-EN-003': ['ginger', 'spice oil', 'food routines', 'digestive feel'],
  'KO-W30-EN-004': ['fennel', 'herbal oil', 'spice oil', 'food routines', 'digestive feel'],
  'KO-W30-EN-005': ['coriander', 'herbal oil', 'spice oil', 'food routines', 'digestive feel'],
  'KO-W30-EN-006': ['marjoram', 'herbal oil', 'evening routine', 'massage'],
  'KO-W30-EN-007': ['cinnamon bark', 'hot oil', 'spice oil'],
  'KO-W30-EN-008': ['patchouli', 'skin care', 'care feel', 'base note'],
  'KO-W32-DE-001': ['starter set', 'starter-set', 'erstes set', 'doterra set', 'einsteiger', 'beratung vor kauf'],
  'KO-W32-DE-002': ['introductory kit', 'einschreibungs-kit', 'enrolment kit', 'einsteiger kit', 'kleines set', 'konto starten'],
  'KO-W32-DE-003': ['family essentials kit', 'familien set', 'familie', 'kinder', 'sicherheit', 'basisöle'],
  'KO-W32-DE-004': ['home essentials kit', 'großes set', 'einstieg', 'zu viel', 'produktauswahl', 'routinen'],
  'KO-W32-DE-005': ['wholesale customer', 'wellness advocate', 'kundenkonto', 'berater werden', 'partner werden', 'kontoart'],
  'KO-W32-DE-006': ['doterra kundenkonto', 'konto erstellen', 'einschreibung', 'bestellung', 'kunden werden'],
  'KO-W32-DE-007': ['lrp', 'treueprogramm', 'loyalty rewards', 'wiederbestellung', 'punkte', 'monatliche bestellung'],
  'KO-W32-DE-008': ['berater werden', 'partner werden', 'wellness advocate', 'doterra business', 'business möglichkeit', 'team'],
  'KO-W32-EN-001': ['starter kit', 'first kit', 'doterra kit', 'beginner kit', 'guidance before buying'],
  'KO-W32-EN-002': ['introductory kit', 'enrolment kit', 'starter kit', 'small kit', 'start account'],
  'KO-W32-EN-003': ['family essentials kit', 'family kit', 'family', 'children', 'safety', 'basic oils'],
  'KO-W32-EN-004': ['home essentials kit', 'large kit', 'strong start', 'too much', 'product choice', 'routines'],
  'KO-W32-EN-005': ['wholesale customer', 'wellness advocate', 'customer account', 'become advisor', 'partner', 'account type'],
  'KO-W32-EN-006': ['doterra customer account', 'create account', 'enrolment', 'order', 'become customer'],
  'KO-W32-EN-007': ['lrp', 'loyalty rewards', 'loyalty program', 'reorder', 'points', 'monthly order'],
  'KO-W32-EN-008': ['become advisor', 'become partner', 'wellness advocate', 'doterra business', 'business opportunity', 'team'],
  'KO-W35-DE-001': ['warum über kyle', 'direkt im shop', 'shop link', 'beratung vor kauf', 'warum berater', 'persönliche empfehlung'],
  'KO-W35-DE-002': ['doterra teuer', 'zu teuer', 'preis', 'lohnt sich doterra', 'kosten', 'einkaufspreis'],
  'KO-W35-DE-003': ['amazon öle', 'günstige öle', 'billige ätherische öle', 'qualität', 'warum doterra', 'preisvergleich'],
  'KO-W35-DE-004': ['großes starter-set', 'muss ich ein set kaufen', 'kleines set', 'starter kit', 'einstieg', 'home essentials'],
  'KO-W35-DE-005': ['monatlich bestellen', 'muss ich monatlich bestellen', 'lrp pflicht', 'loyalty rewards', 'treueprogramm', 'wiederbestellung'],
  'KO-W35-DE-006': ['ist doterra mlm', 'network marketing', 'multi level marketing', 'strukturvertrieb', 'berater werden', 'einkommen'],
  'KO-W35-DE-007': ['nach dem kauf', 'begleitung nach kauf', 'onboarding', 'support', 'fragen nach bestellung', 'team materialien'],
  'KO-W35-DE-008': ['später berater werden', 'selbst berater werden', 'wellness advocate', 'partner werden', 'business möglichkeit', 'team onboarding'],
  'KO-W35-EN-001': ['why through kyle', 'directly in shop', 'shop link', 'guidance before buying', 'why advisor', 'personal recommendation'],
  'KO-W35-EN-002': ['doterra expensive', 'too expensive', 'price', 'is doterra worth it', 'cost', 'wholesale price'],
  'KO-W35-EN-003': ['amazon oils', 'cheaper oils', 'cheap essential oils', 'quality', 'why doterra', 'price comparison'],
  'KO-W35-EN-004': ['large starter kit', 'do i have to buy a kit', 'small kit', 'starter kit', 'home essentials', 'first order'],
  'KO-W35-EN-005': ['order monthly', 'do i have to order monthly', 'lrp required', 'loyalty rewards', 'loyalty program', 'recurring order'],
  'KO-W35-EN-006': ['is doterra mlm', 'network marketing', 'multi level marketing', 'direct sales', 'become advisor', 'income'],
  'KO-W35-EN-007': ['after purchase', 'support after purchase', 'onboarding', 'support', 'questions after order', 'team materials'],
  'KO-W35-EN-008': ['become advisor later', 'become an advisor', 'wellness advocate', 'become partner', 'business possibility', 'team onboarding'],
  'KO-W37-DE-001': ['erste 30 tage', '30 tage start', 'doterra startplan', 'nach dem kauf', 'erste routine', 'starter routine'],
  'KO-W37-DE-002': ['woche 1', 'öle auspacken', 'labels lesen', 'produktlabel', 'fragen sammeln', 'unboxing'],
  'KO-W37-DE-003': ['diffuser routine', 'diffuser einstieg', 'raumduft', 'duft zu stark', 'kinder haustiere', 'lüften'],
  'KO-W37-DE-004': ['woche 2', 'abendroutine', 'schlafroutine', 'lavender', 'serenity', 'duftanker'],
  'KO-W37-DE-005': ['topische anwendung', 'verdünnung', 'trägeröl', 'patch test', 'hautreaktion', 'hot oils'],
  'KO-W37-DE-006': ['woche 3', 'kernroutinen', 'drei routinen', 'alltagsroutine', 'öle routine', 'einfach starten'],
  'KO-W37-DE-007': ['woche 4', 'nachsortieren', 'fragen klären', '30 tage check', 'nach dem kauf', 'nichts erzwingen'],
  'KO-W37-DE-008': ['30 tage check', 'check mit kyle', 'beratung nach kauf', 'produkte sortieren', 'nächste schritte', 'lrp sinnvoll'],
  'KO-W37-EN-001': ['first 30 days', '30 day start', 'doterra start plan', 'after purchase', 'first routine', 'starter routine'],
  'KO-W37-EN-002': ['week 1', 'unbox oils', 'read labels', 'product label', 'collect questions', 'unboxing'],
  'KO-W37-EN-003': ['diffuser routine', 'diffuser start', 'room scent', 'scent too strong', 'children pets', 'ventilation'],
  'KO-W37-EN-004': ['week 2', 'evening routine', 'sleep routine', 'lavender', 'serenity', 'scent anchor'],
  'KO-W37-EN-005': ['topical use', 'dilution', 'carrier oil', 'patch test', 'skin reaction', 'hot oils'],
  'KO-W37-EN-006': ['week 3', 'core routines', 'three routines', 'everyday routine', 'oil routine', 'start simple'],
  'KO-W37-EN-007': ['week 4', 'review', 'clarify questions', '30 day check', 'after purchase', 'force nothing'],
  'KO-W37-EN-008': ['30 day check', 'check with kyle', 'guidance after purchase', 'sort products', 'next steps', 'lrp make sense'],
  'KO-W38-DE-001': ['petitgrain', 'bitterorange', 'grüner duft', 'abendroutine', 'körperpflege', 'zitrus alternative'],
  'KO-W38-DE-002': ['arborvitae', 'lebensbaum', 'holzduft', 'waldduft', 'raumduft', 'holzpflege'],
  'KO-W38-DE-003': ['blue tansy', 'blauer rainfarn', 'deep blue', 'massage', 'körperpflege', 'hautgefühl'],
  'KO-W38-DE-004': ['helichrysum', 'immortelle', 'hautpflege', 'premiumöl', 'hautgefühl', 'pflegeöl'],
  'KO-W38-DE-005': ['myrrh', 'myrrhe', 'harzduft', 'hautpflege', 'ritual', 'meditation'],
  'KO-W38-DE-006': ['turmeric', 'kurkuma', 'würziges öl', 'küche', 'label', 'innere anwendung'],
  'KO-W38-DE-007': ['clove', 'gewürznelke', 'on guard', 'hot oil', 'verdünnung', 'gewürzduft'],
  'KO-W38-DE-008': ['thyme', 'thymian', 'kräuteröl', 'küche', 'verdünnung', 'starkes öl'],
  'KO-W38-EN-001': ['petitgrain', 'bitter orange', 'green scent', 'evening routine', 'body care', 'citrus alternative'],
  'KO-W38-EN-002': ['arborvitae', 'woody scent', 'forest scent', 'room scent', 'wood care', 'diffuser blend'],
  'KO-W38-EN-003': ['blue tansy', 'deep blue', 'massage', 'body care', 'skin feel', 'blue oil'],
  'KO-W38-EN-004': ['helichrysum', 'skin care', 'premium oil', 'skin feel', 'care oil', 'immortelle'],
  'KO-W38-EN-005': ['myrrh', 'resin scent', 'skin care', 'ritual', 'meditation', 'balsamic'],
  'KO-W38-EN-006': ['turmeric', 'spicy oil', 'kitchen', 'label', 'internal use', 'turmeric oil'],
  'KO-W38-EN-007': ['clove', 'on guard', 'hot oil', 'dilution', 'spice scent', 'seasonal blend'],
  'KO-W38-EN-008': ['thyme', 'herbal oil', 'kitchen', 'dilution', 'strong oil', 'spicy herb'],
  'KO-W39-DE-001': ['saisonale düfte', 'jahreszeiten öle', 'winter diffuser', 'herbst duft', 'raumduft saison', 'krankheitsversprechen'],
  'KO-W39-DE-002': ['raum reset', '5 minuten reset', 'lüften', 'raumduft', 'wild orange', 'petitgrain'],
  'KO-W39-DE-003': ['küche nach kochen', 'küchenduft', 'zitrus küche', 'kräuteröl küche', 'duft reset', 'reinigung keine claims'],
  'KO-W39-DE-004': ['bad duft', 'gästebad', 'frischer duft', 'tea tree', 'eucalyptus', 'kleiner raum'],
  'KO-W39-DE-005': ['wäsche duft', 'schrank duft', 'textilien ätherische öle', 'kleidung öl', 'lavender cedarwood', 'flecken'],
  'KO-W39-DE-006': ['auto duft', 'duft unterwegs', 'ätherische öle auto', 'fahrt sicherheit', 'wenig duft', 'mitfahrer'],
  'KO-W39-DE-007': ['duft gäste', 'gäste duft', 'duftetikette', 'besuch zuhause', 'dezenter duft', 'duft empfindlichkeit', 'gastfreundlich'],
  'KO-W39-DE-008': ['haushaltsroutine', 'reinigung ohne claims', 'desinfektionsclaim', 'frischer haushalt', 'lemon tea tree', 'oberflächen'],
  'KO-W39-EN-001': ['seasonal scents', 'seasonal oils', 'winter diffuser', 'autumn scent', 'room scent season', 'illness promises'],
  'KO-W39-EN-002': ['room reset', '5 minute reset', 'ventilate', 'room scent', 'wild orange', 'petitgrain'],
  'KO-W39-EN-003': ['kitchen after cooking', 'kitchen scent', 'citrus kitchen', 'herbal oil kitchen', 'scent reset', 'no cleaning claims'],
  'KO-W39-EN-004': ['bathroom scent', 'guest bathroom', 'fresh scent', 'tea tree', 'eucalyptus', 'small room'],
  'KO-W39-EN-005': ['laundry scent', 'closet scent', 'textiles essential oils', 'clothing oil', 'lavender cedarwood', 'stains'],
  'KO-W39-EN-006': ['car scent', 'scent on the go', 'essential oils car', 'driving safety', 'little scent', 'passengers'],
  'KO-W39-EN-007': ['scent guests', 'scent etiquette', 'visitors home', 'subtle scent', 'scent sensitivity', 'welcoming'],
  'KO-W39-EN-008': ['household routine', 'cleaning without claims', 'disinfecting claim', 'fresh home', 'lemon tea tree', 'surfaces'],
};

export const knowledgeArticles: KnowledgeArticle[] = germanIndex.map((item) => {
  const source = rawGermanArticles.find((article) => article.values.id === item.id);
  if (!source) throw new Error(`Missing approved content for ${item.id}`);
  const risk = item.risk ?? item.riskLevel ?? 'medium';

  return {
    ...item,
    worldId: normalizeWorldId(item.worldId),
    risk,
    relatedArticleIds: item.relatedArticleIds ?? item.related ?? [],
    cta: optionalString(source.values.cta),
    reviewedBy: String(source.values.reviewedBy),
    medicalDisclaimerRequired: source.values.medicalDisclaimerRequired === true,
    searchKeywords: pillarSearchKeywords[item.id] ?? [],
    blocks: toBlocks(source.body),
  };
});

export const englishKnowledgeArticles: EnglishKnowledgeArticle[] = englishIndex.map((item) => {
  const source = rawEnglishArticles.find((article) => article.values.id === item.id);
  if (!source) throw new Error(`Missing approved content for ${item.id}`);
  const translationPairId = item.pair ?? item.translationPairId;
  const sourceDeId = item.sourceDeId ?? (translationPairId
    ? germanIndex.find((article) => article.pair === translationPairId || article.translationPairId === translationPairId)?.id
    : undefined);
  if (!sourceDeId) throw new Error(`Missing German language pair for ${item.id}`);

  return {
    ...item,
    worldId: normalizeWorldId(item.worldId),
    sourceDeId,
    relatedArticleIds: item.relatedArticleIds ?? item.related ?? [],
    cta: optionalString(source.values.cta),
    reviewedBy: String(source.values.reviewedBy),
    medicalDisclaimerRequired: source.values.medicalDisclaimerRequired === true,
    searchKeywords: pillarSearchKeywords[item.id] ?? [],
    blocks: toBlocks(source.body),
  };
});

export const knowledgeArticleRoutePairs = englishKnowledgeArticles.flatMap((article) => {
  const germanArticle = knowledgeArticles.find((item) => item.id === article.sourceDeId);
  return germanArticle ? [{ de: germanArticle.route, en: article.route }] : [];
});

export function getKnowledgeArticleByRoute(route: string) {
  return knowledgeArticles.find((article) => article.route === route);
}

export function getKnowledgeArticlesForWorld(worldId: KnowledgeWorldId) {
  return knowledgeArticles.filter((article) => article.worldId === worldId);
}
