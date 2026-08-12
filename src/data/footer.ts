import { additionalNavigation, mainNavigation } from './navigation';
import { contactLinks, officialLinks } from './externalLinks';
import { englishContactLinks, englishOfficialLinks } from './externalLinks';
import { englishAdditionalNavigation, englishMainNavigation } from './navigation';

export const footerData = {
  brand: 'Kyle Daniel Mikolajczak',
  claim: 'Natürliche Routinen. Persönliche Beratung.',
  description: 'Persönliche doTERRA Wellness Beratung für natürliche Routinen und verständliche Orientierung',
  primaryNavigation: [mainNavigation[0], additionalNavigation[0], mainNavigation[1], mainNavigation[5], mainNavigation[6]],
  offersAndKnowledge: [
    { label: 'Öl-Lexikon', href: '/de/wissen/oel-lexikon/' },
    { label: 'Sicher anwenden', href: '/de/wissen/sicher-anwenden/' },
    { label: 'Produkte & Systeme', href: '/de/wissen/produkte-systeme/' },
    mainNavigation[3],
    mainNavigation[4],
    { label: 'Glossar', href: '/de/wissen/glossar/' },
  ],
  contactLinks: [contactLinks.whatsapp, contactLinks.email],
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
  primaryNavigation: [englishMainNavigation[0], englishAdditionalNavigation[0], englishMainNavigation[1], englishMainNavigation[5], englishMainNavigation[6]],
  offersAndKnowledge: [
    { label: 'Oil Library', href: '/en/knowledge/oil-library/' },
    { label: 'Safe Use', href: '/en/knowledge/safe-use/' },
    { label: 'Products & Systems', href: '/en/knowledge/products-systems/' },
    englishMainNavigation[3],
    englishMainNavigation[4],
    { label: 'Glossary', href: '/en/knowledge/glossary/' },
  ],
  contactLinks: [englishContactLinks.whatsapp, englishContactLinks.email],
  officialLinks: Object.values(englishOfficialLinks),
  legalNavigation: [
    { label: 'Legal Notice', href: '/en/legal-notice/' },
    { label: 'Privacy Policy', href: '/en/privacy-policy/' },
  ],
} as const;
