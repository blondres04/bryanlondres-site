import { useTranslations } from 'next-intl';
import { Badge, buttonClasses, Container } from '@/components/ui';
import { Link } from '@/libs/I18nNavigation';

export const Demo = () => {
  const t = useTranslations('demo');

  return (
    <section id="demo" data-section="demo" className="bg-paper-2">
      <Container className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Badge tone="bay">{t('banner')}</Badge>
          <h2 className="mt-4 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">{t('body')}</p>
          <Link href="/demo" className={`${buttonClasses('primary', 'lg')} mt-6 w-full sm:w-auto`}>
            {t('cta')}
          </Link>
        </div>
        <figure className="mx-auto w-full max-w-sm rounded-[2rem] border-4 border-ink bg-card p-4 shadow-card">
          <figcaption className="text-center text-xs font-semibold text-muted">
            {t('teaser_label')}
          </figcaption>
          <p className="mt-3 rounded-2xl rounded-tl-sm bg-bay-soft px-4 py-3 text-base text-ink">
            {t('teaser_sms')}
          </p>
          <p className="mt-3 text-xs text-muted">{t('teaser_note')}</p>
        </figure>
      </Container>
    </section>
  );
};
