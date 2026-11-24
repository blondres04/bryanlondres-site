import { useTranslations } from 'next-intl';
import { Link } from '@/libs/I18nNavigation';

export const Demo = () => {
  const t = useTranslations('demo');

  return (
    <section id="demo" className="bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold">{t('title')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">{t('body')}</p>
        <Link
          href="/demo"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-white hover:opacity-90"
        >
          {t('cta')}
        </Link>
      </div>
    </section>
  );
};
