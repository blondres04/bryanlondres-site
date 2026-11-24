import type { Metadata } from 'next';
import { Env } from '@/libs/Env';
import { routing } from '@/libs/I18nRouting';
import { AppConfig } from '@/utils/AppConfig';

/**
 * Resolves the public base URL of the application.
 * @returns The configured public app URL or the local development URL.
 */
export const getBaseUrl = () => {
  if (Env.NEXT_PUBLIC_APP_URL) {
    return Env.NEXT_PUBLIC_APP_URL;
  }

  // Netlify exposes URL (primary site URL) and DEPLOY_PRIME_URL at build time.
  const netlifyUrl = process.env.URL ?? process.env.DEPLOY_PRIME_URL;
  if (netlifyUrl) {
    return netlifyUrl;
  }

  return 'http://localhost:3000';
};

/**
 * Builds a locale-aware path by prefixing non-default locales.
 * @param url The base application-relative path starting with a slash.
 * @param locale The active locale identifier.
 * @returns The localized path, prefixed when the locale is not the default locale.
 */
export const getI18nPath = (url: string, locale: string) => {
  if (locale === routing.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

/**
 * Robots metadata driven by the single SITE_INDEXABLE flag.
 * @returns `noindex, nofollow` while the site is gated, otherwise `index, follow`.
 */
export const getRobotsMetadata = (): NonNullable<Metadata['robots']> =>
  AppConfig.siteIndexable ? { index: true, follow: true } : { index: false, follow: false };
