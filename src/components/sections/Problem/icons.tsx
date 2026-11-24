const common = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const MissedCallIcon = () => (
  <svg {...common}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    <path d="m16 3 5 5m0-5-5 5" />
  </svg>
);

export const PhoneBrokenIcon = () => (
  <svg {...common}>
    <rect x="7" y="2.5" width="10" height="19" rx="2" />
    <path d="M10.5 18.5h3M9.5 8l5 5m0-5-5 5" />
  </svg>
);

export const LanguageIcon = () => (
  <svg {...common}>
    <path d="M4 5h9M8.5 3v2M6 5c.5 3 2.5 6 6 8M11 5c-.5 3-3 6.5-7 8.5" />
    <path d="m13 20 4-9 4 9M14.5 17h5" />
  </svg>
);
