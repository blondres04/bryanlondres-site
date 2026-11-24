import { useTranslations } from 'next-intl';

const ITEMS = [
  ['q1', 'a1'],
  ['q2', 'a2'],
  ['q3', 'a3'],
] as const;

export const Faq = () => {
  const t = useTranslations('faq');

  return (
    <section id="faq" className="bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-3xl font-bold">{t('title')}</h2>
        <div className="mt-6 space-y-3">
          {ITEMS.map(([q, a]) => (
            <details key={q} className="rounded-xl border border-line bg-white p-4">
              <summary className="cursor-pointer font-semibold">{t(q)}</summary>
              <p className="mt-2 text-muted">{t(a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
