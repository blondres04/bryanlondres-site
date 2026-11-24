import createMiddleware from 'next-intl/middleware';
import { routing } from './libs/I18nRouting';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except _next, _vercel, api and anything with a dot (files, /__forms.html).
  matcher: '/((?!_next|_vercel|api|.*\\..*).*)',
};
