import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { PageHero } from "@/components/sections/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Consultation",
  description:
    "Tell OfficeHomeTechX about your organisation, your current infrastructure and the problems you need solved, and we will respond with an assessment and a proposed sequence of work.",
  path: "/contact/consultation",
});

const expectations = [
  {
    title: "What happens next",
    items: [
      "We review what you have described and identify the gaps",
      "We come back with clarifying questions — usually about traffic, users and existing equipment",
      "Where useful, we arrange a site survey",
      "You receive an assessment, an outline architecture and a sequence of work",
    ],
  },
  {
    title: "What we will not do",
    items: [
      "Quote hardware before understanding the workload",
      "Recommend a platform you do not need",
      "Promise timelines we cannot hold",
      "Lock you into infrastructure only we can support",
    ],
  },
];

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Consultation"
        title="Tell us what you are working with"
        lead="This form takes a few minutes and saves several rounds of email. Answer what you know — 'not sure' is a valid answer to most of it."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          <ConsultationForm />

          <div className="space-y-5">
            {expectations.map((block, index) => (
              <GlassCard
                key={block.title}
                accent={index === 0 ? "brand" : "signal"}
                className="p-7"
              >
                <p className="eyebrow">{block.title}</p>
                <ul className="mt-6 space-y-3">
                  {block.items.map((item) => (
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
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
