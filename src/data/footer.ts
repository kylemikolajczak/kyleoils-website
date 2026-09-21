import { additionalNavigation, mainNavigation } from './navigation';
import { contactLinks, officialLinks, socialLinks } from './externalLinks';
import { englishContactLinks, englishOfficialLinks } from './externalLinks';
import { englishAdditionalNavigation, englishMainNavigation } from './navigation';

export const footerData = {
  brand: 'Kyle Daniel Mikolajczak',
  claim: 'Natürlich. Klar. Mit Kyle.',
  description: 'Praktische Begleitung rund um doTERRA Produkte und Routinen.',
  primaryNavigation: [mainNavigation[0], mainNavigation[1], mainNavigation[3], mainNavigation[4], mainNavigation[5], mainNavigation[6]],
  knowledgeLinks: [
    additionalNavigation[0],
    additionalNavigation[1],
    { label: 'Öl-Lexikon', href: '/de/wissen/oel-lexikon/' },
    { label: 'Sicher anwenden', href: '/de/wissen/sicher-anwenden/' },
  ],
  directContactLinks: [
    contactLinks.whatsapp,
    contactLinks.email,
  ],
  officialLinks: [officialLinks.shop, officialLinks.office],
  socialLinks: [socialLinks.linkedin, socialLinks.facebook, socialLinks.instagram],
  legalNavigation: [
    { label: 'Impressum', href: '/de/impressum/' },
    { label: 'Datenschutz', href: '/de/datenschutz/' },
  ],
} as const;

export const englishFooterData = {
  brand: 'Kyle Daniel Mikolajczak',
  claim: 'Natural routines. Clear guidance.',
  description: 'Practical support for doTERRA products and everyday routines.',
  primaryNavigation: [englishMainNavigation[0], englishMainNavigation[1], englishMainNavigation[3], englishMainNavigation[4], englishMainNavigation[5], englishMainNavigation[6]],
  knowledgeLinks: [
    englishAdditionalNavigation[0],
    englishAdditionalNavigation[1],
    { label: 'Oil Library', href: '/en/knowledge/oil-library/' },
    { label: 'Safe Use', href: '/en/knowledge/safe-use/' },
  ],
  directContactLinks: [
    englishContactLinks.whatsapp,
    englishContactLinks.email,
  ],
  officialLinks: [englishOfficialLinks.shop, englishOfficialLinks.office],
  socialLinks: [socialLinks.linkedin, socialLinks.facebook, socialLinks.instagram],
  legalNavigation: [
    { label: 'Legal Notice', href: '/en/legal-notice/' },
    { label: 'Privacy Policy', href: '/en/privacy-policy/' },
  ],
} as const;
