import type { MetadataRoute } from 'next';
import { routing } from '@/libs/I18nRouting';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return ['', '/demo'].map((route) => ({
    url: `${baseUrl}${getI18nPath(route, routing.defaultLocale)}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${baseUrl}${getI18nPath(route, locale)}`]),
      ),
    },
  }));
}
