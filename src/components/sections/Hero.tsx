import { useTranslations } from 'next-intl';
import { Badge, Button, Container } from '@/components/ui';

const STEPS = ['step1', 'step2', 'step3'] as const;

export const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-mango-soft blur-3xl"
      />
      <Container className="relative grid gap-10 py-10 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:py-24">
        <div>
          <Badge tone="mango">{t('eyebrow')}</Badge>
          <h1 className="mt-5 text-[2.35rem] leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted sm:text-xl">{t('subtitle')}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" size="lg" variant="primary">
              {t('cta_primary')}
            </Button>
            <Button href="#contact" size="lg" variant="secondary">
              {t('cta_secondary')}
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted">{t('cta_note')}</p>

          <div className="mt-7 flex items-start gap-3 border-t border-line pt-5">
            <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-bay" />
            <p className="text-base text-ink">{t('trust')}</p>
          </div>
        </div>

        <aside
          aria-label={t('card_label')}
          className="rounded-card border border-line bg-card p-5 shadow-card sm:p-7"
        >
          <p className="text-sm font-bold tracking-widest text-brand uppercase">
            {t('price_label')}
          </p>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="font-display text-6xl font-semibold tracking-tight">
              {t('price_founding')}
            </span>
            <span className="text-lg text-muted">
              {t('price_regular_prefix')}{' '}
              <s className="decoration-brand decoration-2">{t('price_regular')}</s>
            </span>
          </div>
          <p className="mt-2 text-base text-muted">{t('price_note')}</p>

          <ol className="mt-6 space-y-4 border-t border-line pt-5">
            {STEPS.map((key, i) => (
              <li key={key} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper"
                >
                  {i + 1}
                </span>
                <span>
                  <span className="block font-semibold">{t(`${key}_title`)}</span>
                  <span className="block text-base text-muted">{t(`${key}_text`)}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-5 rounded-xl bg-bay-soft px-4 py-3 text-sm font-medium text-bay">
            {t('honest')}
          </p>
        </aside>
      </Container>
    </section>
  );
};
