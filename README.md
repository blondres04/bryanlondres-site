# bryanlondres-site

Bilingual (es default at `/`, en at `/en`) marketing site. Next.js + next-intl + Tailwind v4, deployed on Netlify.

## Commands

- `npm run dev` / `npm run build` / `npm run start`
- `npm run check:i18n` fails on any key or file missing in either locale
- `npm run check:types`, `npm run lint`, `npm test`, `npm run test:e2e`

## Where things live

- `src/components/sections/` one component per page section, composed in `src/app/[locale]/page.tsx`
- `src/locales/<locale>/<section>.json` copy, one file per section per locale (file name = next-intl namespace)
- `src/utils/AppConfig.ts` `SITE_INDEXABLE` (indexing gate, false until launch), contact slots, section list
- `src/app/actions/intake.ts` intake server action; `src/libs/IntakeNotify.ts` has the TODO hook for email/SMS
- `public/__forms.html` Netlify Forms skeleton for the "intake" form (Netlify only detects forms in static HTML)

Adding a section: add the name to `MESSAGE_SECTIONS` in AppConfig, create both locale JSON files, and add the type to `src/types/I18n.ts`.

No secrets are needed to build. `NEXT_PUBLIC_APP_URL` is optional (used for sitemap and metadata base).
