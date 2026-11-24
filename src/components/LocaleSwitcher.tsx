'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/libs/I18nNavigation';
import { routing } from '@/libs/I18nRouting';

export const LocaleSwitcher = () => {
  const t = useTranslations('header');
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav
      aria-label={t('language_label')}
      className="flex rounded-full border border-line bg-card p-0.5 text-sm font-bold"
    >
      {routing.locales.map((elt) => (
        <Link
          key={elt}
          href={pathname}
          locale={elt}
          scroll={false}
          lang={elt}
          aria-current={elt === locale ? 'true' : undefined}
          className={`inline-flex min-h-9 min-w-9 items-center justify-center rounded-full px-2.5 ${
            elt === locale ? 'bg-ink text-paper' : 'text-muted hover:text-ink'
          }`}
        >
          {elt.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
};
