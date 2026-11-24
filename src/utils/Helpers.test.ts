import { describe, expect, it } from 'vitest';
import { routing } from '@/libs/I18nRouting';
import { getI18nPath, getRobotsMetadata } from './Helpers';

describe('Helpers', () => {
  describe('I18n path helper', () => {
    it('keeps path unchanged when locale is default', () => {
      const url = '/random-url';

      expect(getI18nPath(url, routing.defaultLocale)).toBe(url);
    });

    it('prefixes path with locale when locale is not default', () => {
      expect(getI18nPath('/random-url', 'en')).toBe('/en/random-url');
    });
  });

  describe('Indexing gate', () => {
    it('is closed by default', () => {
      expect(getRobotsMetadata()).toStrictEqual({ index: false, follow: false });
    });
  });
});
