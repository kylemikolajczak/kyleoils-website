export type Locale = 'de' | 'en';

export const routePairs = [
  { de: '/de/', en: '/en/' },
  { de: '/de/beratung/', en: '/en/consultation/' },
  { de: '/de/oele-routinen/', en: '/en/oils-routines/' },
  { de: '/de/starter-sets/', en: '/en/starter-sets/' },
  { de: '/de/workshops/', en: '/en/workshops/' },
  { de: '/de/ueber-kyle/', en: '/en/about-kyle/' },
  { de: '/de/kontakt/', en: '/en/contact/' },
  { de: '/de/faq/', en: '/en/faq/' },
  { de: '/de/doterra-verstehen/', en: '/en/understanding-doterra/' },
  { de: '/de/business-moeglichkeit/', en: '/en/business-opportunity/' },
  { de: '/de/impressum/', en: '/en/legal-notice/' },
  { de: '/de/datenschutz/', en: '/en/privacy-policy/' },
  { de: '/404.html', en: '/en/404/' },
] as const;

const normalizePath = (path: string) => {
  if (path === '/404' || path === '/404/') return '/404.html';
  if (path.endsWith('.html')) return path;
  return path.endsWith('/') ? path : `${path}/`;
};

export function getLanguagePaths(path: string) {
  const normalizedPath = normalizePath(path);
  const pair = routePairs.find((item) => item.de === normalizedPath || item.en === normalizedPath);
  return pair ?? { de: '/de/', en: '/en/' };
}
