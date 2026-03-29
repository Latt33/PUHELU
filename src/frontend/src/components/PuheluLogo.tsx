/**
 * Abstract lung logo for PUHELU.
 * Two organic, branching shapes suggesting lung lobes / bronchial trees,
 * rendered as mirrored bezier curves. Warm primary + cool blue accent.
 */
export function PuheluLogo({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Trachea — central stem */}
      <path
        d="M32 8 L32 28"
        stroke="var(--foreground)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Left lung — organic lobe shape */}
      <path
        d="M32 24 C28 28, 18 26, 14 32 C10 38, 12 48, 18 52 C24 56, 30 50, 32 44"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="var(--primary)"
        fillOpacity="0.08"
      />
      {/* Left bronchial branches */}
      <path
        d="M32 28 C28 32, 22 30, 19 34"
        stroke="var(--foreground)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M32 32 C28 36, 20 38, 17 43"
        stroke="var(--foreground)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />

      {/* Right lung — mirrored organic lobe */}
      <path
        d="M32 24 C36 28, 46 26, 50 32 C54 38, 52 48, 46 52 C40 56, 34 50, 32 44"
        stroke="var(--brand-blue)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="var(--brand-blue)"
        fillOpacity="0.08"
      />
      {/* Right bronchial branches */}
      <path
        d="M32 28 C36 32, 42 30, 45 34"
        stroke="var(--foreground)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M32 32 C36 36, 44 38, 47 43"
        stroke="var(--foreground)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />

      {/* Small breath dot at top — the inhale point */}
      <circle
        cx="32"
        cy="8"
        r="2.5"
        fill="var(--primary)"
        opacity="0.5"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.7;0.3"
          dur="6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="2;3;2"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
