import { useTranslations } from 'next-intl';

export const Offer = () => {
  const t = useTranslations('offer');

  return (
    <section id="offer" className="bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-3xl font-bold">{t('title')}</h2>
        <div className="mt-6 max-w-md rounded-2xl border border-line bg-white p-8 shadow-sm">
          <h3 className="text-xl font-semibold">{t('card_name')}</h3>
          <p className="mt-3 text-5xl font-extrabold">{t('price')}</p>
          <p className="mt-1 text-sm text-muted">{t('price_note')}</p>
          <ul className="mt-6 space-y-2">
            {(['item1', 'item2', 'item3'] as const).map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-8 block rounded-full bg-brand px-6 py-3 text-center font-semibold text-white hover:bg-brand-dark"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
};
