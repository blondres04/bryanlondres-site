import * as z from 'zod';

export const PREFERRED_LANGUAGES = ['es', 'en'] as const;

/** Intake form schema, shared by the client form and the server action. */
export const IntakeValidation = z.object({
  name: z.string().trim().min(2).max(120),
  business: z.string().trim().min(2).max(160),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s().-]{6,24}$/u),
  email: z.email().max(200),
  message: z.string().trim().min(10).max(2000),
  preferredLanguage: z.enum(PREFERRED_LANGUAGES),
  // Honeypot: real people never see or fill this field.
  botField: z.string().max(0),
});

export type IntakeInput = z.infer<typeof IntakeValidation>;
