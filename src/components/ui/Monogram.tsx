export const Monogram = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    role="img"
    aria-label="BL"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="13" fill="#1d1410" />
    <rect x="4" y="4" width="40" height="40" rx="10" fill="none" stroke="#f4a22d" strokeWidth="1.5" />
    <text
      x="24"
      y="32"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="23"
      fontWeight="700"
      fill="#fff8ee"
      letterSpacing="-1"
    >
      BL
    </text>
  </svg>
);
