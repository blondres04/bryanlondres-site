import type { routing } from '@/libs/I18nRouting';
import type about from '@/locales/en/about.json';
import type contact from '@/locales/en/contact.json';
import type demo from '@/locales/en/demo.json';
import type faq from '@/locales/en/faq.json';
import type footer from '@/locales/en/footer.json';
import type header from '@/locales/en/header.json';
import type hero from '@/locales/en/hero.json';
import type howItWorks from '@/locales/en/howItWorks.json';
import type meta from '@/locales/en/meta.json';
import type offer from '@/locales/en/offer.json';
import type problem from '@/locales/en/problem.json';

type Messages = {
  meta: typeof meta;
  header: typeof header;
  hero: typeof hero;
  problem: typeof problem;
  offer: typeof offer;
  howItWorks: typeof howItWorks;
  demo: typeof demo;
  about: typeof about;
  faq: typeof faq;
  contact: typeof contact;
  footer: typeof footer;
};

declare module 'next-intl' {
  // oxlint-disable-next-line typescript/consistent-type-definitions
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: Messages;
  }
}
