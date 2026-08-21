import { HeroBackgroundSlider } from "@/components/sections/HeroBackgroundSlider";
import { cn } from "@/lib/utils";

export { heroImages } from "@/components/sections/HeroBackgroundSlider";

/**
 * Atmospheric backdrop for the hero.
 *
 * Layering (everything except the slideshow indicators is pointer-transparent,
 * so the Three.js canvas above keeps every pointer event):
 *
 *   z-0   four-image crossfading slideshow
 *   z-10  light tint + cool core glow
 *   z-20  engineering grid · soft vignette · page fades
 *   z-40  slideshow indicators
 *
 * The 3D scene renders at z-30, the hero copy at z-40 and the navbar at z-50.
 *
 * No flat black panel is used anywhere — readability comes from directional
 * gradients only, so the photographs stay visible edge to edge.
 */
export function HeroBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* ── z-0 · the four photographs ─────────────────────────────────── */}
      <HeroBackgroundSlider />

      {/* ── z-10 · colour ──────────────────────────────────────────────── */}

      {/* Whisper of navy so the photos sit in the brand palette */}
      <div aria-hidden className="absolute inset-0 z-10 bg-void/12" />

      {/* Cool atmosphere pulled toward the AI core */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_62%_52%_at_58%_46%,rgba(42,163,224,0.16),transparent_70%)]"
      />

      {/* ── z-20 · structure ───────────────────────────────────────────── */}

      <div
        aria-hidden
        className="grid-fine mask-fade-edges absolute inset-0 z-20 opacity-25"
      />

      {/* Soft vignette — no hard rectangle, just settled edges */}
      <div
        aria-hidden
        className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_98%_92%_at_52%_46%,transparent_50%,rgba(4,7,11,0.26)_84%,rgba(4,7,11,0.55)_100%)]"
      />

      {/* Long fades so the photographs dissolve into the page, top and bottom */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-20 h-3/5 bg-[linear-gradient(to_top,var(--color-void)_0%,rgba(4,7,11,0.8)_24%,rgba(4,7,11,0.38)_55%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-20 h-32 bg-linear-to-b from-void/65 to-transparent"
      />
    </div>
  );
}

export default HeroBackground;
