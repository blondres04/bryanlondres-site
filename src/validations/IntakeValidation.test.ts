import { describe, expect, it } from 'vitest';
import { IntakeValidation } from './IntakeValidation';

const valid = {
  name: 'Ana Perez',
  business: 'Panaderia Sol',
  phone: '+54 9 11 1234 5678',
  email: 'ana@example.com',
  message: 'Quiero un sitio para mi negocio.',
  preferredLanguage: 'es',
  botField: '',
};

describe('intake schema', () => {
  it('accepts a valid submission', () => {
    expect(IntakeValidation.safeParse(valid).success).toBeTruthy();
  });

  it('rejects a filled honeypot', () => {
    expect(IntakeValidation.safeParse({ ...valid, botField: 'spam' }).success).toBeFalsy();
  });

  it('rejects a bad email and a short message', () => {
    const result = IntakeValidation.safeParse({ ...valid, email: 'nope', message: 'hi' });

    expect(result.success).toBeFalsy();
  });
});
