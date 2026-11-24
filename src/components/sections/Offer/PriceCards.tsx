import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui';

export const PriceCards = () => {
  const t = useTranslations('offer');

  return (
    <div role="group" aria-label={t('group_label')} className="mt-10 grid gap-5 md:grid-cols-5">
      <div className="relative rounded-[var(--radius-card)] border-2 border-brand bg-card p-6 shadow-card sm:p-8 md:col-span-3">
        <Badge tone="mango">{t('founding_badge')}</Badge>
        <p className="mt-4 text-sm font-semibold text-muted">{t('founding_label')}</p>
        <p className="mt-1 font-display text-6xl font-semibold tracking-tight text-brand sm:text-7xl">
          {t('founding_price')}
        </p>
        <p className="mt-3 text-muted">{t('founding_note')}</p>
        <p className="mt-4 inline-block rounded-full bg-bay-soft px-3 py-1 text-sm font-semibold text-bay">
          {t('founding_spots')}
        </p>
        <div className="mt-5 flex items-baseline gap-3 border-t border-line pt-4">
          <p className="text-sm font-semibold text-muted">{t('today_label')}</p>
          <p className="font-display text-3xl font-semibold text-bay">{t('today_price')}</p>
        </div>
        <p className="mt-1 text-sm text-muted">{t('today_note')}</p>
      </div>
      <div className="rounded-[var(--radius-card)] border border-line bg-paper-2 p-6 sm:p-8 md:col-span-2">
        <p className="text-sm font-semibold text-muted">{t('regular_label')}</p>
        <p className="mt-1 font-display text-5xl font-semibold tracking-tight text-ink">
          {t('regular_price')}
        </p>
        <p className="mt-3 text-muted">{t('regular_note')}</p>
      </div>
    </div>
  );
};
