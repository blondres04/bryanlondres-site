import './src/libs/Env';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { SITE_INDEXABLE } from './src/utils/AppConfig';

const baseConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Indexing gate, header half (the meta tag is the other half). Same flag as the meta tag,
  // so it is also present when running locally, not only on Netlify (netlify.toml repeats it).
  async headers() {
    if (SITE_INDEXABLE) {
      return [];
    }
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
  // Pin the root so a stray lockfile in a parent folder is never picked up.
  turbopack: { root: import.meta.dirname },
};

const nextConfig = createNextIntlPlugin('./src/libs/I18n.ts')(baseConfig);
export default nextConfig;
