import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/ui/Logo";
import { company } from "@/data/company";
import { footerNav } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/8 bg-base">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-fine opacity-30 mask-fade-b"
      />

      <div className="relative container-xl py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.4fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              {company.descriptionShort}
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-ink-muted">
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="shrink-0 text-brand" />
                {company.location}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-brand" />
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-ink"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-brand" />
                <span className="flex flex-wrap items-center gap-x-2">
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-ink"
                  >
                    {company.phone}
                  </a>
                  <span aria-hidden className="text-ink-faint">
                    ·
                  </span>
                  <a
                    href={`tel:${company.phoneAlt.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-ink"
                  >
                    {company.phoneAlt}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-[0.6875rem] tracking-[0.2em] text-ink-faint uppercase">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-ink-muted transition-colors hover:text-brand"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/6 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {company.legalName}. All rights
            reserved.
          </p>
          <p className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-faint uppercase">
            Built · Secured · Maintained · Taught
          </p>
        </div>
      </div>
    </footer>
  );
}
