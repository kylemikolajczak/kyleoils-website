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
    anchors: ['.hero', '.oils-methods', '.oils-safety-note', '.oils-interests', '.oils-routine'],
  },
  '/en/oils-routines/': {
    words: ['UNDERSTAND', 'USE', 'SAFETY', 'EXPLORE', 'ROUTINE'],
    anchors: ['.hero', '.oils-methods', '.oils-safety-note', '.oils-interests', '.oils-routine'],
  },
  '/de/doterra-verstehen/': {
    words: ['VERSTEHEN', 'QUALITÄT', 'HERKUNFT', 'PRODUKTE', 'KONTO', 'BEGLEITUNG'],
    anchors: ['.hero', '.dt-quality', '.dt-sourcing', '.dt-products', '.dt-account', '.dt-support'],
  },
  '/en/understanding-doterra/': {
    words: ['UNDERSTAND', 'QUALITY', 'SOURCING', 'PRODUCTS', 'ACCOUNT', 'SUPPORT'],
    anchors: ['.hero', '.dt-quality', '.dt-sourcing', '.dt-products', '.dt-account', '.dt-support'],
  },
  '/de/starter-sets/': {
    words: ['ORIENTIEREN', 'VERGLEICHEN', 'ABWÄGEN', 'WÄHLEN', 'STARTEN'],
    anchors: ['.hero', '.starter-decision', '.starter-pricing', '.starter-set-list', '.starter-orientation'],
  },
  '/en/starter-sets/': {
    words: ['ORIENT', 'COMPARE', 'CONSIDER', 'CHOOSE', 'BEGIN'],
    anchors: ['.hero', '.starter-decision', '.starter-pricing', '.starter-set-list', '.starter-orientation'],
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
    anchors: ['.hero', '.consultation-overview', '.consultation-process', '.consultation-topics', '.cta-section'],
  },
  '/en/consultation/': {
    words: ['LISTEN', 'CLARIFY', 'GUIDE', 'DECIDE', 'SUPPORT'],
    anchors: ['.hero', '.consultation-overview', '.consultation-process', '.consultation-topics', '.cta-section'],
  },
  '/de/ueber-kyle/': {
    words: ['WEG', 'WERTE', 'ALLTAG', 'ROLLE', 'VERTRAUEN', 'BEGLEITUNG'],
    anchors: ['.hero', '.about-path', '.about-routines', '.about-role', '.about-method', '.about-audience'],
  },
  '/en/about-kyle/': {
    words: ['JOURNEY', 'VALUES', 'EVERYDAY', 'ROLE', 'TRUST', 'SUPPORT'],
    anchors: ['.hero', '.about-path', '.about-routines', '.about-role', '.about-method', '.about-audience'],
  },
  '/de/kontakt/': {
    words: ['ANSPRECHEN', 'KONTAKT', 'VOR ORT', 'VERBINDEN'],
    anchors: ['.hero', '#contact-options', '.local-guidance-section', '.social-section'],
  },
  '/en/contact/': {
    words: ['REACH OUT', 'CONTACT', 'LOCAL', 'CONNECT'],
    anchors: ['.hero', '#contact-options', '.local-guidance-section', '.social-section'],
  },
  '/de/faq/': {
    words: ['FRAGEN', 'ANTWORTEN', 'VERTIEFEN', 'KLÄREN'],
    anchors: ['.hero', '.faq-category', '.faq-knowledge', '.cta-section'],
  },
  '/en/faq/': {
    words: ['QUESTIONS', 'ANSWERS', 'EXPLORE', 'CLARIFY'],
    anchors: ['.hero', '.faq-category', '.faq-knowledge', '.cta-section'],
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
    anchors: ['.hero', '.workshops-outcomes', '.workshops-formats', '.workshops-preparation'],
  },
  '/en/workshops/': {
    words: ['DISCOVER', 'UNDERSTAND', 'EXPERIENCE', 'CLARIFY'],
    anchors: ['.hero', '.workshops-outcomes', '.workshops-formats', '.workshops-preparation'],
  },
  '/de/business-moeglichkeit/': {
    words: ['ERFAHRUNG', 'VERANTWORTUNG', 'PASSUNG', 'LERNEN', 'BEGLEITEN', 'AUFBAU'],
    anchors: ['.hero', '.business-values', '.business-fit', '.business-journey', '.business-discussion', '.cta-section'],
  },
  '/en/business-opportunity/': {
    words: ['EXPERIENCE', 'RESPONSIBILITY', 'FIT', 'LEARN', 'SUPPORT', 'BUILD'],
    anchors: ['.hero', '.business-values', '.business-fit', '.business-journey', '.business-discussion', '.cta-section'],
  },
};

export const getEssenceStory = (pathname: string): EssenceStory | undefined => stories[pathname];

export const essenceStoryRoutes = Object.freeze(Object.keys(stories));
