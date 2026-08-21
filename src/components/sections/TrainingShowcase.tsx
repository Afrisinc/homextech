import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { CourseCard } from "@/components/ui/CourseCard";
import { FlowPipeline } from "@/components/ui/FlowPipeline";
import { GlassCard } from "@/components/ui/GlassCard";
import { RevealGroup } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { learningPipeline, trainingPrograms } from "@/data/training";

export function TrainingShowcase({
  limit,
  showPipeline = true,
  showCta = true,
}: {
  limit?: number;
  showPipeline?: boolean;
  showCta?: boolean;
}) {
  const list = limit ? trainingPrograms.slice(0, limit) : trainingPrograms;

  return (
    <Section id="training">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="OHX Academy"
          title="Learn by building real technology"
          lead="Programmes are taught on working equipment and real faults. Trainees assemble systems, break them under supervision, diagnose them and put them back into service."
        />
        {showCta ? (
          <ButtonLink href="/training" variant="outline" className="shrink-0">
            All programmes
            <ArrowRight size={16} />
          </ButtonLink>
        ) : null}
      </div>

      {showPipeline ? (
        <GlassCard className="mt-12 p-6 sm:p-8">
          <p className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-faint uppercase">
            The learning pipeline
          </p>
          <FlowPipeline
            steps={learningPipeline}
            variant="chips"
            accent="signal"
            className="mt-6"
          />
        </GlassCard>
      ) : null}

      <RevealGroup className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((program) => (
          <CourseCard key={program.slug} program={program} />
        ))}
      </RevealGroup>

      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ink-faint">
        Programme durations and intake dates are confirmed per cohort. We do not
        claim external accreditation; assessment is based on practical tasks
        completed on real equipment.
      </p>
    </Section>
  );
}
