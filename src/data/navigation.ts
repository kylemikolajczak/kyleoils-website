export const mainNavigation = [
  { label: 'Start', href: '/de/' },
  { label: 'Beratung', href: '/de/beratung/' },
  { label: 'Öle & Routinen', href: '/de/oele-routinen/' },
  { label: 'Starter-Sets', href: '/de/starter-sets/' },
  { label: 'Workshops', href: '/de/workshops/' },
  { label: 'Über Kyle', href: '/de/ueber-kyle/' },
  { label: 'Kontakt', href: '/de/kontakt/' },
] as const;

export const additionalNavigation = [
  { label: 'Wissen', href: '/de/wissen/' },
  { label: 'FAQ', href: '/de/faq/' },
  { label: 'doTERRA verstehen', href: '/de/doterra-verstehen/' },
  { label: 'Business-Möglichkeit', href: '/de/business-moeglichkeit/' },
] as const;

export const englishMainNavigation = [
  { label: 'Home', href: '/en/' },
  { label: 'Consultation', href: '/en/consultation/' },
  { label: 'Oils & Routines', href: '/en/oils-routines/' },
  { label: 'Starter Kits', href: '/en/starter-sets/' },
  { label: 'Workshops', href: '/en/workshops/' },
  { label: 'About Kyle', href: '/en/about-kyle/' },
  { label: 'Contact', href: '/en/contact/' },
] as const;

export const englishAdditionalNavigation = [
  { label: 'Knowledge', href: '/en/knowledge/' },
  { label: 'FAQ', href: '/en/faq/' },
  { label: 'Understanding doTERRA', href: '/en/understanding-doterra/' },
  { label: 'Business Opportunity', href: '/en/business-opportunity/' },
] as const;

type HeaderNavigationLink = { label: string; href: string };
type HeaderNavigationGroup = { label: string; items: readonly HeaderNavigationLink[] };

export const groupedMainNavigation = [
  { label: 'Start', href: '/de/' },
  { label: 'Wissen', href: '/de/wissen/' },
  {
    label: 'Beratung',
    items: [
      { label: 'Beratung', href: '/de/beratung/' },
      { label: 'Öle & Routinen', href: '/de/oele-routinen/' },
    ],
  },
  {
    label: 'Angebote',
    items: [
      { label: 'Starter-Sets', href: '/de/starter-sets/' },
      { label: 'Workshops', href: '/de/workshops/' },
    ],
  },
  { label: 'Über Kyle', href: '/de/ueber-kyle/' },
  { label: 'Kontakt', href: '/de/kontakt/' },
] as const satisfies readonly (HeaderNavigationLink | HeaderNavigationGroup)[];

export const groupedEnglishMainNavigation = [
  { label: 'Home', href: '/en/' },
  { label: 'Knowledge', href: '/en/knowledge/' },
  {
    label: 'Guidance',
    items: [
      { label: 'Consultation', href: '/en/consultation/' },
      { label: 'Oils & Routines', href: '/en/oils-routines/' },
    ],
  },
  {
    label: 'Offers',
    items: [
      { label: 'Starter Kits', href: '/en/starter-sets/' },
      { label: 'Workshops', href: '/en/workshops/' },
    ],
  },
  { label: 'About Kyle', href: '/en/about-kyle/' },
  { label: 'Contact', href: '/en/contact/' },
] as const satisfies readonly (HeaderNavigationLink | HeaderNavigationGroup)[];
