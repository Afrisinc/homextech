import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { RevealGroup } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export function ServicesOverview({
  limit,
  showCta = true,
}: {
  limit?: number;
  showCta?: boolean;
}) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <Section id="services">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Services"
          title="Engineering disciplines, not product boxes"
          lead="Each discipline is delivered with the same method: assess, design, build, secure, deploy, monitor, maintain, train."
        />
        {showCta ? (
          <ButtonLink href="/services" variant="outline" className="shrink-0">
            All services
            <ArrowRight size={16} />
          </ButtonLink>
        ) : null}
      </div>

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((service) => (
          <ServiceCard
            key={service.slug}
            service={service}
            href={`/services#${service.slug}`}
          />
        ))}
      </RevealGroup>
    </Section>
  );
}
