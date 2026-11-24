'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/libs/I18nNavigation';
import { routing } from '@/libs/I18nRouting';

export const LocaleSwitcher = () => {
  const t = useTranslations('header');
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav aria-label={t('language_label')} className="flex gap-1 text-sm font-semibold">
      {routing.locales.map((elt) => (
        <Link
          key={elt}
          href={pathname}
          locale={elt}
          scroll={false}
          aria-current={elt === locale ? 'true' : undefined}
          className={
            elt === locale
              ? 'rounded bg-ink px-2 py-1 text-white'
              : 'rounded px-2 py-1 text-muted hover:bg-surface'
          }
        >
          {elt.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
};
