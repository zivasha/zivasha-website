/**
 * Zivasha product illustration system — every SKU on the site is drawn in one
 * consistent engraved-gold style (fine gold line work, deep-green accents on
 * cream), replacing pasted images with crisp, owned vector art.
 */

export type ArtKind = 'hamper3' | 'hamper4' | 'hamper5' | 'combo' | 'laddu' | 'bar' | 'pouch';

const G = '#a87e2f'; // gold line
const GD = '#8a6524'; // deep gold
const G2 = '#c9a24b'; // bright gold
const GR = '#1e3a2a'; // deep green
const GRS = '#4f7a5c'; // soft green
const CR = '#fffdf6'; // paper
const SOFT = '#ecdfc0'; // soft gold fill

function Jar({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x="0" y="8" width="26" height="34" rx="6" fill={CR} stroke={G} strokeWidth="1.5" />
      <rect x="-2" y="0" width="30" height="9" rx="3.5" fill={G2} stroke={GD} strokeWidth="1" />
      <circle cx="8" cy="26" r="2.4" fill={GRS} />
      <circle cx="15" cy="32" r="2.4" fill={GD} />
      <circle cx="18" cy="22" r="2.4" fill={G2} />
      <circle cx="9" cy="35" r="2" fill={G} />
    </g>
  );
}

function Bow({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`} fill="none" stroke={GD} strokeWidth="1.6">
      <path d="M0 0 C-9 -7 -16 -3 -14 3 C-12 8 -5 6 0 0 Z" fill={G2} />
      <path d="M0 0 C9 -7 16 -3 14 3 C12 8 5 6 0 0 Z" fill={G2} />
      <circle cx="0" cy="0" r="2.6" fill={GD} stroke="none" />
      <path d="M-3 2 L-7 12 M3 2 L7 12" />
    </g>
  );
}

function Leaf({ x, y, r = 0, s = 1, fill = GRS }: { x: number; y: number; r?: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C8 -8 20 -9 28 -4 C22 4 9 6 0 0 Z" fill={fill} />
      <path d="M2 -0.5 C11 -3 19 -4 25 -4" fill="none" stroke={G2} strokeWidth="0.9" opacity="0.8" />
    </g>
  );
}

function Laddu({ x, y, r = 16 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r={r} fill={G2} stroke={GD} strokeWidth="1.2" />
      <circle cx={-r * 0.35} cy={-r * 0.25} r={r * 0.16} fill={SOFT} />
      <circle cx={r * 0.3} cy={r * 0.2} r={r * 0.14} fill={GD} />
      <circle cx={r * 0.15} cy={-r * 0.45} r={r * 0.13} fill={GD} opacity="0.8" />
      <circle cx={-r * 0.2} cy={r * 0.4} r={r * 0.12} fill={SOFT} />
      <path d={`M${-r * 0.55} ${r * 0.05} l${r * 0.28} ${r * 0.18}`} stroke={GRS} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function SeedBar({ x, y, r = 0 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${r})`}>
      <rect x="-52" y="-15" width="104" height="30" rx="7" fill={SOFT} stroke={G} strokeWidth="1.5" />
      <circle cx="-34" cy="-4" r="2.2" fill={GRS} />
      <circle cx="-22" cy="6" r="2" fill={GD} />
      <circle cx="-10" cy="-6" r="2.2" fill={G} />
      <circle cx="24" cy="-3" r="2.2" fill={GD} />
      <circle cx="36" cy="5" r="2" fill={GRS} />
      <circle cx="44" cy="-5" r="1.8" fill={G} />
      <rect x="-2" y="-15" width="22" height="30" fill={GR} />
      <text x="9" y="5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fill={G2}>
        7
      </text>
    </g>
  );
}

function HamperBox({ jars }: { jars: number }) {
  const s = jars >= 5 ? 0.78 : 1;
  const w = 26 * s;
  const gap = 8 * s;
  const total = jars * w + (jars - 1) * gap;
  const startX = 110 - total / 2;
  const y = jars >= 5 ? 40 : 32;
  return (
    <g>
      {/* back rim */}
      <path d="M48 72 L172 72" stroke={G} strokeWidth="1.2" opacity="0.7" />
      {Array.from({ length: jars }, (_, i) => (
        <Jar key={i} x={startX + i * (w + gap)} y={y} s={s} />
      ))}
      {/* box front */}
      <path d="M42 72 L178 72 L172 122 L48 122 Z" fill={CR} stroke={G} strokeWidth="1.6" />
      <path d="M42 72 L178 72 L176 84 L44 84 Z" fill={SOFT} stroke={G} strokeWidth="1.2" />
      {/* sleeve band */}
      <rect x="96" y="84" width="28" height="38" fill={GR} />
      <text x="110" y="109" textAnchor="middle" fontFamily="Georgia, serif" fontSize="17" fill={G2}>
        Z
      </text>
      <Bow x={110} y={78} />
      <Leaf x={166} y={120} r={-18} s={0.8} />
    </g>
  );
}

