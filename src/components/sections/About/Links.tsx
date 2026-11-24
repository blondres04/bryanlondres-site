import { useTranslations } from 'next-intl';

const linkClass =
  'inline-flex min-h-11 items-center rounded-full border border-bay px-5 py-2 font-semibold text-bay transition-colors hover:bg-bay hover:text-paper';

export const Links = () => {
  const t = useTranslations('about');

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <a
        className={linkClass}
        href="https://linkedin.com/in/bryanlondres"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('linkedin_aria')}
      >
        LinkedIn
      </a>
      <a
        className={linkClass}
        href="https://github.com/blondres04"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('github_aria')}
      >
        GitHub
      </a>
      <a className={linkClass} href="mailto:bryanlondres5@gmail.com">
        {t('email_label')}
      </a>
    </div>
  );
};
