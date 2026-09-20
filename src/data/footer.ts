import { additionalNavigation, mainNavigation } from './navigation';
import { contactLinks, officialLinks } from './externalLinks';
import { englishContactLinks, englishOfficialLinks } from './externalLinks';
import { englishAdditionalNavigation, englishMainNavigation } from './navigation';

export const footerData = {
  brand: 'Kyle Daniel Mikolajczak',
  claim: 'Natürlich. Klar. Mit Kyle.',
  description: 'doTERRA Produkte und Routinen verständlich begleitet.',
  primaryNavigation: [mainNavigation[0], mainNavigation[1], mainNavigation[3], mainNavigation[4], mainNavigation[5], mainNavigation[6]],
  knowledgeLinks: [
    additionalNavigation[0],
    additionalNavigation[1],
    { label: 'Öl-Lexikon', href: '/de/wissen/oel-lexikon/' },
    { label: 'Sicher anwenden', href: '/de/wissen/sicher-anwenden/' },
  ],
  contactLinks: [
    contactLinks.whatsapp,
    contactLinks.email,
  ],
  officialLinks: Object.values(officialLinks),
  legalNavigation: [
    { label: 'Impressum', href: '/de/impressum/' },
    { label: 'Datenschutz', href: '/de/datenschutz/' },
  ],
} as const;

export const englishFooterData = {
  brand: 'Kyle Daniel Mikolajczak',
  claim: 'Natural. Clear. With Kyle.',
  description: 'A clear guide to doTERRA products and routines.',
  primaryNavigation: [englishMainNavigation[0], englishMainNavigation[1], englishMainNavigation[3], englishMainNavigation[4], englishMainNavigation[5], englishMainNavigation[6]],
  knowledgeLinks: [
    englishAdditionalNavigation[0],
    englishAdditionalNavigation[1],
    { label: 'Oil Library', href: '/en/knowledge/oil-library/' },
    { label: 'Safe Use', href: '/en/knowledge/safe-use/' },
  ],
  contactLinks: [
    englishContactLinks.whatsapp,
    englishContactLinks.email,
  ],
  officialLinks: Object.values(englishOfficialLinks),
  legalNavigation: [
    { label: 'Legal Notice', href: '/en/legal-notice/' },
    { label: 'Privacy Policy', href: '/en/privacy-policy/' },
  ],
} as const;
