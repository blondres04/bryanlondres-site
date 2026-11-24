import { useTranslations } from 'next-intl';

import { SectionHeading } from '@/components/ui';

import { LanguageIcon, MissedCallIcon, PhoneBrokenIcon } from './Problem/icons';
import { ProblemCard } from './Problem/ProblemCard';

const ITEMS = [
  { key: 'calls', icon: <MissedCallIcon /> },
  { key: 'phone', icon: <PhoneBrokenIcon /> },
  { key: 'language', icon: <LanguageIcon /> },
] as const;

// No statistics on purpose: every line here is a plain scene a Hialeah owner will recognize.
// Add a figure only with a public source cited in this comment.
export const Problem = () => {
  const t = useTranslations('problem');

  return (
    <section id="problem" data-section="problem" className="scroll-mt-24 bg-paper">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {ITEMS.map(({ key, icon }) => (
            <ProblemCard
              key={key}
              icon={icon}
              scene={t(`${key}_scene`)}
              title={t(`${key}_title`)}
              body={t(`${key}_body`)}
              cost={t(`${key}_cost`)}
            />
          ))}
        </ul>
        <p className="mt-10 max-w-2xl rounded-[var(--radius-card)] border border-bay/30 bg-bay-soft p-5 text-lg text-bay">
          {t('bridge')}
        </p>
      </div>
    </section>
  );
};
