import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ButtonLink } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Deployment patterns OfficeHomeTechX designs and builds: segmented office networks, campus surveillance, private cloud clusters, local AI nodes, computer labs and branch rollouts.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="What we build, described without embellishment"
        lead="Rather than list clients we cannot name, we publish the deployment patterns we design and the scope each one involves. As client work completes and permission is granted, these become full case studies with photography and measured outcomes."
      >
        <ButtonLink href="/contact/consultation">
          Discuss a project
        </ButtonLink>
      </PageHero>

      <ProjectsShowcase filterable showCta={false} />

      <Section>
        <GlassCard accent="signal" className="p-8 sm:p-10">
          <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Adding real case studies
          </h2>
          <p className="mt-3.5 max-w-3xl text-sm leading-relaxed text-ink-muted">
            Each card above is driven by a single data file, with a reserved
            image slot and structured scope, stack and status fields. Publishing
            a completed project is a matter of adding one entry and dropping the
            site photography in place — no layout work required.
          </p>
        </GlassCard>
      </Section>

      <CtaBand
        title="Have a site that needs surveying?"
        body="Send the location, the number of users and what is failing today. We will come back with an assessment and a realistic sequence of work."
      />
    </>
  );
}
