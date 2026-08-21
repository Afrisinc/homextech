import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/data/company";

export function CtaBand({
  title = "Tell us what you are trying to build.",
  body = "Send the site, the headcount and the problem. We will come back with an assessment, an architecture and a realistic sequence of work.",
  primaryHref = "/contact/consultation",
  primaryLabel = "Request a consultation",
  secondaryHref = "/contact",
  secondaryLabel = "Contact us",
}: {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="container-xl py-16 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-7 py-14 sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid-fine opacity-40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-brand/12 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-signal/10 blur-3xl"
          />

          <div className="relative max-w-2xl">
            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {body}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={primaryHref} size="lg">
                {primaryLabel}
                <ArrowRight size={16} />
              </ButtonLink>
              <ButtonLink href={secondaryHref} variant="outline" size="lg">
                {secondaryLabel}
              </ButtonLink>
            </div>
            <p className="mt-8 font-mono text-[0.6875rem] tracking-[0.16em] text-ink-faint uppercase">
              {company.location} · {company.hours}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
