import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { MESSAGE_SECTIONS } from '@/utils/AppConfig';
import { routing } from './I18nRouting';

// Messages are merged from per-section files: src/locales/<locale>/<section>.json.
// The file name is the namespace, so useTranslations('hero') reads hero.json.
// Each builder owns one section file per locale, so there are no merge conflicts.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const entries = await Promise.all(
    MESSAGE_SECTIONS.map(async (section) => {
      const mod = await import(`../locales/${locale}/${section}.json`);
      return [section, mod.default] as const;
    }),
  );

  return {
    locale,
    messages: Object.fromEntries(entries),
  };
});
