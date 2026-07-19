export const officialLinks = {
  shop: { label: 'Offizieller doTERRA Shop', href: 'https://shop.doterra.com/DE/de_DE/shop/home' },
  office: { label: 'Persönliches doTERRA Office', href: 'https://office.doterra.com/kyledanielmikolajczak' },
  facebook: { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61584673212189' },
} as const;

export const contactLinks = {
  whatsapp: { label: 'WhatsApp starten', href: 'https://wa.me/491794169488' },
  phone: { label: '+49 179 4169488', href: 'tel:+491794169488' },
  email: { label: 'kyle.mikolajczak@gmail.com', href: 'mailto:kyle.mikolajczak@gmail.com' },
} as const;

export const socialLinks = {
  facebook: { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61584673212189' },
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kyle-mikolajczak-3a77402b7/' },
} as const;

export const englishOfficialLinks = {
  shop: { label: 'Official doTERRA Shop', href: officialLinks.shop.href },
  office: { label: 'Personal doTERRA Office', href: officialLinks.office.href },
  facebook: officialLinks.facebook,
} as const;

export const englishContactLinks = {
  whatsapp: { label: 'Message Me on WhatsApp', href: contactLinks.whatsapp.href },
  phone: contactLinks.phone,
  email: contactLinks.email,
} as const;
