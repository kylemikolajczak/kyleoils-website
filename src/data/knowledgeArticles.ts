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
  cta: string;
  reviewedBy: string;
  medicalDisclaimerRequired: boolean;
  relatedArticleIds: string[];
  blocks: ArticleBlock[];
}

export interface EnglishKnowledgeArticle extends Omit<KnowledgeArticle, 'risk'> {
  sourceDeId: string;
}

export type KnowledgeArticleSummary = Pick<KnowledgeArticle, 'title' | 'route' | 'worldId' | 'worldLabel' | 'description'>;

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

export const knowledgeArticles: KnowledgeArticle[] = germanIndex.map((item) => {
  const source = rawGermanArticles.find((article) => article.values.id === item.id);
  if (!source) throw new Error(`Missing approved content for ${item.id}`);
  const risk = item.risk ?? item.riskLevel ?? 'medium';

  return {
    ...item,
    worldId: normalizeWorldId(item.worldId),
    risk,
    relatedArticleIds: item.relatedArticleIds ?? item.related ?? [],
    cta: String(source.values.cta),
    reviewedBy: String(source.values.reviewedBy),
    medicalDisclaimerRequired: source.values.medicalDisclaimerRequired === true,
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
    cta: String(source.values.cta),
    reviewedBy: String(source.values.reviewedBy),
    medicalDisclaimerRequired: source.values.medicalDisclaimerRequired === true,
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
