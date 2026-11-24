import { useTranslations } from 'next-intl';
import { Button, Container, SectionHeading } from '@/components/ui';
import { AddOns } from './Offer/AddOns';
import { Included } from './Offer/Included';
import { PriceCards } from './Offer/PriceCards';

export const Offer = () => {
  const t = useTranslations('offer');

  return (
    <section id="offer" data-section="offer" className="scroll-mt-24 bg-paper-2 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
        <PriceCards />
        <Included />
        <AddOns />
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-muted">{t('honest_note')}</p>
          <Button href="#contact" size="lg">
            {t('cta')}
          </Button>
        </div>
      </Container>
    </section>
  );
};
