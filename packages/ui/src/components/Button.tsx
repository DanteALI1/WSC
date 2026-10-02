import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'ghost' | 'ink';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const styles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--wsc-signal)',
    color: 'var(--wsc-text-on-signal)',
    border: '1px solid transparent',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--wsc-text)',
    border: '1px solid rgba(11, 21, 32, 0.18)',
  },
  ink: {
    background: 'var(--wsc-ink)',
    color: 'var(--wsc-text-on-ink)',
    border: '1px solid transparent',
  },
};

export function Button({
  variant = 'primary',
  children,
  style,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.7rem 1.25rem',
        borderRadius: 'var(--wsc-radius-sm)',
        fontFamily: 'var(--wsc-font-body)',
        fontSize: '0.9375rem',
        fontWeight: 600,
        letterSpacing: '0.01em',
        cursor: rest.disabled ? 'not-allowed' : 'pointer',
        opacity: rest.disabled ? 0.55 : 1,
        transition: 'transform 160ms ease, background 160ms ease, border-color 160ms ease',
        ...styles[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
