'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { submitIntake } from '@/app/actions/intake';
import { buttonClasses, Container, SectionHeading } from '@/components/ui';
import type { IntakeInput } from '@/validations/IntakeValidation';
import type { IntakeErrors } from '@/validations/IntakeClient';
import { PREFERRED_LANGUAGES, validateIntake } from '@/validations/IntakeClient';

type Status = 'idle' | 'sending' | 'success' | 'error';

const EMAIL = 'bryanlondres5@gmail.com';

const inputClass =
  'mt-1.5 block min-h-12 w-full rounded-xl border-2 border-line bg-card px-4 py-3 text-base text-ink focus:border-bay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bay aria-[invalid=true]:border-brand';
const labelClass = 'block text-base font-semibold text-ink';

/**
 * Netlify Forms only detects forms present in static HTML at deploy time, so the real
 * form here is mirrored by public/__forms.html. We POST url-encoded data to that file
 * and Netlify records it. Field names must match the skeleton.
 * @param values The validated form values.
 * @returns Resolves when the request settles; failures are ignored on purpose.
 */
const postToNetlifyForms = async (values: IntakeInput) => {
  const { botField, ...rest } = values;
  const body = new URLSearchParams({ 'form-name': 'intake', ...rest, 'bot-field': botField });

  try {
    await fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  } catch {
    // Netlify Forms is a backup record; the server action is the source of truth.
  }
};

const fields = [
  { name: 'name', type: 'text', autoComplete: 'name', inputMode: undefined, hint: false },
  {
    name: 'business',
    type: 'text',
    autoComplete: 'organization',
    inputMode: undefined,
    hint: true,
  },
  { name: 'phone', type: 'tel', autoComplete: 'tel', inputMode: 'tel', hint: true },
  { name: 'email', type: 'email', autoComplete: 'email', inputMode: 'email', hint: false },
] as const;

export const Contact = () => {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const successRef = useRef<HTMLDivElement>(null);
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(t('email_subject'))}`;

  useEffect(() => {
    if (status === 'success') {
      successRef.current?.focus();
    }
  }, [status]);

  const [errors, setErrors] = useState<IntakeErrors>({});

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { values, errors: found } = validateIntake(new FormData(event.currentTarget));
    setErrors(found);

    if (Object.keys(found).length > 0 || values.botField !== '') {
      return;
    }

    setStatus('sending');

    try {
      const result = await submitIntake(values);

      if (!result.success) {
        setStatus('error');
        return;
      }

      await postToNetlifyForms(values);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <section
      id="contact"
      data-section="contact"
      className="scroll-mt-16 bg-bay py-16 text-paper sm:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <SectionHeading tone="light" eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')} />
            <p className="mt-5 inline-block rounded-full bg-mango px-4 py-1.5 text-sm font-bold text-ink">
              {t('promise')}
            </p>

            <ol className="mt-8 space-y-4">
              {(['step1', 'step2', 'step3'] as const).map((k, i) => (
                <li key={k} className="flex items-start gap-3 text-base text-paper/90">
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-mango text-sm font-bold text-mango"
                  >
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{t(k)}</span>
                </li>
              ))}
            </ol>

            <p className="mt-8 text-base text-paper/90">
              {t('email_prompt')}{' '}
              <a
                href={mailto}
                className="inline-flex min-h-11 items-center font-semibold text-paper underline decoration-mango underline-offset-4 hover:text-mango"
              >
                {t('email_link')}
              </a>
            </p>
          </div>

          <div>
          {status === 'success' ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="scroll-mt-24 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bay rounded-(--radius-card) border-2 border-mango bg-card p-6 text-ink shadow-card"
            >
              <p className="font-display text-2xl font-semibold text-bay">{t('success_title')}</p>
              <p className="mt-2 text-ink">{t('success')}</p>
              <p className="mt-3 text-sm text-muted">
                {t('success_email')}{' '}
                <a href={mailto} className="font-semibold text-brand underline underline-offset-4">
                  {EMAIL}
                </a>
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              aria-busy={status === 'sending'}
              className="space-y-5 rounded-(--radius-card) border border-line bg-card p-5 text-ink shadow-card sm:p-8"
            >
              {hasErrors && (
                <p role="alert" className="font-semibold text-brand">
                  {t('error_invalid')}
                </p>
              )}

              {fields.map(({ name, type, autoComplete, inputMode, hint }) => {
                const hintId = `${name}-hint`;
                const errId = `${name}-err`;
                return (
                  <div key={name}>
                    <label htmlFor={`f-${name}`} className={labelClass}>
                      {t(name)}
                    </label>
                    <input
                      id={`f-${name}`}
                      name={name}
                      type={type}
                      autoComplete={autoComplete}
                      inputMode={inputMode}
                      enterKeyHint="next"
                      autoCapitalize={type === 'email' ? 'none' : undefined}
                      aria-required="true"
                      aria-invalid={errors[name] ? 'true' : undefined}
                      aria-describedby={
                        [hint ? hintId : null, errors[name] ? errId : null]
                          .filter(Boolean)
                          .join(' ') || undefined
                      }
                      className={inputClass}
                    />
                    {hint && (
                      <p id={hintId} className="mt-1 text-sm text-muted">
                        {t(`${name}_hint`)}
                      </p>
                    )}
                    {errors[name] && (
                      <p id={errId} className="mt-1 text-sm font-semibold text-brand">
                        {t(`error_${name}`)}
                      </p>
                    )}
                  </div>
                );
              })}

              <div>
                <label htmlFor="f-message" className={labelClass}>
                  {t('message')}
                </label>
                <textarea
                  id="f-message"
                  name="message"
                  rows={4}
                  autoComplete="off"
                  enterKeyHint="send"
                  aria-required="true"
                  aria-invalid={errors.message ? 'true' : undefined}
                  aria-describedby={errors.message ? 'message-err message-hint' : 'message-hint'}
                  className={inputClass}
                />
                <p id="message-hint" className="mt-1 text-sm text-muted">
                  {t('message_hint')}
                </p>
                {errors.message && (
                  <p id="message-err" className="mt-1 text-sm font-semibold text-brand">
                    {t('error_message')}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="f-lang" className={labelClass}>
                  {t('preferred_language')}
                </label>
                <select id="f-lang" name="preferredLanguage" defaultValue={locale === 'en' ? 'en' : 'es'} className={inputClass}>
                  {PREFERRED_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {t(`language_${lang}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Honeypot, hidden from people and assistive tech. Bots fill it; the server drops them. */}
              <div aria-hidden="true" className="hidden">
                <label>
                  Leave empty
                  <input name="botField" type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`${buttonClasses('primary', 'lg')} w-full cursor-pointer disabled:opacity-60`}
              >
                {status === 'sending' ? t('sending') : t('submit')}
              </button>

              {status === 'error' && (
                <p role="alert" className="font-semibold text-brand">
                  {t('error_generic')}
                </p>
              )}

              <p className="text-sm text-muted">{t('fine_print')}</p>
              <p className="text-sm text-muted">{t('privacy')}</p>
            </form>
          )}

          </div>
        </div>
      </Container>
    </section>
  );
};
