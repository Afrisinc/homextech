import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/SectionHeading";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms",
  description:
    "Terms of use for the OfficeHomeTechX Ltd website and the basis on which information published here is provided.",
  path: "/terms",
});

const sections = [
  {
    title: "About this site",
    body: `This website is published by ${company.legalName}. It describes services, reference architectures and training programmes. It is informational and does not by itself form a contract.`,
  },
  {
    title: "Accuracy",
    body: "Reference architectures and capability descriptions are illustrative. Actual designs, equipment, durations and pricing are confirmed in a written proposal after assessment.",
  },
  {
    title: "Training programmes",
    body: "Programme content, cohort dates and durations are confirmed per intake. Assessment is practical. We do not claim external accreditation unless it is explicitly stated in a signed agreement.",
  },
  {
    title: "Intellectual property",
    body: "Diagrams, written material and the design of this site belong to the company. Please ask before reproducing them.",
  },
  {
    title: "Liability",
    body: "Information published here is provided in good faith. Engagements are governed by the written agreement signed for that work, which takes precedence over anything on this site.",
  },
  {
    title: "Contact",
    body: `Questions about these terms can be sent to ${company.email}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms"
        lead="The basis on which the information published on this website is provided."
      />
      <Section>
        <div className="max-w-2xl space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold tracking-tight text-ink">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
