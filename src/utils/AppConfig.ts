import type { LocalePrefixMode } from 'next-intl/routing';

/** Locale prefix strategy for next-intl routing. */
const localePrefix: LocalePrefixMode = 'as-needed';

/**
 * Indexing gate. While false, every page renders `noindex, nofollow` and
 * robots.txt disallows everything. Flip to true only when the site is ready to launch.
 */
export const SITE_INDEXABLE = false;

/** Message sections. Each one is a file at src/locales/<locale>/<section>.json. */
export const MESSAGE_SECTIONS = [
  'meta',
  'header',
  'hero',
  'problem',
  'offer',
  'howItWorks',
  'demo',
  'about',
  'faq',
  'contact',
  'footer',
] as const;

/** Centralized application configuration */
export const AppConfig = {
  name: 'Bryan Londres',
  siteIndexable: SITE_INDEXABLE,
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localePrefix,
  },
  contact: {
    // Public business email. Empty hides every email link on the site.
    email: 'hola@bryanlondres.com',
    // TODO: set the real WhatsApp number in international format, digits only.
    whatsappNumber: '',
    // TODO: set the real phone number shown in the header.
    phoneDisplay: '',
  },
} as const;
