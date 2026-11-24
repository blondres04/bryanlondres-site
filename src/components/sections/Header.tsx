import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonClasses, Container, Monogram } from '@/components/ui';
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
  // CTA slot: WhatsApp once a number is configured, otherwise the contact form.
  const ctaHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : '#contact';

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex items-center justify-between gap-2 py-2.5">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={AppConfig.name}>
          <Monogram size={36} />
          <span className="font-display text-base font-semibold tracking-tight whitespace-nowrap max-[359px]:sr-only">
            {AppConfig.name}
          </span>
        </Link>

        <nav aria-label={t('nav_label')} className="hidden gap-6 text-base md:flex">
          {NAV.map(([id, key]) => (
            <a key={id} href={`#${id}`} className="font-medium text-muted hover:text-ink">
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <a
            href={ctaHref}
            className={`${buttonClasses('primary', 'md')} !min-h-10 !px-3.5 !py-1.5 text-sm whitespace-nowrap`}
          >
            {t('cta')}
          </a>
        </div>
      </Container>
    </header>
  );
};
