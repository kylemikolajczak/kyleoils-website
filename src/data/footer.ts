import { additionalNavigation, mainNavigation } from './navigation';
import { contactLinks, officialLinks } from './externalLinks';
import { englishContactLinks, englishOfficialLinks } from './externalLinks';
import { englishAdditionalNavigation, englishMainNavigation } from './navigation';

export const footerData = {
  brand: 'Kyle Daniel Mikolajczak',
  claim: 'Natürliche Routinen. Persönliche Beratung.',
  description: 'Persönliche doTERRA Wellness Beratung für natürliche Routinen und verständliche Orientierung',
  mainNavigation,
  additionalNavigation,
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
  mainNavigation: englishMainNavigation,
  additionalNavigation: englishAdditionalNavigation,
  contactLinks: [englishContactLinks.whatsapp, englishContactLinks.email],
  officialLinks: Object.values(englishOfficialLinks),
  legalNavigation: [
    { label: 'Legal Notice', href: '/en/legal-notice/' },
    { label: 'Privacy Policy', href: '/en/privacy-policy/' },
  ],
} as const;
