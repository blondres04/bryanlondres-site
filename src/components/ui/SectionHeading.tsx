import type { ReactNode } from 'react';

export const SectionHeading = ({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
}) => (
  <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    {eyebrow ? (
      <p
        className={`mb-3 text-sm font-bold tracking-widest uppercase ${tone === 'light' ? 'text-mango' : 'text-brand'}`}
      >
        {eyebrow}
      </p>
    ) : null}
    <h2
      className={`text-3xl leading-tight font-semibold tracking-tight sm:text-4xl ${tone === 'light' ? 'text-paper' : ''}`}
    >
      {title}
    </h2>
    {intro ? (
      <p className={`mt-4 text-lg ${tone === 'light' ? 'text-paper/80' : 'text-muted'}`}>{intro}</p>
    ) : null}
  </div>
);
