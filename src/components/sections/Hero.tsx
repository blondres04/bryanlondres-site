import { useTranslations } from 'next-intl';
import { PhoneDemo } from '@/components/hero/PhoneDemo';
import { Badge, Button, Container } from '@/components/ui';
import { Link } from '@/libs/I18nNavigation';

const STEPS = ['step1', 'step2', 'step3'] as const;

export const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-mango-soft blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-bay-soft opacity-70 blur-3xl"
      />
      <Container className="relative grid gap-y-6 py-4 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-x-14 lg:gap-y-12 lg:py-14">
        <div>
          <Badge tone="mango">{t('eyebrow')}</Badge>
          <h1 className="mt-2.5 text-[1.9rem] leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:mt-5 lg:text-[2.9rem] lg:leading-[1.12]">
            {t('title')}
          </h1>
          <p className="mt-2 max-w-xl text-[0.92rem] leading-snug text-muted sm:text-xl lg:mt-5 lg:leading-relaxed">{t('subtitle')}</p>

          <div className="mt-3.5 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:gap-3 lg:mt-7">
            <Button href="#contact" size="lg" variant="primary" className="max-sm:!min-h-12 max-sm:!py-2.5">
              {t('cta_primary')}
            </Button>
            <Button href="#contact" size="lg" variant="secondary" className="max-sm:!min-h-10 max-sm:!py-1.5 max-sm:!text-[0.95rem]">
              {t('cta_secondary')}
            </Button>
          </div>
          <p className="mt-2 text-sm text-muted">{t('cta_note')}</p>
          <Link
            href="/demo"
            className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-base font-semibold text-bay underline decoration-2 underline-offset-4 hover:text-ink"
          >
            {t('demo_link')}
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <p className="mt-1 hidden text-sm text-muted sm:block">
            {t('contact_prefix')}{' '}
            <a href={`mailto:${t('contact_email')}`} className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-2">
              {t('contact_email')}
            </a>
          </p>
          <p className="mt-2.5 flex items-center gap-3 rounded-2xl border border-mango bg-mango-soft px-4 py-1 lg:hidden">
            <span className="font-display text-2xl leading-none font-semibold tracking-tight">
              {t('price_founding')}
            </span>
            <span className="text-sm leading-snug font-semibold text-ink">
              {t('price_chip')}
            </span>
          </p>

          <div className="mt-5 hidden items-start gap-3 border-t border-line pt-5 sm:flex">
            <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-bay" />
            <p className="text-base text-ink">{t('trust')}</p>
          </div>
        </div>

        <PhoneDemo />

        <aside
          aria-label={t('card_label')}
          className="lg:col-span-2 rounded-card border border-line bg-card/70 p-5 sm:p-6"
        >
          <p className="text-sm font-bold tracking-widest text-brand uppercase">
            {t('price_label')}
          </p>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {t('price_founding')}
            </span>
            <span className="text-base text-muted">
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
