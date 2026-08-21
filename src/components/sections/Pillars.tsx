import { Building2, GraduationCap } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { capabilityStats, pillars } from "@/data/company";

const icons = [Building2, GraduationCap];

export function Pillars() {
  return (
    <Section id="pillars">
      <SectionHeading
        eyebrow="What we do"
        title={
          <>
            Two disciplines, one company:{" "}
            <span className="text-gradient-brand">
              infrastructure and capability
            </span>
          </>
        }
        lead="Most organisations can buy equipment. Fewer can design it into a system, secure it, keep it running, and staff it. OfficeHomeTechX does both halves."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {pillars.map((pillar, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={pillar.id} delay={index * 0.08}>
              <GlassCard
                interactive
                accent={index === 0 ? "brand" : "signal"}
                className="h-full p-7 sm:p-9"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-brand">
                  <Icon size={21} strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {pillar.body}
                </p>
                <ul className="mt-7 space-y-2.5 border-t border-white/6 pt-6">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-ink-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
        {capabilityStats.map((stat) => (
          <div key={stat.label} className="bg-base px-6 py-7">
            <p className="text-3xl font-semibold tracking-tight text-ink">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-ink">{stat.label}</p>
            <p className="mt-1 text-xs text-ink-faint">{stat.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
