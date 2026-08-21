import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { ButtonLink } from "@/components/ui/Button";
import { FlowPipeline } from "@/components/ui/FlowPipeline";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { engineeringFlow } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "IT infrastructure, networking, CCTV, computer engineering, cloud, AI infrastructure, cybersecurity, technical support and training from OfficeHomeTechX Ltd.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Infrastructure that is designed, not assembled"
        lead="Nine disciplines delivered by the same team, under the same method. Most projects combine several of them — a network without a security boundary or a backup plan is only half a deployment."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact/consultation">
            Request a consultation
          </ButtonLink>
          <ButtonLink href="/infrastructure" variant="outline">
            Reference architectures
          </ButtonLink>
        </div>
      </PageHero>

      <ServicesOverview showCta={false} />

      <Section className="border-t border-white/6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            eyebrow="Delivery method"
            title="How an engagement runs"
            lead="Each phase produces something you can hold: a survey report, a design, a configuration, a test result, a handover pack."
          />
          <GlassCard className="p-7 sm:p-10">
            <FlowPipeline steps={engineeringFlow} accent="signal" />
          </GlassCard>
        </div>
      </Section>

      <CtaBand
        title="Not sure which discipline you need?"
        body="Describe the symptom rather than the solution — slow network, failing machines, no backup, cameras that never record. We will identify what actually needs to change."
      />
    </>
  );
}
