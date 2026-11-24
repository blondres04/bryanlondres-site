import type { IntakeInput } from './IntakeValidation';

/** Kept free of zod and form libraries so the home page client bundle stays small. */
export const PREFERRED_LANGUAGES = ['es', 'en'] as const;

export type IntakeErrors = Partial<Record<keyof IntakeInput, true>>;

const PHONE = /^[+\d][\d\s().-]{6,24}$/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

const text = (value: FormDataEntryValue | null) => (typeof value === 'string' ? value.trim() : '');

/**
 * Client-side mirror of IntakeValidation (src/validations/IntakeValidation.ts).
 * The server action runs the zod schema again and stays the source of truth;
 * keep the two in step when a rule changes.
 * @param data The submitted form.
 * @returns The cleaned values, or the set of invalid fields.
 */
export const validateIntake = (
  data: FormData,
): { values: IntakeInput; errors: IntakeErrors } => {
  const lang = text(data.get('preferredLanguage'));
  const values: IntakeInput = {
    name: text(data.get('name')),
    business: text(data.get('business')),
    phone: text(data.get('phone')),
    email: text(data.get('email')),
    message: text(data.get('message')),
    preferredLanguage: lang === 'en' ? 'en' : 'es',
    botField: typeof data.get('botField') === 'string' ? (data.get('botField') as string) : '',
  };
  const errors: IntakeErrors = {};

  if (values.name.length < 2 || values.name.length > 120) {
    errors.name = true;
  }
  if (values.business.length < 2 || values.business.length > 160) {
    errors.business = true;
  }
  if (!PHONE.test(values.phone)) {
    errors.phone = true;
  }
  if (!EMAIL.test(values.email) || values.email.length > 200) {
    errors.email = true;
  }
  if (values.message.length < 10 || values.message.length > 2000) {
    errors.message = true;
  }

  return { values, errors };
};
