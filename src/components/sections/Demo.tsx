import { useLocale, useTranslations } from 'next-intl';

import { buttonClasses, Container, SectionHeading } from '@/components/ui';
import { Link } from '@/libs/I18nNavigation';

const FLOW = ['flow_1', 'flow_2', 'flow_3'] as const;

// Same message templates as the interactive demo, filled with one fixed example.
export const Demo = () => {
  const t = useTranslations('demo');
  const l = useLocale() === 'en' ? 'en' : 'es';
  const p = {
    name: 'Mariela',
    phone: '(305) 555-0142',
    service: t(`svc_color_${l}`),
    when: t(`when_tomorrow_${l}`),
  };
  const alert = t(`m_${l}_sms`, { ...p, note: '' });
  const yes = t(`m_${l}_yes`);
  const confirm = t(`m_${l}_confirm`, p);

  return (
    <section
      id="demo"
      data-section="demo"
      aria-labelledby="demo-title"
      className="scroll-mt-16 bg-bay py-14 text-paper sm:py-20"
    >
      <Container className="grid gap-10 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            tone="light"
            eyebrow={t('eyebrow')}
            title={<span id="demo-title">{t('title')}</span>}
            intro={t('body')}
          />
          <ol className="mt-7 space-y-3">
            {FLOW.map((key, i) => (
              <li key={key} className="flex items-center gap-3 text-base text-paper/90">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-mango text-sm font-bold text-ink"
                >
                  {i + 1}
                </span>
                {t(key)}
              </li>
            ))}
          </ol>
          <Link href="/demo" className={`${buttonClasses('primary', 'lg')} mt-8 w-full sm:w-auto`}>
            {t('cta')}
          </Link>
          <p className="mt-4 max-w-md text-sm text-paper/75">{t('banner_note')}</p>
        </div>

        <figure className="mx-auto w-full max-w-sm rounded-[2.25rem] border-[5px] border-ink bg-paper p-4 text-ink shadow-card">
          <figcaption className="flex items-center justify-between text-xs font-semibold text-muted">
            <span>{t('owner_sender')}</span>
            <span className="rounded-full bg-bay-soft px-2.5 py-0.5 text-bay">{t('banner')}</span>
          </figcaption>

          <p className="mt-4 text-xs font-bold tracking-wide text-muted uppercase">
            {t('owner_label')}
          </p>
          <p className="mt-2 rounded-2xl rounded-tl-sm bg-card px-4 py-3 text-base shadow-card">
            {alert}
          </p>
          <p className="mt-1 text-xs text-muted">
            {t('now')} · {t('sent_in')}
          </p>
          <p className="mt-3 ml-auto w-fit rounded-2xl rounded-tr-sm bg-bay px-4 py-2 text-base font-semibold text-paper">
            {yes}
          </p>

          <p className="mt-5 text-xs font-bold tracking-wide text-muted uppercase">
            {t('customer_label')}
          </p>
          <p className="mt-2 rounded-2xl rounded-tl-sm bg-mango-soft px-4 py-3 text-base">
            {confirm}
          </p>
          <p className="mt-3 text-xs text-muted">{t('preview_note')}</p>
        </figure>
      </Container>
    </section>
  );
};
