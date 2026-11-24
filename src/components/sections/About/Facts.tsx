import { useTranslations } from 'next-intl';

const keys = ['fact1', 'fact2', 'fact3', 'fact4'] as const;

export const Facts = () => {
  const t = useTranslations('about');

  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {keys.map((key) => (
        <li
          key={key}
          className="flex gap-3 rounded-2xl border border-line bg-card p-4 shadow-card"
        >
          <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mango" />
          <div>
            <p className="font-semibold text-ink">{t(`${key}_title`)}</p>
            <p className="text-base text-muted">{t(`${key}_text`)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
