import type { ReactNode } from 'react';

export const FaqItem = ({
  question,
  children,
  defaultOpen = false,
}: {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) => (
  <details open={defaultOpen} className="group rounded-2xl border border-line bg-card shadow-card open:border-brand/40">
    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
      <span>{question}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="size-5 shrink-0 text-brand transition-transform duration-150 motion-reduce:transition-none group-open:rotate-180"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 8l5 5 5-5" />
      </svg>
    </summary>
    <div className="px-5 pb-5 text-base leading-relaxed text-muted">{children}</div>
  </details>
);
