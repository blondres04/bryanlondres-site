import { useTranslations } from 'next-intl';

const ITEMS = [1, 2, 3] as const;

export const AddOns = () => {
  const t = useTranslations('offer');

  return (
    <div className="mt-14">
      <h3 className="text-2xl font-semibold">{t('addons_title')}</h3>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {ITEMS.map((n) => (
          <li key={n} className="rounded-2xl border border-line bg-card p-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-semibold">{t(`addon_${n}_name`)}</p>
              <p className="shrink-0 font-bold text-brand">{t(`addon_${n}_price`)}</p>
            </div>
            <p className="mt-2 text-muted">{t(`addon_${n}_body`)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
