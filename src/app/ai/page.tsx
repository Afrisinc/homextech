import dynamic from "next/dynamic";

import { CtaBand } from "@/components/sections/CtaBand";
import { OhxAssistant } from "@/components/sections/OhxAssistant";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { FlowPipeline } from "@/components/ui/FlowPipeline";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { aiFlow, aiTopics } from "@/data/infrastructure";
import { pageMetadata } from "@/lib/seo";

const CoreShowcase = dynamic(
  () => import("@/components/three/CoreShowcase").then((m) => m.CoreShowcase),
  { loading: () => null },
);

export const metadata = pageMetadata({
  title: "AI Infrastructure",
  description:
    "GPU workstations, inference servers, local AI, computer vision and intelligent monitoring — the infrastructure organisations need before AI workloads can run reliably.",
  path: "/ai",
});

export default function AiPage() {
  return (
    <>
      <PageHero
        eyebrow="AI infrastructure"
        title="AI runs on infrastructure, not on enthusiasm"
        lead="Before a model is useful to an organisation, something has to run it: GPUs with enough memory, storage fast enough to feed them, a network that can carry the data, and a person who understands the output. That is the part we build."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact/consultation">
            Scope an AI deployment
          </ButtonLink>
          <ButtonLink href="/training#ai-technology" variant="outline">
            AI training
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The pipeline"
              title="From data to a decision a person owns"
              lead="Each stage has real requirements attached. Skipping one is how AI projects stall after the demo."
            />
            <GlassCard className="mt-9 p-7">
              <FlowPipeline steps={aiFlow} accent="brand" />
            </GlassCard>
          </div>

          <Reveal>
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/8 bg-[radial-gradient(ellipse_at_center,rgba(20,32,44,0.9),rgba(4,7,11,1))]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 grid-fine opacity-40 mask-fade-edges"
              />
              <CoreShowcase className="absolute inset-0" />
              <span className="absolute bottom-5 left-5 font-mono text-[0.625rem] tracking-[0.2em] text-ink-faint uppercase">
                OHX compute core
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-y border-white/6 bg-base" bleed>
        <div className="container-xl">
          <SectionHeading
            eyebrow="Capabilities"
            title="What we deploy and support"
            lead="Sized honestly against the workload — a computer-vision pipeline and a document-classification task do not need the same machine."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {aiTopics.map((topic, index) => (
              <Reveal key={topic.title} delay={index * 0.04}>
                <GlassCard
                  interactive
                  accent={index % 2 === 0 ? "brand" : "signal"}
                  className="h-full p-6"
                >
                  <h3 className="text-base font-semibold tracking-tight text-ink">
                    {topic.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {topic.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-xs leading-relaxed text-ink-faint">
            We do not claim that AI removes the need for engineers, and we do not
            promise accuracy figures we have not measured on your data. Every
            deployment starts with a defined task, a defined dataset and a way to
            check whether the result is good enough.
          </p>
        </div>
      </Section>

      <OhxAssistant />

      <CtaBand
        title="Have a task in mind?"
        body="Describe the work you want automated or assisted, the data it depends on, and where that data is allowed to live. We will tell you what infrastructure it needs — or whether it needs any."
      />
    </>
  );
}
