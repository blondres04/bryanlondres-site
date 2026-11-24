import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 text-center';
const sizes: Record<Size, string> = { md: 'px-5 py-2.5 text-base', lg: 'px-7 py-3.5 text-lg' };
const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white shadow-card hover:bg-brand-dark',
  secondary: 'border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink hover:bg-paper-2',
};

export const buttonClasses = (variant: Variant = 'primary', size: Size = 'md') =>
  `${base} ${sizes[size]} ${variants[variant]}`;

export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) => (
  <a className={`${buttonClasses(variant, size)} ${className}`} {...rest}>
    {children}
  </a>
);
