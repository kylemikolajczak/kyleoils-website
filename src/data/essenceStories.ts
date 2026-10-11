export interface EssenceStory {
  words: string[];
  anchors: string[];
}

const homeAnchors = [
  '.hero',
  '.section--nature',
  '.intent-section',
  '.knowledge-section',
  '.split-layout',
  '.next-paths-section',
];

const stories: Record<string, EssenceStory> = {
  '/de/': {
    words: ['ANKOMMEN', 'VERSTEHEN', 'ENTDECKEN', 'EINORDNEN', 'VERTRAUEN', 'STARTEN'],
    anchors: homeAnchors,
  },
  '/en/': {
    words: ['ARRIVE', 'UNDERSTAND', 'EXPLORE', 'CONSIDER', 'TRUST', 'BEGIN'],
    anchors: homeAnchors,
  },
  '/de/oele-routinen/': {
    words: ['VERSTEHEN', 'ANWENDEN', 'SICHERHEIT', 'ENTDECKEN', 'ROUTINE'],
    anchors: ['.hero', '.application-grid', '.intent-grid', '.split-layout', '.knowledge-continuation'],
  },
  '/en/oils-routines/': {
    words: ['UNDERSTAND', 'USE', 'SAFETY', 'EXPLORE', 'ROUTINE'],
    anchors: ['.hero', '.application-grid', '.intent-grid', '.split-layout', '.knowledge-continuation'],
  },
  '/de/doterra-verstehen/': {
    words: ['VERSTEHEN', 'QUALITÄT', 'HERKUNFT', 'PRODUKTE', 'KONTO', 'BEGLEITUNG'],
    anchors: ['.hero', '.fact-grid', '.section--sage .check-list', '.topic-grid', '.account-list', '.section--forest'],
  },
  '/en/understanding-doterra/': {
    words: ['UNDERSTAND', 'QUALITY', 'SOURCING', 'PRODUCTS', 'ACCOUNT', 'SUPPORT'],
    anchors: ['.hero', '.fact-grid', '.section--sage .check-list', '.topic-grid', '.account-list', '.section--forest'],
  },
  '/de/starter-sets/': {
    words: ['ORIENTIEREN', 'VERGLEICHEN', 'ABWÄGEN', 'WÄHLEN', 'STARTEN'],
    anchors: ['.hero', '.decision-section', '.starter-set-list', '.decision-guides', '.orientation-module'],
  },
  '/en/starter-sets/': {
    words: ['ORIENT', 'COMPARE', 'CONSIDER', 'CHOOSE', 'BEGIN'],
    anchors: ['.hero', '.decision-section', '.starter-set-list', '.decision-guides', '.orientation-module'],
  },
  '/de/startbereich/': {
    words: ['VERSTEHEN', 'WÄHLEN', 'SICHERHEIT', 'ROUTINE', 'ALLTAG', 'KLÄREN'],
    anchors: ['.academy-hero', '.academy-step:nth-of-type(1)', '.academy-step:nth-of-type(2)', '.academy-step:nth-of-type(3)', '.academy-step:nth-of-type(5)', '.academy-step--questions'],
  },
  '/en/start-here/': {
    words: ['UNDERSTAND', 'CHOOSE', 'SAFETY', 'ROUTINE', 'EVERYDAY', 'CLARIFY'],
    anchors: ['.academy-hero', '.academy-step:nth-of-type(1)', '.academy-step:nth-of-type(2)', '.academy-step:nth-of-type(3)', '.academy-step:nth-of-type(5)', '.academy-step--questions'],
  },
  '/de/beratung/': {
    words: ['ZUHÖREN', 'KLÄREN', 'EINORDNEN', 'ENTSCHEIDEN', 'BEGLEITEN'],
    anchors: ['.hero', '.page-shell > .section:nth-of-type(2)', '.section--sage', '.topic-grid', '.faq-layout'],
  },
  '/en/consultation/': {
    words: ['LISTEN', 'CLARIFY', 'GUIDE', 'DECIDE', 'SUPPORT'],
    anchors: ['.hero', '.page-shell > .section:nth-of-type(2)', '.section--sage', '.topic-grid', '.faq-layout'],
  },
  '/de/ueber-kyle/': {
    words: ['WEG', 'WERTE', 'ALLTAG', 'ROLLE', 'VERTRAUEN', 'BEGLEITUNG'],
    anchors: ['.hero', '.editorial-layout', '.page-shell > .section:nth-of-type(3)', '.page-shell > .section:nth-of-type(4)', '.section--forest', '.page-shell > .section:nth-of-type(7)'],
  },
  '/en/about-kyle/': {
    words: ['JOURNEY', 'VALUES', 'EVERYDAY', 'ROLE', 'TRUST', 'SUPPORT'],
    anchors: ['.hero', '.editorial-layout', '.page-shell > .section:nth-of-type(3)', '.page-shell > .section:nth-of-type(4)', '.section--forest', '.page-shell > .section:nth-of-type(7)'],
  },
  '/de/wissen/': {
    words: ['ORIENTIEREN', 'SUCHEN', 'VERSTEHEN', 'VERTIEFEN', 'ANWENDEN'],
    anchors: ['.knowledge-hero', '.knowledge-start-here', '.world-grid', '.knowledge-search', '.knowledge-cta'],
  },
  '/en/knowledge/': {
    words: ['ORIENT', 'SEARCH', 'UNDERSTAND', 'EXPLORE', 'APPLY'],
    anchors: ['.knowledge-hero', '.knowledge-start-here', '.world-grid', '.knowledge-search', '.knowledge-cta'],
  },
  '/de/workshops/': {
    words: ['ENTDECKEN', 'VERSTEHEN', 'ERLEBEN', 'KLÄREN'],
    anchors: ['.hero', '.format-grid', '.section--sage', '.cta-section'],
  },
  '/en/workshops/': {
    words: ['DISCOVER', 'UNDERSTAND', 'EXPERIENCE', 'CLARIFY'],
    anchors: ['.hero', '.format-grid', '.section--sage', '.cta-section'],
  },
  '/de/business-moeglichkeit/': {
    words: ['ERFAHRUNG', 'VERANTWORTUNG', 'PASSUNG', 'LERNEN', 'BEGLEITEN', 'AUFBAU'],
    anchors: ['.hero', '.page-shell > .section:nth-of-type(2)', '.section--sage', '.page-shell > .section:nth-of-type(4)', '.page-shell > .section:nth-of-type(5)', '.cta-section'],
  },
  '/en/business-opportunity/': {
    words: ['EXPERIENCE', 'RESPONSIBILITY', 'FIT', 'LEARN', 'SUPPORT', 'BUILD'],
    anchors: ['.hero', '.page-shell > .section:nth-of-type(2)', '.section--sage', '.page-shell > .section:nth-of-type(4)', '.page-shell > .section:nth-of-type(5)', '.cta-section'],
  },
};

export const getEssenceStory = (pathname: string): EssenceStory | undefined => stories[pathname];

export const essenceStoryRoutes = Object.freeze(Object.keys(stories));
