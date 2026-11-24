import { defineRouting } from 'next-intl/routing';
import { AppConfig } from '@/utils/AppConfig';

export const routing = defineRouting({
  locales: AppConfig.i18n.locales,
  localePrefix: AppConfig.i18n.localePrefix,
  defaultLocale: AppConfig.i18n.defaultLocale,
  // Decision 2: Spanish at /, English at /en, no redirect by browser language or cookie.
  localeDetection: false,
});
