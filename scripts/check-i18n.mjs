// Key-parity check: every key in every section file must exist in both locales.
// Usage: npm run check:i18n
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = fileURLToPath(new URL('../src/locales/', import.meta.url));
const locales = readdirSync(base, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const flatten = (value, prefix = '') =>
  Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return child !== null && typeof child === 'object' ? flatten(child, path) : [[path, child]];
  });

const sectionsOf = (locale) =>
  readdirSync(join(base, locale))
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace(/\.json$/u, ''));

const allSections = [...new Set(locales.flatMap(sectionsOf))].sort();
const problems = [];

for (const section of allSections) {
  const keysByLocale = {};

  for (const locale of locales) {
    if (!sectionsOf(locale).includes(section)) {
      problems.push(`${locale}/${section}.json is missing`);
      continue;
    }

    const entries = flatten(
      JSON.parse(readFileSync(join(base, locale, `${section}.json`), 'utf8')),
    );
    keysByLocale[locale] = new Set(entries.map(([key]) => key));

    for (const [key, text] of entries) {
      if (typeof text !== 'string' || text.trim() === '') {
        problems.push(`${locale}/${section}.json: "${key}" is empty or not a string`);
      }
    }
  }

  const present = Object.keys(keysByLocale);
  const union = new Set(present.flatMap((locale) => [...keysByLocale[locale]]));

  for (const locale of present) {
    for (const key of union) {
      if (!keysByLocale[locale].has(key)) {
        problems.push(`${locale}/${section}.json: missing key "${key}"`);
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`i18n check failed (${problems.length}):`);
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  process.exit(1);
}

console.log(
  `i18n check passed: ${allSections.length} sections x ${locales.length} locales (${locales.join(', ')}).`,
);
