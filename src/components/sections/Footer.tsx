import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { Button, Container, Monogram } from '@/components/ui';
import { AppConfig } from '@/utils/AppConfig';

const EMAIL = 'bryanlondres5@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/bryanlondres';
const GITHUB = 'https://github.com/blondres04';

const linkClass =
  'inline-flex min-h-11 items-center font-medium text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-mango';

export const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer data-section="footer" className="border-t-4 border-mango bg-bay text-paper">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Monogram size={44} />
              <span className="font-display text-xl font-semibold">{AppConfig.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-paper/85">{t('tagline')}</p>
            <p className="mt-4 text-sm font-medium text-paper">{t('area')}</p>
            <p className="mt-2 max-w-sm text-sm text-paper/80">{t('honest')}</p>
            <Button href="#contact" className="mt-5">
              {t('cta')}
            </Button>
          </div>

          <nav aria-label={t('contact_label')}>
            <h2 className="font-sans text-sm font-bold tracking-wide text-mango uppercase">
              {t('contact_title')}
            </h2>
            <ul className="mt-2">
              <li>
                <a href={`mailto:${EMAIL}`} className={linkClass}>
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  GitHub
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-sm font-bold tracking-wide text-mango uppercase">
              {t('privacy_title')}
            </h2>
            <p className="mt-3 text-paper/85">{t('privacy')}</p>
            <p className="mt-6 text-sm font-bold tracking-wide text-mango uppercase">
              {t('language_title')}
            </p>
            <div className="mt-2 inline-block">
              <LocaleSwitcher />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/20 pt-6 text-sm text-paper/80 sm:flex-row sm:justify-between">
          <p>{t('independent')}</p>
          <p>
            © {new Date().getFullYear()} {AppConfig.name}
          </p>
        </div>
      </Container>
    </footer>
  );
};
