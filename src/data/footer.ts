import { additionalNavigation, mainNavigation } from './navigation';
import { contactLinks, officialLinks } from './externalLinks';
import { englishContactLinks, englishOfficialLinks } from './externalLinks';
import { englishAdditionalNavigation, englishMainNavigation } from './navigation';

export const footerData = {
  brand: 'Kyle Daniel Mikolajczak',
  claim: 'Natürliche Routinen. Persönliche Beratung.',
  description: 'Persönliche doTERRA Wellness Beratung für natürliche Routinen und verständliche Orientierung',
  primaryNavigation: [mainNavigation[0], mainNavigation[1], mainNavigation[2], mainNavigation[3], mainNavigation[4], mainNavigation[5], mainNavigation[6]],
  knowledgeLinks: [
    additionalNavigation[0],
    { label: 'Startpfad', href: '/de/startbereich/' },
    { label: '30-Tage-Startplan', href: '/de/30-tage-startplan/' },
    { label: 'Öl-Lexikon', href: '/de/wissen/oel-lexikon/' },
    { label: 'Sicher anwenden', href: '/de/wissen/sicher-anwenden/' },
    { label: 'Produkte & Systeme', href: '/de/wissen/produkte-systeme/' },
    { label: 'FAQ: schnelle Antworten', href: '/de/faq/' },
    { label: 'Glossar', href: '/de/wissen/glossar/' },
  ],
  contactLinks: [
    contactLinks.whatsapp,
    contactLinks.email,
    { label: 'doTERRA Beratung Lüneburg', href: '/de/doterra-beratung-lueneburg/' },
    additionalNavigation[3],
  ],
  officialLinks: Object.values(officialLinks),
  legalNavigation: [
    { label: 'Impressum', href: '/de/impressum/' },
    { label: 'Datenschutz', href: '/de/datenschutz/' },
  ],
} as const;

export const englishFooterData = {
  brand: 'Kyle Daniel Mikolajczak',
  claim: 'Natural routines. Personal support.',
  description: 'Personal doTERRA support for natural routines and clear, practical guidance.',
  primaryNavigation: [englishMainNavigation[0], englishMainNavigation[1], englishMainNavigation[2], englishMainNavigation[3], englishMainNavigation[4], englishMainNavigation[5], englishMainNavigation[6]],
  knowledgeLinks: [
    englishAdditionalNavigation[0],
    { label: 'Start Here', href: '/en/start-here/' },
    { label: '30-Day Start Plan', href: '/en/30-day-start-plan/' },
    { label: 'Oil Library', href: '/en/knowledge/oil-library/' },
    { label: 'Safe Use', href: '/en/knowledge/safe-use/' },
    { label: 'Products & Systems', href: '/en/knowledge/products-systems/' },
    { label: 'FAQ: Quick Answers', href: '/en/faq/' },
    { label: 'Glossary', href: '/en/knowledge/glossary/' },
  ],
  contactLinks: [
    englishContactLinks.whatsapp,
    englishContactLinks.email,
    { label: 'Essential Oil Guidance Germany', href: '/en/essential-oil-guidance-germany/' },
    englishAdditionalNavigation[3],
  ],
  officialLinks: Object.values(englishOfficialLinks),
  legalNavigation: [
    { label: 'Legal Notice', href: '/en/legal-notice/' },
    { label: 'Privacy Policy', href: '/en/privacy-policy/' },
  ],
} as const;
