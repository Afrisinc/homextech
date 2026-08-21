import { ButtonLink } from "@/components/ui/Button";
import { FlowPipeline } from "@/components/ui/FlowPipeline";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { ohxAssistantFlow } from "@/data/infrastructure";

/**
 * OHX AI — the maintenance-assistant concept.
 * Written carefully: the assistant supports an engineer, it does not replace
 * one, and nothing here claims autonomous repair.
 */
export function OhxAssistant() {
  return (
    <Section id="ohx-ai">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="OHX AI"
            title="An assistant for technicians, not a replacement for them"
            lead="OHX AI is our approach to intelligent maintenance: collect what a device is actually reporting, correlate it against known fault patterns, and hand a technician a ranked diagnosis with the evidence attached."
          />

          <GlassCard accent="brand" className="mt-9 p-6">
            <p className="text-sm leading-relaxed text-ink-muted">
              Every recommendation ends with a person. The engineer confirms the
              diagnosis, performs the repair and signs off the verification step
              — the system shortens the path to a decision rather than making
              the decision.
            </p>
          </GlassCard>

          <div className="mt-8">
            <ButtonLink href="/ai" variant="outline">
              AI infrastructure
            </ButtonLink>
          </div>
        </div>

        <GlassCard className="p-7 sm:p-9">
          <p className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-faint uppercase">
            Diagnostic path
          </p>
          <FlowPipeline steps={ohxAssistantFlow} className="mt-7" accent="brand" />
        </GlassCard>
      </div>
    </Section>
  );
}
