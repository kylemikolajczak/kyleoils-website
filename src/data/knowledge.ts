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
  seoTitle: Record<Locale, string>;
  seoDescription: Record<Locale, string>;
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
    seoTitle: { de: 'Ätherische Öle verstehen | Grundlagen & Anwendung | Kyle Oils', en: 'Understanding Essential Oils | Basics & Use | Kyle Oils' },
    seoDescription: {
      de: 'Grundlagen zu ätherischen Ölen: Duft, Anwendungsmöglichkeiten, Routinen und ein sicherer Einstieg verständlich erklärt.',
      en: 'Clear essential-oil basics: scent, ways to use oils, routines and a safety-aware place to begin.',
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
    seoTitle: { de: 'Ätherische Öle sicher anwenden | Kyle Oils', en: 'Safe Use of Essential Oils | Kyle Oils' },
    seoDescription: {
      de: 'Praktische Orientierung zu Verdünnung, Aufbewahrung, Raumgröße, Haut, Familie und weiteren Sicherheitsfragen.',
      en: 'Practical guidance on dilution, storage, room size, skin, family life and other essential-oil safety questions.',
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
    seoTitle: { de: 'Öl-Lexikon | Einzelöle & Mischungen | Kyle Oils', en: 'Oil Library | Single Oils & Blends | Kyle Oils' },
    seoDescription: {
      de: 'Einzelöle und Mischungen verständlich einordnen: Duftprofile, Alltagskontext, Anwendungsmöglichkeiten und Sicherheit.',
      en: 'Explore single oils and blends with clear scent profiles, everyday context, ways to use them and safety guidance.',
    },
    intro: {
      de: 'Das Öl-Lexikon ordnet einzelne Öle und Mischungen verständlich ein, mit Duftprofil, Alltagskontext und wichtigen Sicherheitshinweisen.',
      en: 'The Oil Library explains individual oils and blends clearly, with scent profiles, everyday context and important safety notes.',
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
    seoTitle: { de: 'Routinen mit ätherischen Ölen | Alltag & Abend | Kyle Oils', en: 'Essential Oil Routines | Everyday Life & Evening | Kyle Oils' },
    seoDescription: {
      de: 'Einfache Routinen für Morgen, Abend, Zuhause und unterwegs. Finde einen alltagstauglichen Einstieg ohne Überforderung.',
      en: 'Simple routines for mornings, evenings, home and life on the go. Find an everyday-friendly place to begin.',
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
    seoTitle: { de: 'Ätherische Öle im Alltag | Raumduft & Routinen | Kyle Oils', en: 'Essential Oils in Everyday Life | Scent & Routines | Kyle Oils' },
    seoDescription: {
      de: 'Ideen für bewussten Raumduft, Zuhause, Reisen und kleine Duftmomente im Alltag, mit praktischen Sicherheitshinweisen.',
      en: 'Ideas for intentional room scent, home, travel and small scent moments in daily life, with practical safety guidance.',
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
    seoTitle: { de: 'doTERRA Produkte & Systeme verstehen | Kyle Oils', en: 'Understanding doTERRA Products & Systems | Kyle Oils' },
    seoDescription: {
      de: 'Produkte, Starter-Sets, Konten und Systeme nachvollziehbar einordnen. Finde heraus, welche nächsten Schritte zu dir passen.',
      en: 'Make sense of products, starter kits, accounts and systems. Find next steps that genuinely fit your needs.',
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
    seoTitle: { de: 'FAQ zu ätherischen Ölen & doTERRA | Kyle Oils', en: 'Essential Oil & doTERRA Knowledge FAQs | Kyle Oils' },
    seoDescription: {
      de: 'Antworten auf häufige Fragen zu Anwendung, Sicherheit, Produkten, Starter-Sets, Beratung und dem Einstieg mit doTERRA.',
      en: 'Answers to common questions about use, safety, products, starter kits, guidance and getting started with doTERRA.',
    },
    intro: {
      de: 'Hier findest du häufige Fragen rund um ätherische Öle, Routinen, Sicherheit und Produktauswahl übersichtlich gebündelt.',
      en: 'Here you will find common questions about essential oils, routines, safety and product choice gathered in one place.',
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
    seoTitle: { de: 'Glossar ätherischer Öle | Begriffe einfach erklärt | Kyle Oils', en: 'Essential Oil Glossary | Terms Clearly Explained | Kyle Oils' },
    seoDescription: {
      de: 'Wichtige Begriffe zu ätherischen Ölen, Anwendung, Qualität und Produkten kurz und verständlich erklärt.',
      en: 'Important terms about essential oils, use, quality and products explained briefly and clearly.',
    },
    intro: {
      de: 'Das Glossar erklärt wichtige Begriffe kurz, klar und ohne unnötige Fachsprache.',
      en: 'The glossary explains important terms briefly, clearly and without unnecessary jargon.',
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
