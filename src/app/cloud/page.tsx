import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { CloudArchitectureDiagram } from "@/components/ui/CloudArchitectureDiagram";
import { FlowPipeline } from "@/components/ui/FlowPipeline";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { cloudFlow, cloudTopics } from "@/data/infrastructure";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cloud Infrastructure",
  description:
    "Private and hybrid cloud, virtualization, containers, storage, backup and disaster recovery — designed, deployed and monitored by OfficeHomeTechX Ltd.",
  path: "/cloud",
});

export default function CloudPage() {
  return (
    <>
      <PageHero
        eyebrow="Cloud infrastructure"
        title="Cloud you can point at"
        lead="For many organisations the right answer is not a public cloud account — it is a properly built virtualization platform on site, integrated with external services where they genuinely help. We design both, and we are honest about which one fits."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact/consultation">
            Discuss your platform
          </ButtonLink>
          <ButtonLink href="/infrastructure" variant="outline">
            Infrastructure stack
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Architecture"
              title="A worked reference platform"
              lead="Users reach the platform through a security boundary, sessions are distributed across application instances, and data is replicated, stored and backed up on a defined schedule."
            />
            <GlassCard className="mt-9 p-7">
              <FlowPipeline steps={cloudFlow} accent="signal" />
            </GlassCard>
          </div>

          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <p className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-faint uppercase">
                Reference topology
              </p>
              <div className="mt-6 overflow-x-auto">
                <div className="min-w-[420px]">
                  <CloudArchitectureDiagram />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section className="border-y border-white/6 bg-base" bleed>
        <div className="container-xl">
          <SectionHeading
            eyebrow="Capabilities"
            title="What we build into a platform"
            lead="Each of these is a design decision with a cost and a consequence. We document both before anything is procured."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cloudTopics.map((topic, index) => (
              <Reveal key={topic.title} delay={index * 0.05}>
                <GlassCard
                  interactive
                  accent={index % 2 === 0 ? "signal" : "brand"}
                  className="h-full p-7"
                >
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {topic.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <GlassCard accent="brand" className="p-8 sm:p-12">
          <h2 className="max-w-2xl text-2xl leading-snug font-semibold tracking-tight text-ink sm:text-3xl">
            A backup that has never been restored is not a backup.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Every platform we build includes defined recovery point and recovery
            time objectives, off-site copies, and scheduled restore tests with a
            written result. It is the least glamorous part of the design and the
            one that decides whether an incident is an inconvenience or a
            catastrophe.
          </p>
        </GlassCard>
      </Section>

      <CtaBand
        title="Private, hybrid, or neither?"
        body="Tell us what your applications are, how much data you hold and what your connectivity looks like. We will recommend the platform that actually fits — including doing less than you expected."
      />
    </>
  );
}
