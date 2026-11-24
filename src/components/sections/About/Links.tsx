import { useTranslations } from 'next-intl';

const ITEMS = [
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/bryanlondres',
  },
  { key: 'github', href: 'https://github.com/blondres04' },
  {
    key: 'repo',
    href: 'https://github.com/blondres04/bryanlondres-site',
  },
] as const;

const cardClass =
  'group flex min-h-11 flex-col rounded-2xl border border-bay/30 bg-card p-4 transition-colors hover:border-bay hover:bg-bay-soft focus-visible:outline-2';

export const Links = () => {
  const t = useTranslations('about');

  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-3">
      {ITEMS.map(({ key, href }) => (
        <li key={key} className="flex">
          <a
            className={`${cardClass} w-full`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(`${key}_aria`)}
          >
            <span className="font-semibold text-bay">
              {t(`${key}_name`)} <span aria-hidden="true">↗</span>
            </span>
            <span className="mt-1 text-sm text-muted">{t(`${key}_what`)}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};
