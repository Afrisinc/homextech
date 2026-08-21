import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { TrainingShowcase } from "@/components/sections/TrainingShowcase";
import { ButtonLink } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Training & Academy",
  description:
    "Practical technology training from OfficeHomeTechX: computer maintenance, motherboard repair, networking, CCTV installation, IT support, cloud infrastructure and AI technology.",
  path: "/training",
});

const principles = [
  {
    title: "Real hardware",
    body: "Trainees work on machines, switches, cameras and boards that are genuinely faulty — not simulators.",
  },
  {
    title: "Fault injection",
    body: "We break systems deliberately. Diagnosing a fault you did not cause is the skill employers actually pay for.",
  },
  {
    title: "Evidence, not guesswork",
    body: "Every diagnosis has to be justified from a measurement, a log or a test — never from swapping parts until it works.",
  },
  {
    title: "Portfolio of builds",
    body: "Trainees leave with a documented record of the systems they assembled, diagnosed and repaired.",
  },
];

const audience = [
  "School and university leavers entering technical work",
  "Existing IT staff who need depth rather than certificates",
  "Technicians moving from repair into networking or infrastructure",
  "Organisations training their own support teams in-house",
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="OHX Academy"
        title="Learn by building real technology"
        lead="Our training is built around the bench, not the projector. Trainees assemble working systems, break them under supervision, diagnose them with instruments and logs, repair them, and put them back into service."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact?service=Training">
            Request training
          </ButtonLink>
          <ButtonLink href="#training" variant="outline">
            See programmes
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="How we teach"
            title="Four principles that shape every programme"
            lead="They are the difference between someone who has attended a course and someone who can be handed a broken system."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.06}>
                <GlassCard interactive accent="brand" className="h-full p-6">
                  <h3 className="text-base font-semibold tracking-tight text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {principle.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <div className="border-y border-white/6 bg-base">
        <TrainingShowcase showCta={false} />
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full p-8">
              <p className="eyebrow">Who it is for</p>
              <ul className="mt-6 space-y-3">
                {audience.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard accent="signal" className="h-full p-8">
              <p className="eyebrow">Delivery options</p>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink-muted">
                <li>Scheduled cohorts at our workshop</li>
                <li>On-site training at your premises</li>
                <li>Team programmes built around your own equipment</li>
                <li>Skills transfer bundled with a deployment project</li>
              </ul>
              <p className="mt-7 border-t border-white/6 pt-6 text-xs leading-relaxed text-ink-faint">
                Cohort dates, durations and fees are confirmed on request. We do
                not advertise external accreditation we do not hold — assessment
                is practical and based on completed work.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Training for a team, or for yourself?"
        body="Tell us the starting level and the equipment involved, and we will propose a programme, a duration and a practical assessment plan."
        primaryHref="/contact?service=Training"
        primaryLabel="Request training"
        secondaryHref="/contact/consultation"
        secondaryLabel="Request a consultation"
      />
    </>
  );
}
