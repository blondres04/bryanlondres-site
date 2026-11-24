'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitIntake } from '@/app/actions/intake';
import type { IntakeInput } from '@/validations/IntakeValidation';
import { IntakeValidation, PREFERRED_LANGUAGES } from '@/validations/IntakeValidation';

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputClass = 'mt-1 w-full rounded-lg border border-line px-3 py-2 focus:border-brand';

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

export const Contact = () => {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IntakeInput>({
    resolver: zodResolver(IntakeValidation),
    defaultValues: {
      name: '',
      business: '',
      phone: '',
      email: '',
      message: '',
      preferredLanguage: locale === 'en' ? 'en' : 'es',
      botField: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus('sending');

    try {
      const result = await submitIntake(values);

      if (!result.success) {
        setStatus('error');
        return;
      }

      await postToNetlifyForms(values);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  });

  const fields = [
    ['name', 'text', 'name'],
    ['business', 'text', 'organization'],
    ['phone', 'tel', 'tel'],
    ['email', 'email', 'email'],
  ] as const;

  return (
    <section id="contact" className="mx-auto max-w-2xl px-4 py-16">
      <h2 className="text-3xl font-bold">{t('title')}</h2>
      <p className="mt-2 text-muted">{t('intro')}</p>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
        {fields.map(([name, type, autoComplete]) => (
          <label key={name} className="block text-sm font-medium">
            {t(name)}
            <input
              {...register(name)}
              type={type}
              autoComplete={autoComplete}
              aria-invalid={errors[name] ? 'true' : undefined}
              className={inputClass}
            />
            {errors[name] && (
              <span role="alert" className="text-sm text-red-600">
                {t('error_invalid')}
              </span>
            )}
          </label>
        ))}

        <label className="block text-sm font-medium">
          {t('message')}
          <textarea
            {...register('message')}
            rows={5}
            aria-invalid={errors.message ? 'true' : undefined}
            className={inputClass}
          />
          {errors.message && (
            <span role="alert" className="text-sm text-red-600">
              {t('error_invalid')}
            </span>
          )}
        </label>

        <label className="block text-sm font-medium">
          {t('preferred_language')}
          <select {...register('preferredLanguage')} className={inputClass}>
            {PREFERRED_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {t(`language_${lang}`)}
              </option>
            ))}
          </select>
        </label>

        {/* Honeypot, hidden from people and assistive tech. Bots fill it; the server drops them. */}
        <div aria-hidden="true" className="hidden">
          <label>
            Leave empty
            <input {...register('botField')} type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {status === 'sending' ? t('sending') : t('submit')}
        </button>

        {status === 'success' && <output className="block text-brand">{t('success')}</output>}
        {status === 'error' && (
          <p role="alert" className="text-red-600">
            {t('error_generic')}
          </p>
        )}
      </form>
    </section>
  );
};
