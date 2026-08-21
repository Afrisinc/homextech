import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { primaryNav } from "@/data/navigation";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_35%,rgba(20,32,44,0.9),rgba(4,7,11,1))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-fine opacity-40 mask-fade-edges"
      />

      <div className="relative container-xl py-32">
        <p className="eyebrow">Error 404 · route unreachable</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-ink sm:text-7xl">
          No path to this
          <br />
          <span className="text-gradient-brand">destination</span>
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted">
          The page you requested does not exist, or it has moved. The links
          below reach everything on this site.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Contact us
          </ButtonLink>
        </div>

        <nav aria-label="Site" className="mt-14 border-t border-white/8 pt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-muted transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
