import { useTranslations } from 'next-intl';

const SERVICES = ['svc1', 'svc2', 'svc3'] as const;

// A phone built in CSS showing a fictional bilingual salon page, plus the
// text alert the owner would receive. Clearly labeled as a demo.
// On phones the device is cropped so the alert lands inside the first screen.
export const PhoneDemo = () => {
  const t = useTranslations('hero');

  return (
    <figure className="relative mx-auto w-full max-w-[19rem] pb-1 sm:max-w-[22rem] lg:max-w-[23rem]" aria-label={t('demo_label')}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-6 bottom-10 -z-10 rounded-[3rem] bg-mango-soft blur-2xl"
      />
      <span className="absolute -top-2 left-0 z-20 rounded-full border border-ink bg-mango px-3 py-0.5 text-[0.7rem] font-bold tracking-widest text-ink uppercase shadow-card">
        {t('demo_badge')}
      </span>

      <div className="max-h-[14.75rem] overflow-hidden sm:max-h-none">
        <div className="rounded-[2.25rem] border-[7px] border-ink bg-ink shadow-card">
          <div className="relative overflow-hidden rounded-[1.7rem] bg-paper">
            <div className="flex items-center justify-between px-5 pt-2 text-[0.65rem] font-bold" aria-hidden="true">
              <span>9:41</span>
              <span className="h-4 w-20 rounded-full bg-ink" />
              <span className="flex items-end gap-0.5">
                <span className="h-1.5 w-0.5 bg-ink" />
                <span className="h-2 w-0.5 bg-ink" />
                <span className="h-2.5 w-0.5 bg-ink" />
                <span className="ml-1 h-2.5 w-4 rounded-sm border border-ink" />
              </span>
            </div>
            <div className="flex items-center justify-between px-4 pt-2 text-xs">
              <span className="font-display text-sm font-semibold">{t('demo_name')}</span>
              <span className="flex overflow-hidden rounded-full border border-ink text-[0.7rem] font-bold" aria-hidden="true">
                <span className="bg-ink px-2 py-0.5 text-paper">ES</span>
                <span className="px-2 py-0.5">EN</span>
              </span>
            </div>
            <div className="mx-4 mt-3 rounded-2xl bg-bay px-4 py-3 text-paper sm:py-4">
              <p className="font-display text-lg leading-tight font-semibold">{t('demo_headline')}</p>
              <p className="mt-1 text-xs text-bay-soft">{t('demo_sub')}</p>
              <span className="mt-3 inline-block rounded-full bg-mango px-4 py-1.5 text-xs font-bold text-ink">
                {t('demo_book')}
              </span>
            </div>
            <ul className="mx-4 mt-3 space-y-1.5 pb-14 text-xs">
              {SERVICES.map((key) => (
                <li key={key} className="flex justify-between rounded-lg border border-line bg-card px-3 py-2">
                  <span className="font-semibold">{t(`demo_${key}`)}</span>
                  <span className="text-muted">{t('demo_ask')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        role="note"
        className="relative z-10 -mt-9 ml-auto w-[94%] rounded-2xl border border-line bg-card p-3 shadow-card sm:-mt-14 sm:-mr-8 sm:w-[90%]"
      >
        <p className="flex items-center gap-2 text-[0.7rem] font-bold tracking-wide text-muted uppercase">
          <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-md bg-brand text-[0.6rem] text-white">
            SMS
          </span>
          <span>{t('demo_sms_label')}</span>
          <span className="ml-auto font-medium normal-case">{t('demo_now')}</span>
        </p>
        <p className="mt-1 text-sm leading-snug font-semibold text-ink">{t('demo_sms')}</p>
      </div>
      <figcaption className="mt-1.5 text-center text-xs text-muted">{t('demo_caption')}</figcaption>
    </figure>
  );
};
