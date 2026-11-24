import { describe, expect, it, vi } from 'vitest';
import { submitIntake } from './intake';

const valid = {
  name: 'Ana Perez',
  business: 'Panaderia Sol',
  phone: '+54 9 11 1234 5678',
  email: 'ana@example.com',
  message: 'Quiero un sitio para mi negocio.',
  preferredLanguage: 'es',
  botField: '',
};

describe('submitIntake action', () => {
  it('logs and succeeds on valid input', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(vi.fn());

    await expect(submitIntake(valid)).resolves.toStrictEqual({ success: true });
    expect(info).toHaveBeenCalledOnce();
  });

  it('reports invalid fields', async () => {
    await expect(submitIntake({ ...valid, email: 'x' })).resolves.toStrictEqual({
      success: false,
      fields: ['email'],
    });
  });

  it('silently drops honeypot hits without logging', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(vi.fn());
    info.mockClear();

    await expect(submitIntake({ ...valid, botField: 'x' })).resolves.toStrictEqual({
      success: true,
    });
    expect(info).not.toHaveBeenCalled();
  });
});
