'use server';

import { notifyIntake } from '@/libs/IntakeNotify';
import { IntakeValidation } from '@/validations/IntakeValidation';

export type IntakeResult = { success: true } | { success: false; fields: string[] };

export async function submitIntake(input: unknown): Promise<IntakeResult> {
  const parsed = IntakeValidation.safeParse(input);

  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0])))];

    // A filled honeypot is a bot: pretend success so it learns nothing, and do not log it.
    if (fields.includes('botField')) {
      return { success: true };
    }

    return { success: false, fields };
  }

  const { botField: _botField, ...submission } = parsed.data;

  // Server-side log. Visible in the Netlify function logs.
  console.info(
    JSON.stringify({ event: 'intake_submission', at: new Date().toISOString(), ...submission }),
  );

  await notifyIntake(submission);

  return { success: true };
}
