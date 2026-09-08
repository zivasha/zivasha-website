/**
 * Zivasha vector logo system — a professional recreation of the brand mark
 * (golden Z entwined with leaves inside a fine circle) as crisp SVG.
 * The wordmark renders in Cinzel (loaded site-wide), matching the identity.
 */

type Tone = 'light' | 'dark';

const palette = (tone: Tone) =>
  tone === 'dark'
    ? { letter: '#c9a24b', ring: '#c9a24b', leafA: '#6f9c7d', leafB: '#4f7a5c', text: '#f3ecd9', sub: '#cfc8b2' }
    : { letter: '#a87e2f', ring: '#b8945a', leafA: '#4f7a5c', leafB: '#2e5138', text: '#1e3a2a', sub: '#6e5f49' };

function Sprig({ c }: { c: { letter: string; leafA: string; leafB: string } }) {
  return (
    <g>
      {/* stem rising from the Z's diagonal */}
      <path
        d="M63 62 C72 50 76 40 78 28"
        fill="none"
        stroke={c.letter}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* upper leaf */}
      <path d="M77 31 C70 22 70 12 78 6 C86 12 86 22 79 30 Z" fill={c.leafA} />
      <path d="M78 29 L78 9" stroke={c.letter} strokeWidth="1" opacity="0.7" />
      {/* lower leaf, sweeping right */}
      <path d="M70 46 C80 36 94 34 106 40 C100 52 86 56 72 50 Z" fill={c.leafB} />
      <path d="M73 48 C84 43 94 41 103 41" fill="none" stroke={c.letter} strokeWidth="1" opacity="0.7" />
      {/* golden bud */}
      <path d="M87 14 C87 8 90 4 93 2 C96 4 99 8 99 14 C99 19 96 23 93 24 C90 23 87 19 87 14 Z" fill={c.letter} />
      <path d="M93 5 L93 21" stroke="#f7f1e3" strokeWidth="0.8" opacity="0.65" />
    </g>
  );
}

export function ZivashaMark({
  size = 96,
  tone = 'light',
  title = 'Zivasha mark',
}: {
  size?: number;
  tone?: Tone;
  title?: string;
}) {
  const c = palette(tone);
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={title}>
      <title>{title}</title>
      {/* fine ring, broken top-right so the sprig can escape */}
      <path
        d="M97 21 A52 52 0 1 0 110 74"
        fill="none"
        stroke={c.ring}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
        transform="rotate(-40 60 60)"
      />
      <text
        x="56"
        y="86"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-display), Cinzel, Georgia, serif" }}
        fontWeight="600"
        fontSize="70"
        fill={c.letter}
      >
        Z
      </text>
      <Sprig c={c} />
    </svg>
  );
}

export function ZivashaLockup({
  height = 40,
  tone = 'light',
  tagline = false,
}: {
  height?: number;
  tone?: Tone;
  tagline?: boolean;
}) {
  const c = palette(tone);
  const vbH = tagline ? 132 : 108;
  return (
    <svg
      height={height}
      viewBox={`0 0 430 ${vbH}`}
      role="img"
      aria-label="Zivasha — Tradition Nourished Gifted"
      style={{ display: 'block' }}
    >
      <title>Zivasha — Tradition Nourished Gifted</title>
      <g transform="translate(0,-2) scale(0.92)">
        {/* compact mark */}
        <path
          d="M97 21 A52 52 0 1 0 110 74"
          fill="none"
          stroke={c.ring}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.85"
          transform="rotate(-40 60 60)"
        />
        <text
          x="56"
          y="86"
          textAnchor="middle"
          style={{ fontFamily: "var(--font-display), Cinzel, Georgia, serif" }}
          fontWeight="600"
          fontSize="70"
          fill={c.letter}
        >
          Z
        </text>
        <Sprig c={c} />
      </g>
      <text
        x="132"
        y={tagline ? 62 : 70}
        style={{ fontFamily: "var(--font-display), Cinzel, Georgia, serif" }}
        fontWeight="600"
        fontSize="44"
        letterSpacing="10"
        fill={c.text}
      >
        ZIVASHA
      </text>
      {tagline && (
        <text
          x="135"
          y="94"
          style={{ fontFamily: "var(--font-display), Cinzel, Georgia, serif" }}
          fontSize="12"
          letterSpacing="2.6"
          fill={c.sub}
        >
          TRADITION · NOURISHED · GIFTED
        </text>
      )}
    </svg>
  );
}
