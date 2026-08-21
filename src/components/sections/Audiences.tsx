import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { audiences } from "@/data/company";

export function Audiences() {
  return (
    <Section id="audiences">
      <SectionHeading
        eyebrow="Who we work with"
        title="Built for organisations that cannot afford downtime"
        lead="The same engineering method scales from a five-person office to a multi-department institution."
        align="center"
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((audience, index) => (
          <Reveal key={audience} delay={index * 0.04}>
            <div className="flex h-full items-center gap-3 bg-base px-6 py-7">
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
              />
              <span className="text-[0.9375rem] font-medium text-ink">
                {audience}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
