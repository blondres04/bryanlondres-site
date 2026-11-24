import { useTranslations } from 'next-intl';

const STEPS = [
  ['step1_title', 'step1_body'],
  ['step2_title', 'step2_body'],
  ['step3_title', 'step3_body'],
] as const;

export const HowItWorks = () => {
  const t = useTranslations('howItWorks');

  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-3xl font-bold">{t('title')}</h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {STEPS.map(([title, body], index) => (
          <li key={title} className="rounded-xl border border-line p-5">
            <span className="text-sm font-bold text-brand">{index + 1}</span>
            <h3 className="mt-1 font-semibold">{t(title)}</h3>
            <p className="mt-2 text-muted">{t(body)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};
