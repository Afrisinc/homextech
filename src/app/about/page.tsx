import { Audiences } from "@/components/sections/Audiences";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { FlowPipeline } from "@/components/ui/FlowPipeline";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { engineeringFlow, pillars } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "OfficeHomeTechX Ltd is a technology engineering and training company: we design and maintain infrastructure, and we build the technical skills to operate it.",
  path: "/about",
});

const values = [
  {
    title: "Assessment before procurement",
    body: "We survey the site and the workload before recommending equipment. Buying first and designing afterwards is the most expensive way to build infrastructure.",
  },
  {
    title: "Documentation as a deliverable",
    body: "Diagrams, addressing plans, credentials handover and as-built notes ship with every project. A system nobody can read is a system nobody can fix.",
  },
  {
    title: "Skills transfer, always",
    body: "Every deployment includes training for the people who will live with it. Dependency on a single contractor is a risk, not a business model.",
  },
  {
    title: "Honest scope",
    body: "If something is not needed yet, we say so. If a repair is not economical, we say that too.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About OfficeHomeTechX"
        title="A technology engineering and training company"
        lead="We work at both ends of the same problem: organisations need infrastructure that stays up, and they need people who can keep it up. We build the first and develop the second."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/services">Our services</ButtonLink>
          <ButtonLink href="/training" variant="outline">
            OHX Academy
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Who we are"
            title="Engineers first"
            lead={
              <>
                <p>
                  OfficeHomeTechX Ltd designs, deploys and maintains technology
                  infrastructure for offices, schools, institutions and
                  businesses — networks, servers, cloud platforms, surveillance
                  systems, computers and AI compute.
                </p>
                <p className="mt-4">
                  Alongside that work we run practical training programmes on
                  the same equipment we deploy, so technicians learn on real
                  hardware and real faults rather than on slides.
                </p>
              </>
            }
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.06}>
                <GlassCard interactive className="h-full p-6">
                  <h3 className="text-base font-semibold tracking-tight text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {value.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-y border-white/6 bg-base" bleed>
        <div className="container-xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <GlassCard accent="brand" className="h-full p-8 sm:p-10">
                <p className="eyebrow">Mission</p>
                <p className="mt-5 text-xl leading-relaxed font-medium tracking-tight text-ink sm:text-2xl">
                  Develop practical technology capacity while helping
                  organisations deploy reliable, modern infrastructure.
                </p>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.08}>
              <GlassCard accent="signal" className="h-full p-8 sm:p-10">
                <p className="eyebrow">Vision</p>
                <p className="mt-5 text-xl leading-relaxed font-medium tracking-tight text-ink sm:text-2xl">
                  Become a leading practical technology infrastructure and
                  skills-development company in Africa.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Engineering approach"
              title="One method, applied every time"
              lead="Whether the job is a five-user office or a virtualization cluster, the sequence does not change. It is what keeps delivery predictable."
            />
            <div className="mt-9 grid gap-5">
              {pillars.map((pillar) => (
                <GlassCard key={pillar.id} className="p-6">
                  <h3 className="text-base font-semibold tracking-tight text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {pillar.body}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>

          <GlassCard className="p-7 sm:p-10">
            <FlowPipeline steps={engineeringFlow} accent="brand" />
          </GlassCard>
        </div>
      </Section>

      <Audiences />
      <CtaBand />
    </>
  );
}
