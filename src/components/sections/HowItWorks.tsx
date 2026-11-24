import { useTranslations } from 'next-intl';

import { Badge, Container, SectionHeading } from '@/components/ui';

const STEPS = ['step1', 'step2', 'step3', 'step4'] as const;

const Icon = ({ n }: { n: number }) => {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (n === 0) {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 21h8M12 18v3" />
      </svg>
    );
  }
  if (n === 1) {
    return (
      <svg {...common}>
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    );
  }
  if (n === 2) {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 5h11a3 3 0 013 3v11H7a3 3 0 01-3-3V5z" />
      <path d="M8 10h6M8 14h4" />
    </svg>
  );
};

export const HowItWorks = () => {
  const t = useTranslations('howItWorks');

  return (
    <section id="how-it-works" data-section="howItWorks" className="scroll-mt-[5.5rem] bg-paper py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
        <ol className="relative z-0 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {STEPS.map((key, index) => (
            <li
              key={key}
              className={`relative flex flex-col rounded-[var(--radius-card)] border bg-card p-6 shadow-[var(--shadow-card)] ${index === 1 ? 'border-mango ring-2 ring-mango/40' : 'border-line'} ${index < 3 ? 'after:absolute after:left-1/2 after:top-full after:h-4 after:w-0.5 after:-translate-x-1/2 after:bg-mango sm:after:hidden' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-full bg-bay text-paper">
                  <Icon n={index} />
                </span>
                <span
                  className="font-display text-4xl leading-none font-semibold text-mango"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge tone={index === 0 ? 'mango' : 'bay'}>{t(`${key}_when`)}</Badge>
                {index === 1 && (
                  <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-paper">
                    {t('decide')}
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-xl leading-snug font-semibold">
                <span className="sr-only">{`${index + 1}. `}</span>
                {t(`${key}_title`)}
              </h3>
              <p className="mt-2 text-muted">{t(`${key}_body`)}</p>
              <p className="mt-auto pt-4 text-sm font-bold text-brand-dark">
                <span className="rounded-full bg-mango-soft px-3 py-1">{t(`${key}_cost`)}</span>
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 rounded-[var(--radius-card)] bg-bay p-5 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="font-display text-xl leading-snug font-semibold sm:text-2xl">{t('strip')}</p>
          <p className="max-w-md text-base text-paper/90">{t('note')}</p>
        </div>
      </Container>
    </section>
  );
};
