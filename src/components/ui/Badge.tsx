import type { ReactNode } from 'react';

type Tone = 'mango' | 'bay' | 'plain';
const tones: Record<Tone, string> = {
  mango: 'bg-mango-soft text-ink border-mango',
  bay: 'bg-bay-soft text-bay border-bay/30',
  plain: 'bg-card text-muted border-line',
};

export const Badge = ({ tone = 'mango', children }: { tone?: Tone; children: ReactNode }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${tones[tone]}`}
  >
    {children}
  </span>
);
