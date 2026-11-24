import { useTranslations } from 'next-intl';

const ITEMS = [1, 2, 3, 4] as const;

export const Included = () => {
  const t = useTranslations('offer');

  return (
    <div className="mt-14">
      <h3 className="text-2xl font-semibold">{t('included_title')}</h3>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {ITEMS.map((n) => (
          <li key={n} className="flex gap-4 rounded-2xl border border-line bg-card p-5">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bay text-sm font-bold text-white"
            >
              ✓
            </span>
            <div>
              <p className="font-semibold">{t(`included_${n}_title`)}</p>
              <p className="mt-1 text-muted">{t(`included_${n}_body`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
