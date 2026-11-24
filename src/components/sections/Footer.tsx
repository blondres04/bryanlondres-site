import { useTranslations } from 'next-intl';
import { AppConfig } from '@/utils/AppConfig';

export const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-2 px-4 py-8 text-sm text-muted">
        <span>
          © {new Date().getFullYear()} {AppConfig.name}. {t('rights')}
        </span>
        <span>{t('note')}</span>
      </div>
    </footer>
  );
};
