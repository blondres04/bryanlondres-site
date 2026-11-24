'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useId, useState } from 'react';

type Lang = 'es' | 'en';
type Svc = 'cut' | 'color' | 'nails' | 'blowout';
type When = 'today' | 'tomorrow' | 'weekend';
type Result = {
  name: string;
  phone: string;
  svc: Svc;
  when: When;
  lang: Lang;
  note: string;
  time: string;
};

const SERVICES: Svc[] = ['cut', 'color', 'nails', 'blowout'];
const WHENS: When[] = ['today', 'tomorrow', 'weekend'];

const EXAMPLE: Result = {
  name: 'Mariela',
  phone: '(305) 555-0142',
  svc: 'color',
  when: 'tomorrow',
  lang: 'es',
  note: '',
  time: '9:41',
};

const field =
  'mt-1.5 block min-h-12 w-full rounded-xl border-2 border-line bg-card px-4 py-2.5 text-base text-ink placeholder:text-muted/70 focus:border-bay';

export const DemoForm = () => {
  const t = useTranslations('demo');
  const uid = useId();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [svc, setSvc] = useState<Svc>('cut');
  const [when, setWhen] = useState<When>('tomorrow');
  const [lang, setLang] = useState<Lang>('es');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean }>({});
  const [result, setResult] = useState<Result | null>(null);
  const [tab, setTab] = useState<'sms' | 'email'>('sms');
  const [stage, setStage] = useState(0);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (!runId) {
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setStage(3);
      return;
    }
    setStage(1);
    const a = window.setTimeout(() => setStage(2), 900);
    const b = window.setTimeout(() => setStage(3), 2200);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [runId]);

  const stageClass = (n: number) =>
    `transition-all duration-500 ease-out motion-reduce:transition-none ${
      stage >= n || !result
        ? 'translate-y-0 opacity-100'
        : 'pointer-events-none translate-y-3 opacity-0'
    }`;

  const fillExample = () => {
    setName('Mariela');
    setPhone('(305) 555-0142');
    setSvc('color');
    setWhen('tomorrow');
    setLang('es');
    setNote('');
    setErrors({});
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = {
      name: name.trim().length < 2,
      phone: phone.replace(/\D/g, '').length < 7,
    };
    setErrors(errs);
    if (errs.name || errs.phone) {
      return;
    }
    const time = new Date().toLocaleTimeString(lang === 'es' ? 'es-US' : 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
    setResult({
      name: name.trim(),
      phone: phone.trim(),
      svc,
      when,
      lang,
      note: note.trim(),
      time,
    });
    setRunId((n) => n + 1);
  };

  const replay = (l: Lang) => {
    setLang(l);
    setResult({ ...(result ?? EXAMPLE), lang: l });
    setRunId((n) => n + 1);
  };

  const build = (r: Result) => {
    const l = r.lang;
    const p = {
      name: r.name,
      phone: r.phone,
      service: t(`svc_${r.svc}_${l}`),
      when: t(`when_${r.when}_${l}`),
    };
    const noteInline = r.note ? t(`m_${l}_note`, { note: r.note }) : '';
    const noteLine = r.note ? t(`m_${l}_note_line`, { note: r.note }) : '';
    return {
      sms: t(`m_${l}_sms`, { ...p, note: noteInline }),
      subject: t(`m_${l}_subject`, p),
      body: t(`m_${l}_body`, { ...p, note: noteLine }),
      reply: t(`m_${l}_reply`, p),
      yes: t(`m_${l}_yes`),
      confirm: t(`m_${l}_confirm`, p),
    };
  };

  const shown = result ?? EXAMPLE;
  const out = build(shown);
  const radio = (value: Lang, label: string) => (
    <label
      key={value}
      className={`flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-xl border-2 px-4 py-2.5 font-semibold has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-bay ${
        lang === value ? 'border-ink bg-ink text-paper' : 'border-line bg-card text-ink'
      }`}
    >
      <input
        type="radio"
        name={`${uid}-lang`}
        value={value}
        checked={lang === value}
        onChange={() => setLang(value)}
        className="sr-only"
      />
      {label}
    </label>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="overflow-hidden rounded-card border border-line bg-card shadow-card">
        <div
          className="flex items-center gap-2 border-b border-line bg-paper-2 px-4 py-2.5"
          aria-hidden="true"
        >
          <span className="size-2.5 rounded-full bg-brand/70" />
          <span className="size-2.5 rounded-full bg-mango" />
          <span className="size-2.5 rounded-full bg-bay/70" />
          <span className="ml-2 min-w-0 flex-1 truncate rounded-full bg-card px-3 py-1 text-xs text-muted">
            {t('site_url')}
          </span>
        </div>
        <div className="flex items-center gap-4 bg-ink px-5 py-5 text-paper sm:px-7">
          <span
            aria-hidden="true"
            className="grid size-14 shrink-0 place-items-center rounded-full bg-mango text-xl font-bold text-ink"
          >
            DS
          </span>
          <div className="min-w-0">
            <p className="text-xl font-semibold">{t('site_name')}</p>
            <p className="text-sm text-paper/85">{t('site_tag')}</p>
            <p className="text-sm text-paper/85">{t('site_hours')}</p>
          </div>
        </div>
        <p className="border-b border-line bg-mango-soft px-5 py-2 text-xs font-semibold text-ink sm:px-7">
          {t('site_fiction')}
        </p>
        <form onSubmit={submit} noValidate className="p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold">{t('site_cta')}</h2>
              <p className="text-sm font-semibold text-bay">{t('form_title')}</p>
              <p className="mt-1 text-sm text-muted">{t('form_hint')}</p>
            </div>
            <button
              type="button"
              onClick={fillExample}
              className="min-h-11 rounded-full border-2 border-bay px-4 text-sm font-semibold text-bay hover:bg-bay hover:text-paper"
            >
              {t('fill_example')}
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor={`${uid}-name`} className="font-semibold">
                {t('f_name')}
              </label>
              <input
                id={`${uid}-name`}
                className={field}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('f_name_ph')}
                autoComplete="off"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? `${uid}-name-err` : undefined}
              />
              {errors.name ? (
                <p id={`${uid}-name-err`} className="mt-1 text-sm font-semibold text-brand-dark">
                  {t('err_name')}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor={`${uid}-phone`} className="font-semibold">
                {t('f_phone')}
              </label>
              <input
                id={`${uid}-phone`}
                className={field}
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('f_phone_ph')}
                autoComplete="off"
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
              />
              {errors.phone ? (
                <p id={`${uid}-phone-err`} className="mt-1 text-sm font-semibold text-brand-dark">
                  {t('err_phone')}
                </p>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-svc`} className="font-semibold">
                  {t('f_service')}
                </label>
                <select
                  id={`${uid}-svc`}
                  className={field}
                  value={svc}
                  onChange={(e) => setSvc(e.target.value as Svc)}
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {t(`svc_${s}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${uid}-when`} className="font-semibold">
                  {t('f_when')}
                </label>
                <select
                  id={`${uid}-when`}
                  className={field}
                  value={when}
                  onChange={(e) => setWhen(e.target.value as When)}
                >
                  {WHENS.map((w) => (
                    <option key={w} value={w}>
                      {t(`when_${w}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <fieldset>
              <legend className="font-semibold">{t('f_lang')}</legend>
              <div className="mt-1.5 flex gap-3">
                {radio('es', t('f_lang_es'))}
                {radio('en', t('f_lang_en'))}
              </div>
            </fieldset>
            <div>
              <label htmlFor={`${uid}-note`} className="font-semibold">
                {t('f_note')}
              </label>
              <textarea
                id={`${uid}-note`}
                className={`${field} min-h-24`}
                rows={3}
                maxLength={140}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t('f_note_ph')}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-brand px-7 py-3.5 text-lg font-semibold text-white shadow-card transition-colors hover:bg-brand-dark"
          >
            {t('submit')}
          </button>
        </form>
      </div>

      <section aria-labelledby={`${uid}-out`} className="lg:sticky lg:top-24">
        <h2 id={`${uid}-out`} className="text-2xl font-semibold">
          {t('out_title')}
        </h2>
        <div aria-live="polite" className="mt-4">
          <div className="space-y-5">
            <p className="rounded-xl border-2 border-dashed border-mango bg-mango-soft px-4 py-2 text-sm font-semibold text-ink">
              {result ? t('preview_note') : t('out_empty')}
            </p>
            <div
              className={`rounded-card border border-line bg-paper-2 p-4 sm:p-5 ${stageClass(2)}`}
            >
              <p className="text-sm font-bold tracking-widest text-brand uppercase">
                {t('phone_label')}
              </p>
              <div className="mx-auto mt-4 w-full max-w-[19rem] rounded-[2.5rem] border-[6px] border-ink bg-linear-to-b from-bay to-ink p-4 pb-8 shadow-card">
                <div className="mx-auto h-5 w-20 rounded-full bg-ink" aria-hidden="true" />
                <p className="mt-4 text-center text-5xl font-light text-paper">{shown.time}</p>
                <button
                  type="button"
                  onClick={() => setTab(tab === 'sms' ? 'email' : 'sms')}
                  aria-label={t('tap_hint')}
                  className={`mt-5 block w-full rounded-2xl bg-card/95 p-3 text-left shadow-card transition-all duration-500 ease-out motion-reduce:transition-none ${
                    stage >= 2 || !result ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
                  }`}
                >
                  <span className="flex items-center justify-between text-xs font-semibold text-muted">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="grid size-5 place-items-center rounded-md bg-brand text-[10px] text-white"
                        aria-hidden="true"
                      >
                        {tab === 'sms' ? 'SMS' : '@'}
                      </span>
                      {t(tab === 'sms' ? 'phone_app_sms' : 'phone_app_email')}
                    </span>
                    <span>{t('phone_now')}</span>
                  </span>
                  <span className="mt-1.5 block text-sm font-semibold text-ink">
                    {tab === 'sms' ? t('owner_sender') : out.subject}
                  </span>
                  <span className="mt-0.5 block text-sm whitespace-pre-line text-ink">
                    {tab === 'sms' ? out.sms : out.body}
                  </span>
                </button>
              </div>
              <p className="mt-3 text-center text-xs text-muted">
                {t('tap_hint')} {t('sent_in')}
              </p>
              <div
                role="group"
                aria-label={t('owner_label')}
                className="mx-auto mt-3 flex w-fit gap-1 rounded-full bg-card p-1"
              >
                {(['sms', 'email'] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={tab === k}
                    onClick={() => setTab(k)}
                    className={`min-h-10 rounded-full px-4 text-sm font-semibold ${
                      tab === k ? 'bg-ink text-paper' : 'text-ink hover:bg-paper-2'
                    }`}
                  >
                    {t(`tab_${k}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className={`rounded-card border border-line bg-card p-4 sm:p-5 ${stageClass(1)}`}>
              <p className="text-sm font-bold tracking-widest text-bay uppercase">
                {t('customer_label')}
              </p>
              <p className="mt-3 rounded-2xl rounded-tr-sm bg-mango-soft px-4 py-3 text-base text-ink">
                {out.reply}
              </p>
              <p className="mt-2 text-xs text-muted">
                {t(`lang_label_${shown.lang}`)} · {t('now')}
              </p>
            </div>

            <div className={`rounded-card border border-line bg-card p-4 sm:p-5 ${stageClass(3)}`}>
              <p className="text-sm font-bold tracking-widest text-brand uppercase">
                {t('followup_label')}
              </p>
              <p className="mt-3 ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-bay px-4 py-3 text-base text-paper">
                {out.yes}
              </p>
              <p className="mt-3 rounded-2xl rounded-tl-sm bg-mango-soft px-4 py-3 text-base text-ink">
                {out.confirm}
              </p>
            </div>

            <div className={`rounded-card border border-line bg-card p-4 sm:p-5 ${stageClass(3)}`}>
              <p className="text-sm font-bold tracking-widest text-bay uppercase">
                {t('next_title')}
              </p>
              <ol className="mt-3 space-y-3">
                {(['next_1', 'next_2', 'next_3'] as const).map((k, i) => (
                  <li key={k} className="flex items-start gap-3">
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-paper"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-1 text-base text-ink">
                      <span className="sr-only">
                        {t('step_word')} {i + 1}:{' '}
                      </span>
                      {t(k)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className={`flex flex-wrap items-center gap-3 ${stageClass(3)}`}>
              <p className="text-sm font-medium text-muted">{t('preview_note')}</p>
              <button
                type="button"
                onClick={() => replay(shown.lang === 'es' ? 'en' : 'es')}
                className="min-h-11 rounded-full border-2 border-bay px-4 text-sm font-semibold text-bay hover:bg-bay hover:text-paper"
              >
                {t(shown.lang === 'es' ? 'replay_en' : 'replay_es')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
