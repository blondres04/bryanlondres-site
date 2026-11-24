import './src/libs/Env';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const baseConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Pin the root so a stray lockfile in a parent folder is never picked up.
  turbopack: { root: import.meta.dirname },
};

const nextConfig = createNextIntlPlugin('./src/libs/I18n.ts')(baseConfig);
export default nextConfig;
