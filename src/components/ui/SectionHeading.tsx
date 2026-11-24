import type { ReactNode } from 'react';

export const SectionHeading = ({
  eyebrow,
  title,
  intro,
  align = 'left',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
}) => (
  <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    {eyebrow ? (
      <p className="mb-3 text-sm font-bold tracking-widest text-brand uppercase">{eyebrow}</p>
    ) : null}
    <h2 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{title}</h2>
    {intro ? <p className="mt-4 text-lg text-muted">{intro}</p> : null}
  </div>
);
