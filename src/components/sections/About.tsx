import { useTranslations } from 'next-intl';

import { Container, Monogram, SectionHeading } from '@/components/ui';

import { Facts } from './About/Facts';
import { Links } from './About/Links';

export const About = () => {
  const t = useTranslations('about');

  return (
    <section id="about" data-section="about" aria-labelledby="about-title" className="scroll-mt-[4.5rem] bg-paper py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
          <div className="flex items-center gap-4 lg:flex-col lg:items-start">
            <Monogram size={96} />
            <div>
              <p className="font-display text-xl font-semibold">Bryan Londres</p>
              <p className="text-base text-muted">{t('role')}</p>
              <p className="text-base text-muted">{t('place')}</p>
            </div>
          </div>
          <div className="max-w-2xl">
            <SectionHeading eyebrow={t('eyebrow')} title={<span id="about-title">{t('title')}</span>} />
            <p className="mt-5 text-lg">{t('p1')}</p>
            <p className="mt-4 text-lg">{t('p2')}</p>
            <Facts />
            <h3 className="mt-8 font-display text-xl font-semibold">{t('check_title')}</h3>
            <p className="mt-2 text-base text-muted">{t('check_text')}</p>
            <Links />
          </div>
        </div>
      </Container>
    </section>
  );
};
