import { additionalNavigation, mainNavigation } from './navigation';
import { contactLinks, officialLinks } from './externalLinks';
import { englishContactLinks, englishOfficialLinks } from './externalLinks';
import { englishAdditionalNavigation, englishMainNavigation } from './navigation';

export const footerData = {
  brand: 'Kyle Daniel Mikolajczak',
  claim: 'Natürliche Routinen. Persönliche Beratung.',
  description: 'Persönliche doTERRA Wellness Beratung für natürliche Routinen und verständliche Orientierung',
  primaryNavigation: [mainNavigation[0], mainNavigation[1], additionalNavigation[0], mainNavigation[5], mainNavigation[6]],
  offersAndKnowledge: [mainNavigation[2], mainNavigation[3], mainNavigation[4], additionalNavigation[1], { label: 'Glossar', href: '/de/wissen/glossar/' }, additionalNavigation[2], additionalNavigation[3]],
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
  primaryNavigation: [englishMainNavigation[0], englishMainNavigation[1], englishAdditionalNavigation[0], englishMainNavigation[5], englishMainNavigation[6]],
  offersAndKnowledge: [englishMainNavigation[2], englishMainNavigation[3], englishMainNavigation[4], englishAdditionalNavigation[1], { label: 'Glossary', href: '/en/knowledge/glossary/' }, englishAdditionalNavigation[2], englishAdditionalNavigation[3]],
  contactLinks: [englishContactLinks.whatsapp, englishContactLinks.email],
  officialLinks: Object.values(englishOfficialLinks),
  legalNavigation: [
    { label: 'Legal Notice', href: '/en/legal-notice/' },
    { label: 'Privacy Policy', href: '/en/privacy-policy/' },
  ],
} as const;