export function ProductArt({ art }: { art: ArtKind }) {
  return (
    <svg viewBox="0 0 220 140" role="img" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      {art === 'hamper3' && <HamperBox jars={3} />}
      {art === 'hamper4' && <HamperBox jars={4} />}
      {art === 'hamper5' && <HamperBox jars={5} />}
      {art === 'combo' && (
        <g>
          <g transform="translate(-32,4) scale(0.92)">
            <HamperBox jars={3} />
          </g>
          <Laddu x={168} y={96} r={17} />
          <SeedBar x={164} y={124} r={-8} />
        </g>
      )}
      {art === 'laddu' && (
        <g>
          <ellipse cx="110" cy="114" rx="62" ry="12" fill={SOFT} stroke={G} strokeWidth="1.4" />
          <Laddu x={86} y={92} r={19} />
          <Laddu x={134} y={92} r={19} />
          <Laddu x={110} y={62} r={19} />
          <Leaf x={112} y={44} r={-24} s={0.7} />
        </g>
      )}
      {art === 'bar' && (
        <g>
          <SeedBar x={104} y={62} r={-7} />
          <SeedBar x={116} y={96} r={4} />
          <Leaf x={38} y={44} r={16} s={0.7} />
        </g>
      )}
      {art === 'pouch' && (
        <g>
          {/* standing pouch */}
          <path
            d="M74 40 C74 32 146 32 146 40 L152 108 C152 120 68 120 68 108 Z"
            fill={CR}
            stroke={G}
            strokeWidth="1.6"
          />
          <path d="M74 40 L70 30 L150 30 L146 40" fill={SOFT} stroke={G} strokeWidth="1.2" />
          <path d="M72 46 L148 46" stroke={G} strokeWidth="0.9" opacity="0.6" strokeDasharray="3 3" />
          <rect x="86" y="60" width="48" height="34" rx="3" fill={GR} />
          <circle cx="110" cy="72" r="8" fill="none" stroke={G2} strokeWidth="1" />
          <text x="110" y="76.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill={G2}>
            Z
          </text>
          {/* spilled almonds */}
          <ellipse cx="58" cy="116" rx="9" ry="5.5" transform="rotate(-24 58 116)" fill={G2} stroke={GD} strokeWidth="1" />
          <ellipse cx="166" cy="114" rx="9" ry="5.5" transform="rotate(18 166 114)" fill={SOFT} stroke={GD} strokeWidth="1" />
          <ellipse cx="176" cy="122" rx="8" ry="5" transform="rotate(-10 176 122)" fill={G2} stroke={GD} strokeWidth="1" />
        </g>
      )}
    </svg>
  );
}

/** The homepage hero composition — the full range in one drawn scene. */
export function HeroScene() {
  return (
    <svg viewBox="0 0 560 430" role="img" aria-label="Illustration of the Zivasha range — a gift hamper with jars, gond laddus and seed bars" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <title>The Zivasha range — hampers, laddus and nutribars</title>
      {/* arch backdrop */}
      <path d="M110 400 L110 190 A170 170 0 0 1 450 190 L450 400 Z" fill={SOFT} opacity="0.55" />
      <path d="M96 400 L96 188 A184 184 0 0 1 464 188 L464 400" fill="none" stroke={G} strokeWidth="1.4" opacity="0.7" />
      {/* ground line */}
      <path d="M40 400 L520 400" stroke={G} strokeWidth="1.4" opacity="0.8" />
      {/* hamper */}
      <g transform="translate(170,128) scale(1.55)">
        <HamperBox jars={4} />
      </g>
      {/* laddu plate, front left */}
      <g transform="translate(6,236)">
        <ellipse cx="110" cy="148" rx="78" ry="15" fill={CR} stroke={G} strokeWidth="1.5" />
        <Laddu x={80} y={122} r={24} />
        <Laddu x={140} y={122} r={24} />
        <Laddu x={110} y={84} r={24} />
        <Leaf x={110} y={54} r={-30} s={0.85} />
      </g>
      {/* bars, front right */}
      <g transform="translate(420,332)">
        <SeedBar x={0} y={0} r={-10} />
        <SeedBar x={16} y={38} r={5} />
      </g>
      {/* sprigs */}
      <Leaf x={58} y={150} r={-42} s={1} />
      <Leaf x={488} y={170} r={214} s={0.9} fill={GR} />
      <circle cx="510" cy="132" r="4" fill={G2} />
      <circle cx="52" cy="112" r="3" fill={G2} />
    </svg>
  );
}
