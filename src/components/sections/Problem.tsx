import { useTranslations } from 'next-intl';

export const Problem = () => {
  const t = useTranslations('problem');

  return (
    <section id="problem" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-3xl font-bold">{t('title')}</h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {(['p1', 'p2', 'p3'] as const).map((key) => (
          <li key={key} className="rounded-xl border border-line p-5 text-muted">
            {t(key)}
          </li>
        ))}
      </ul>
    </section>
  );
};
