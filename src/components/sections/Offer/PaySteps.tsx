import { useTranslations } from 'next-intl';

const STEPS = [1, 2, 3] as const;

export const PaySteps = () => {
  const t = useTranslations('offer');

  return (
    <div className="mt-14 rounded-[var(--radius-card)] bg-bay p-6 text-white sm:p-8">
      <h3 className="text-2xl font-semibold">{t('pay_title')}</h3>
      <ol className="mt-6 grid gap-6 md:grid-cols-3">
        {STEPS.map((n) => (
          <li key={n} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mango font-bold text-ink"
            >
              {n}
            </span>
            <div>
              <p className="font-semibold">{t(`pay_${n}_title`)}</p>
              <p className="mt-1 text-white/85">{t(`pay_${n}_body`)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
