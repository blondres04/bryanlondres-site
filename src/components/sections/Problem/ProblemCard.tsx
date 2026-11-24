import type { ReactNode } from 'react';

export const ProblemCard = ({
  icon,
  scene,
  title,
  body,
  cost,
}: {
  icon: ReactNode;
  scene: string;
  title: string;
  body: string;
  cost: string;
}) => (
  <li className="flex flex-col rounded-[var(--radius-card)] border border-line bg-card p-6 shadow-card">
    <span
      aria-hidden="true"
      className="flex size-12 items-center justify-center rounded-2xl bg-mango-soft text-brand"
    >
      {icon}
    </span>
    <p className="mt-5 text-sm font-bold tracking-wide text-muted uppercase">{scene}</p>
    <h3 className="mt-2 text-xl leading-snug font-semibold">{title}</h3>
    <p className="mt-3 text-muted">{body}</p>
    <p className="mt-6 border-t border-line pt-4 text-base font-semibold text-ink">{cost}</p>
  </li>
);
