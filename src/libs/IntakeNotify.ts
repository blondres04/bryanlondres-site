import type { IntakeInput } from '@/validations/IntakeValidation';

/**
 * Hook called after a valid intake submission.
 * TODO: wire an email/SMS/WhatsApp provider here (Resend, Twilio, etc). Until then
 * submissions are only logged server-side and recorded by Netlify Forms.
 * @param _submission The validated submission.
 * @returns Resolves when the notification has been dispatched.
 */
export const notifyIntake = async (_submission: Omit<IntakeInput, 'botField'>) => {
  await Promise.resolve();
};
