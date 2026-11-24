import { useTranslations } from 'next-intl';

import { Container, SectionHeading } from '@/components/ui';

import { FaqItem } from './FAQ/FaqItem';

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
    <section id="faq" data-section="faq" className="scroll-mt-28 bg-paper-2 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
        <div className="mt-10 max-w-3xl space-y-3">
          {KEYS.map((key) => (
            <FaqItem key={key} question={t(`items.${key}.q`)} defaultOpen={key === 'dislikeDraft'}>
              <p>{t(`items.${key}.a`)}</p>
            </FaqItem>
          ))}
        </div>
      </Container>
    </section>
  );
};
