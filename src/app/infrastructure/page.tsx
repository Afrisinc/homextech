import { CtaBand } from "@/components/sections/CtaBand";
import { InfrastructureExplorer } from "@/components/sections/InfrastructureExplorer";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Infrastructure",
  description:
    "Reference architectures for small offices, schools and enterprises: segmentation, servers, storage, backup, surveillance and monitoring designed as one system.",
  path: "/infrastructure",
});

const layers = [
  {
    title: "Physical layer",
    body: "Structured cabling, patching, racks, power protection and cable management. Everything above it inherits the quality of this layer.",
    items: ["Cabling & patching", "Racks & containment", "UPS & power", "Labelling"],
  },
  {
    title: "Network layer",
    body: "Switching, routing, wireless and segmentation. Designed around traffic patterns and failure domains rather than port count alone.",
    items: ["Core & access switching", "Routing & NAT", "VLAN design", "Wireless coverage"],
  },
  {
    title: "Compute & storage",
    body: "Servers, virtualization, shared storage and backup — sized against real workloads, with headroom for growth.",
    items: ["Hypervisor hosts", "Shared storage", "Snapshots", "Off-site backup"],
  },
  {
    title: "Security layer",
    body: "Firewall policy, segmentation, endpoint protection, access control and logging, applied consistently across every zone.",
    items: ["Firewall policy", "Segmentation", "Endpoint protection", "Log retention"],
  },
  {
    title: "Operations layer",
    body: "Monitoring, alerting, patching and preventive maintenance — the difference between infrastructure that lasts and infrastructure that decays.",
    items: ["Availability monitoring", "Capacity trending", "Patch cycles", "Spares"],
  },
  {
    title: "People layer",
    body: "Documentation and training so the organisation can operate, extend and troubleshoot what has been built.",
    items: ["As-built diagrams", "Runbooks", "Handover", "Technician training"],
  },
];

export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        eyebrow="Infrastructure"
        title="We build it, secure it, maintain it and teach it"
        lead="Infrastructure is a stack of dependent layers. A weakness in cabling shows up as an application problem; a missing backup shows up as a business problem. We design all six layers together."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact/consultation">
            Request an assessment
          </ButtonLink>
          <ButtonLink href="/cloud" variant="outline">
            Cloud infrastructure
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="The stack"
          title="Six layers, one design"
          lead="Every project touches each of these, even when the client only asked about one."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {layers.map((layer, index) => (
            <Reveal key={layer.title} delay={index * 0.05}>
              <GlassCard
                interactive
                accent={index % 2 === 0 ? "brand" : "signal"}
                className="h-full p-7"
              >
                <span className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-faint uppercase">
                  Layer {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3.5 text-lg font-semibold tracking-tight text-ink">
                  {layer.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  {layer.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-1 text-[0.6875rem] text-ink-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <div className="border-y border-white/6 bg-base">
        <InfrastructureExplorer />
      </div>

      <CtaBand
        title="Send us your floor plan and headcount."
        body="That is usually enough for a first conversation. We will tell you what the network needs to look like, what it will take to get there, and what can wait."
      />
    </>
  );
}
