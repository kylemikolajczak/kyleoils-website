import type { Locale } from './locales';

export type KnowledgeWorldId =
  | 'understanding-essential-oils'
  | 'safe-use'
  | 'oil-library'
  | 'routines'
  | 'everyday-use'
  | 'products-systems'
  | 'faq'
  | 'glossary';

export interface KnowledgeWorld {
  id: KnowledgeWorldId;
  label: Record<Locale, string>;
  description: Record<Locale, string>;
  intro: Record<Locale, string>;
  href: Record<Locale, string>;
}

export const knowledgeLanding = {
  href: { de: '/de/wissen/', en: '/en/knowledge/' },
  label: { de: 'Wissen', en: 'Knowledge' },
  title: { de: 'Ätherische Öle verständlich erklärt', en: 'Essential Oils, Clearly Explained' },
  description: {
    de: 'Grundlagen, sichere Anwendung und Orientierung für Abendroutine, Familie, Produktauswahl und weitere Alltagsthemen.',
    en: 'Clear basics, safe-use guidance and orientation for evening routines, family life, product choice and other everyday themes.',
  },
} as const;

export const knowledgeWorlds: KnowledgeWorld[] = [
  {
    id: 'understanding-essential-oils',
    label: { de: 'Ätherische Öle verstehen', en: 'Understanding Essential Oils' },
    description: {
      de: 'Grundlagen für einen verständlichen und ruhigen Einstieg.',
      en: 'The essentials for a clear and calm starting point.',
    },
    intro: {
      de: 'Hier findest du Grundlagen, die dir helfen, ätherische Öle und ihre Produktwelt besser einzuordnen.',
      en: 'This area brings together the basics to help you better understand essential oils and their product range.',
    },
    href: { de: '/de/wissen/aetherische-oele-verstehen/', en: '/en/knowledge/understanding-essential-oils/' },
  },
  {
    id: 'safe-use',
    label: { de: 'Sicher anwenden', en: 'Safe Use' },
    description: {
      de: 'Sichere Orientierung für Familien, Raumgröße, Verdünnung und bewusste Alltagsroutinen.',
      en: 'Safe guidance for families, room size, dilution and conscious everyday routines.',
    },
    intro: {
      de: 'Für Haushalte mit Kindern, Haustieren oder Besuch, in denen Duft, Aufbewahrung, Verdünnung und Raumgröße bewusst geplant werden sollten.',
      en: 'For homes with children, pets or visitors where scent, storage, dilution and room size should be planned consciously.',
    },
    href: { de: '/de/wissen/sicher-anwenden/', en: '/en/knowledge/safe-use/' },
  },
  {
    id: 'oil-library',
    label: { de: 'Öl-Lexikon', en: 'Oil Library' },
    description: {
      de: 'Eine klare Bibliothek für einzelne Öle und Mischungen.',
      en: 'A clear library for individual oils and blends.',
    },
    intro: {
      de: 'Das Öl-Lexikon wird einzelne Öle und Mischungen verständlich und ohne Druck einordnen.',
      en: 'The Oil Library will offer clear, no-pressure orientation for individual oils and blends.',
    },
    href: { de: '/de/wissen/oel-lexikon/', en: '/en/knowledge/oil-library/' },
  },
  {
    id: 'routines',
    label: { de: 'Routinen', en: 'Routines' },
    description: {
      de: 'Abendroutine, bewusste Pausen und Duftanker für einen klaren Alltag.',
      en: 'Evening routines, conscious pauses and scent anchors for a more intentional everyday life.',
    },
    intro: {
      de: 'Für Menschen, die ihre Schlafenszeit bewusster gestalten, kleine Pausen setzen und Duft als persönlichen Anker nutzen möchten.',
      en: 'For people who want to approach bedtime more consciously, make space for small pauses and use scent as a personal anchor.',
    },
    href: { de: '/de/wissen/routinen/', en: '/en/knowledge/routines/' },
  },
  {
    id: 'everyday-use',
    label: { de: 'Ätherische Öle im Alltag', en: 'Everyday Use' },
    description: {
      de: 'Alltagsnahe Orientierung für verschiedene Lebensbereiche.',
      en: 'Everyday orientation for different parts of daily life.',
    },
    intro: {
      de: 'Diese Wissenswelt sammelt alltagsnahe Themen und ordnet sie verständlich ein.',
      en: 'This knowledge world brings together everyday topics and explains them clearly.',
    },
    href: { de: '/de/wissen/alltag/', en: '/en/knowledge/everyday-use/' },
  },
  {
    id: 'products-systems',
    label: { de: 'Produkte & Systeme', en: 'Products & Systems' },
    description: {
      de: 'Orientierung bei Produktauswahl, Sets und einfachen Routinen.',
      en: 'Guidance for product choice, sets and simple routines.',
    },
    intro: {
      de: 'Für Menschen, die wissen möchten, welches Öl, welches Set oder welche Routine wirklich zu ihrem Alltag passt, ohne sich im Sortiment zu verlieren.',
      en: 'For people who want to understand which oil, set or routine fits their daily life, without getting lost in the range.',
    },
    href: { de: '/de/wissen/produkte-systeme/', en: '/en/knowledge/products-systems/' },
  },
  {
    id: 'faq',
    label: { de: 'FAQ', en: 'FAQ' },
    description: {
      de: 'Häufige Fragen klar und ruhig beantwortet.',
      en: 'Common questions answered clearly and calmly.',
    },
    intro: {
      de: 'Hier werden häufige Fragen rund um ätherische Öle, Routinen und Orientierung gebündelt.',
      en: 'This world will bring together common questions about essential oils, routines and practical orientation.',
    },
    href: { de: '/de/wissen/faq/', en: '/en/knowledge/faq/' },
  },
  {
    id: 'glossary',
    label: { de: 'Glossar', en: 'Glossary' },
    description: {
      de: 'Begriffe einfach und nachvollziehbar erklärt.',
      en: 'Terms explained simply and clearly.',
    },
    intro: {
      de: 'Das Glossar wird wichtige Begriffe kurz, klar und ohne Fachsprache erklären.',
      en: 'The glossary will explain important terms briefly, clearly and without unnecessary jargon.',
    },
    href: { de: '/de/wissen/glossar/', en: '/en/knowledge/glossary/' },
  },
];

export const knowledgeRoutePairs = [
  { de: knowledgeLanding.href.de, en: knowledgeLanding.href.en },
  ...knowledgeWorlds.map((world) => ({ de: world.href.de, en: world.href.en })),
] as const;

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function getKnowledgeBreadcrumbs(locale: Locale, worldId?: KnowledgeWorldId, articleTitle?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: locale === 'de' ? 'Start' : 'Home', href: locale === 'de' ? '/de/' : '/en/' },
    { label: knowledgeLanding.label[locale], href: knowledgeLanding.href[locale] },
  ];
  const world = worldId ? knowledgeWorlds.find((item) => item.id === worldId) : undefined;
  if (world) items.push({ label: world.label[locale], href: world.href[locale] });
  if (articleTitle) items.push({ label: articleTitle });
  return items;
}

export function getKnowledgeWorldBySlug(locale: Locale, slug: string) {
  return knowledgeWorlds.find((world) => world.href[locale].split('/').filter(Boolean).at(-1) === slug);
}
