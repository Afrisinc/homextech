import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/SectionHeading";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to an engineer at OfficeHomeTechX Ltd about network, cloud, CCTV, AI infrastructure, computer maintenance, IT support or technical training.",
  path: "/contact",
});

const details = [
  { icon: MapPin, label: "Location", value: company.location },
  { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
  {
    icon: Phone,
    label: "Phone",
    value: `${company.phone} · ${company.phoneAlt}`,
    href: `tel:${company.phone.replace(/\s/g, "")}`,
  },
  { icon: Clock, label: "Hours", value: company.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to an engineer"
        lead="Describe the site, the number of users and what is going wrong. The more concrete the description, the more useful our first reply will be."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-10">
          <div className="space-y-5">
            <GlassCard className="p-7">
              <p className="eyebrow">Direct</p>
              <ul className="mt-6 space-y-5">
                {details.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <li key={detail.label} className="flex items-start gap-3.5">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-brand">
                        <Icon size={16} strokeWidth={1.7} aria-hidden />
                      </span>
                      <span>
                        <span className="block font-mono text-[0.625rem] tracking-[0.18em] text-ink-faint uppercase">
                          {detail.label}
                        </span>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="mt-1 block text-sm text-ink transition-colors hover:text-brand"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <span className="mt-1 block text-sm text-ink">
                            {detail.value}
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </GlassCard>

            <GlassCard accent="brand" className="p-7">
              <p className="eyebrow">Larger engagement?</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                If you are planning a full deployment, migration or training
                programme, the consultation form captures what we need to give
                you a useful first answer.
              </p>
              <ButtonLink
                href="/contact/consultation"
                variant="outline"
                size="sm"
                className="mt-6"
              >
                Request a consultation
              </ButtonLink>
            </GlassCard>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
