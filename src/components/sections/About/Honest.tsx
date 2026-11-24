import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui';

const keys = ['honest_1', 'honest_2', 'honest_3'] as const;

export const Honest = () => {
  const t = useTranslations('about');

  return (
    <div className="mt-6 rounded-2xl border border-mango bg-mango-soft p-5">
      <Badge tone="mango">{t('honest_badge')}</Badge>
      <p className="mt-3 text-lg font-semibold text-ink">{t('honest')}</p>
      <ul className="mt-3 space-y-2 text-base text-ink">
        {keys.map((key) => (
          <li key={key} className="flex gap-3">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
            <span>{t(key)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
