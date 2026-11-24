import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { Link } from '@/libs/I18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

const NAV = [
  ['offer', 'nav_offer'],
  ['how-it-works', 'nav_how'],
  ['about', 'nav_about'],
  ['faq', 'nav_faq'],
] as const;

export const Header = () => {
  const t = useTranslations('header');
  const whatsappNumber: string = AppConfig.contact.whatsappNumber;
  // CTA slot: links to WhatsApp once a number is configured, otherwise to the contact form.
  const ctaHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : '#contact';

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold">
          {AppConfig.name}
        </Link>

        <nav aria-label={t('nav_label')} className="hidden gap-5 text-sm md:flex">
          {NAV.map(([id, key]) => (
            <a key={id} href={`#${id}`} className="text-muted hover:text-ink">
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <a
            href={ctaHref}
            className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark sm:inline-block"
          >
            {t('whatsapp_cta')}
          </a>
        </div>
      </div>
    </header>
  );
};
