import { cn } from "@/lib/utils";

/**
 * Vector rendering of the OfficeHomeTechX mark: a home outline with a wireless
 * signal, a service laptop and a wrench. Drawn as SVG so it stays crisp at any
 * size and needs no raster asset.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="OfficeHomeTechX mark"
      className={cn("h-9 w-9", className)}
    >
      <defs>
        <linearGradient id="ohx-green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b6e86a" />
          <stop offset="100%" stopColor="#6ea832" />
        </linearGradient>
        <linearGradient id="ohx-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3fb6ee" />
          <stop offset="100%" stopColor="#135d88" />
        </linearGradient>
      </defs>

      <circle cx="32" cy="32" r="30" fill="#06090d" />
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="url(#ohx-green)"
        strokeWidth="2.4"
      />

      {/* Roof */}
      <path
        d="M13 33 L32 16.5 L48 30.5"
        fill="none"
        stroke="url(#ohx-green)"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Walls */}
      <path
        d="M17.5 30.5 V47.5 M46.5 30.5 V47.5"
        fill="none"
        stroke="url(#ohx-green)"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      {/* Window */}
      <g fill="#9ede4d">
        <rect x="28.6" y="21.6" width="2.9" height="2.9" rx="0.6" />
        <rect x="32.5" y="21.6" width="2.9" height="2.9" rx="0.6" />
        <rect x="28.6" y="25.5" width="2.9" height="2.9" rx="0.6" />
        <rect x="32.5" y="25.5" width="2.9" height="2.9" rx="0.6" />
      </g>
      {/* Wireless arcs */}
      <g
        fill="none"
        stroke="url(#ohx-green)"
        strokeWidth="2.6"
        strokeLinecap="round"
      >
        <path d="M48.8 25.4a7.4 7.4 0 0 1 2.6 5.8" />
        <path d="M49.6 20.4a12.6 12.6 0 0 1 4.6 10" />
      </g>
      {/* Laptop screen */}
      <rect
        x="21.5"
        y="31.5"
        width="21"
        height="13.4"
        rx="1.6"
        fill="url(#ohx-blue)"
      />
      <rect x="19.4" y="45.3" width="25.2" height="2.6" rx="1.3" fill="#eef4fb" />
      {/* Wrench */}
      <path
        d="M37.8 33.6a4.2 4.2 0 0 0-5.7 5.3l-5.4 4.4 2.6 2.7 5.1-4.6a4.2 4.2 0 0 0 5.4-5.6l-2.4 2.4-2.2-2.2z"
        fill="url(#ohx-green)"
      />
    </svg>
  );
}

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9 shrink-0" />
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="text-[0.95rem] font-semibold tracking-tight text-ink">
            Office<span className="text-brand">HomeTech</span>
            <span className="text-signal">X</span>
          </span>
          <span className="mt-1 font-mono text-[0.5625rem] tracking-[0.2em] text-ink-faint uppercase">
            Infrastructure · AI · Training
          </span>
        </span>
      ) : null}
    </span>
  );
}
