type Tone = 'paper' | 'paper2' | 'bay' | 'ink';

const bg: Record<Tone, string> = {
  paper: 'bg-paper',
  paper2: 'bg-paper-2',
  bay: 'bg-bay',
  ink: 'bg-ink',
};
const fg: Record<Tone, string> = {
  paper: 'text-paper',
  paper2: 'text-paper-2',
  bay: 'text-bay',
  ink: 'text-ink',
};

// A soft wave that carries one section's background into the next. Decorative only.
export const Divider = ({ from, to }: { from: Tone; to: Tone }) => (
  <div aria-hidden="true" className={`${bg[from]} leading-[0]`}>
    <svg
      viewBox="0 0 1440 56"
      preserveAspectRatio="none"
      className={`block h-7 w-full sm:h-12 ${fg[to]}`}
      focusable="false"
    >
      <path
        d="M0 56V30C180 6 360 6 540 24C720 42 900 52 1080 36C1230 22 1340 14 1440 22V56Z"
        fill="currentColor"
      />
    </svg>
  </div>
);
