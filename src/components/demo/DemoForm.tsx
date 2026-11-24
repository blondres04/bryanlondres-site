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
      stage >= n ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
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
    setResult({ name: name.trim(), phone: phone.trim(), svc, when, lang, note: note.trim(), time });
    setRunId((n) => n + 1);
  };

  const replay = (l: Lang) => {
    if (!result) {
      return;
    }
    setLang(l);
    setResult({ ...result, lang: l });
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

  const out = result ? build(result) : null;
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
      <form
        onSubmit={submit}
        noValidate
        className="rounded-card border border-line bg-card p-5 shadow-card sm:p-7"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">{t('form_title')}</h2>
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

      <section aria-labelledby={`${uid}-out`} className="lg:sticky lg:top-24">
        <h2 id={`${uid}-out`} className="text-2xl font-semibold">
          {t('out_title')}
        </h2>
        <div aria-live="polite" className="mt-4">
          {result && out ? (
            <div className="space-y-5">
              <div className={`rounded-card border border-line bg-paper-2 p-4 sm:p-5 ${stageClass(2)}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-bold tracking-widest text-brand uppercase">
                    {t('owner_label')}
                  </p>
                  <div
                    role="group"
                    aria-label={t('owner_label')}
                    className="flex gap-1 rounded-full bg-card p-1"
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

                {tab === 'sms' ? (
                  <div className="mx-auto mt-4 max-w-sm rounded-[2rem] border-4 border-ink bg-card p-4 shadow-card">
                    <p className="text-center text-xs font-semibold text-muted">
                      {t('owner_sender')} · {result.time}
                    </p>
                    <p className="mt-3 rounded-2xl rounded-tl-sm bg-bay-soft px-4 py-3 text-base text-ink">
                      {out.sms}
                    </p>
                    <p className="mt-2 text-xs text-muted">{t('sent_in')}</p>
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl border border-line bg-card p-4">
                    <p className="text-xs font-semibold text-muted">
                      {t('owner_sender')} · {result.time}
                    </p>
                    <p className="mt-1 font-semibold text-ink">{out.subject}</p>
                    <p className="mt-3 text-base whitespace-pre-line text-ink">{out.body}</p>
                  </div>
                )}
              </div>

              <div className={`rounded-card border border-line bg-card p-4 sm:p-5 ${stageClass(1)}`}>
                <p className="text-sm font-bold tracking-widest text-bay uppercase">
                  {t('customer_label')}
                </p>
                <p className="mt-3 rounded-2xl rounded-tr-sm bg-mango-soft px-4 py-3 text-base text-ink">
                  {out.reply}
                </p>
                <p className="mt-2 text-xs text-muted">
                  {t(`lang_label_${result.lang}`)} · {t('now')}
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

              <div className={`flex flex-wrap items-center gap-3 ${stageClass(3)}`}>
                <p className="text-sm font-medium text-muted">{t('preview_note')}</p>
                <button
                  type="button"
                  onClick={() => replay(result.lang === 'es' ? 'en' : 'es')}
                  className="min-h-11 rounded-full border-2 border-bay px-4 text-sm font-semibold text-bay hover:bg-bay hover:text-paper"
                >
                  {t(result.lang === 'es' ? 'replay_en' : 'replay_es')}
                </button>
              </div>
            </div>
          ) : (
            <p className="rounded-card border-2 border-dashed border-line bg-paper-2 p-6 text-muted">
              {t('out_empty')}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
