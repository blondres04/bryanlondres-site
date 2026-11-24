import { useTranslations } from 'next-intl';

export const About = () => {
  const t = useTranslations('about');

  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-3xl font-bold">{t('title')}</h2>
      <p className="mt-4 max-w-2xl text-muted">{t('body')}</p>
    </section>
  );
};
