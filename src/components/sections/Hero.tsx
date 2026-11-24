import { useTranslations } from 'next-intl';
import { Link } from '@/libs/I18nNavigation';

export const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{t('title')}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">{t('subtitle')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#contact"
            className="rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark"
          >
            {t('cta_primary')}
          </a>
          <Link
            href="/demo"
            className="rounded-full border border-line bg-white px-6 py-3 font-semibold hover:bg-surface"
          >
            {t('cta_secondary')}
          </Link>
        </div>
      </div>
    </section>
  );
};
