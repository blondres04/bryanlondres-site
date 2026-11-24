import { useTranslations } from 'next-intl';

import { Button, Container, SectionHeading } from '@/components/ui';

import { FaqItem } from './FAQ/FaqItem';

const EMAIL = 'bryanlondres5@gmail.com';

const KEYS = [
  'hasSite',
  'trustAi',
  'noReviews',
  'dislikeDraft',
  'domain',
  'tech',
  'spanish',
  'afterSeven',
  'monthly',
] as const;

export const Faq = () => {
  const t = useTranslations('faq');

  return (
    <section id="faq" data-section="faq" className="scroll-mt-28 bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
        <div className="mt-10 max-w-3xl space-y-3">
          {KEYS.map((key) => (
            <FaqItem key={key} question={t(`items.${key}.q`)} defaultOpen={key === 'dislikeDraft'}>
              <p>{t(`items.${key}.a`)}</p>
            </FaqItem>
          ))}
        </div>
        <div className="mt-10 max-w-3xl rounded-2xl bg-bay p-6 text-paper sm:p-8">
          <h3 className="text-xl font-semibold">{t('closing.title')}</h3>
          <p className="mt-2 text-base leading-relaxed text-bay-soft">{t('closing.text')}</p>
          <Button href="#contact" size="lg" className="mt-5 w-full sm:w-auto">
            {t('closing.cta')}
          </Button>
          <p className="mt-5 text-base text-bay-soft">
            {t('closing.emailLead')}{' '}
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-11 items-center font-semibold text-paper underline decoration-paper/50 underline-offset-4 hover:decoration-mango focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango"
            >
              {EMAIL}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
};
