import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/SectionHeading";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description:
    "How OfficeHomeTechX Ltd handles the information submitted through this website.",
  path: "/privacy",
});

const sections = [
  {
    title: "What we collect",
    body: "Only what you type into the contact or consultation forms: your name, organisation, email address, phone number, country and the description of your requirement. This site does not use advertising trackers.",
  },
  {
    title: "Why we collect it",
    body: "To respond to your enquiry and, where relevant, to prepare an assessment or quotation. We do not sell or rent contact details to anyone.",
  },
  {
    title: "Where it is stored",
    body: "Submissions are stored in our own managed database. Access is limited to the staff who handle enquiries and technical delivery.",
  },
  {
    title: "How long we keep it",
    body: "Enquiries are retained while a commercial relationship is reasonably possible, and deleted on request.",
  },
  {
    title: "Your choices",
    body: `Write to ${company.email} to ask what we hold about you, to correct it, or to have it deleted. We will respond within a reasonable period.`,
  },
  {
    title: "Changes",
    body: "This notice will be updated if our practices change. The current version is always the one published here.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        lead="A short, plain description of what this website collects and what we do with it."
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
