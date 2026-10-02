import type { CSSProperties } from 'react';
import { WSC_BRAND, WSC_BRAND_SHORT } from '../brand';

export type BrandMarkProps = {
  size?: 'sm' | 'lg' | 'hero';
  showWordmark?: boolean;
  inverted?: boolean;
  style?: CSSProperties;
};

const sizeMap = {
  sm: { mark: 28, word: '1.05rem' },
  lg: { mark: 40, word: '1.45rem' },
  hero: { mark: 56, word: 'clamp(2.4rem, 5vw, 3.6rem)' },
} as const;

export function BrandMark({
  size = 'lg',
  showWordmark = true,
  inverted = false,
  style,
}: BrandMarkProps) {
  const s = sizeMap[size];
  const color = inverted ? 'var(--wsc-text-on-ink)' : 'var(--wsc-ink)';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'hero' ? '1rem' : '0.65rem',
        color,
        ...style,
      }}
      aria-label={WSC_BRAND}
    >
      <svg
        width={s.mark}
        height={s.mark}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
      >
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="10"
          fill={inverted ? 'rgba(238,244,247,0.08)' : 'var(--wsc-ink)'}
        />
        <path
          d="M12 30.5V17.5L24 11l12 6.5v13L24 37l-12-6.5Z"
          stroke={inverted ? 'var(--wsc-signal-soft)' : 'var(--wsc-signal)'}
          strokeWidth="2.2"
          fill="none"
        />
        <path
          d="M18 24h12M24 18.5v11"
          stroke={inverted ? 'var(--wsc-text-on-ink)' : 'var(--wsc-mist)'}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark ? (
        <span
          style={{
            fontFamily: 'var(--wsc-font-display)',
            fontWeight: 700,
            fontSize: s.word,
            letterSpacing: size === 'hero' ? '-0.03em' : '-0.02em',
            lineHeight: 1,
          }}
        >
          {WSC_BRAND_SHORT}
        </span>
      ) : null}
    </div>
  );
}
