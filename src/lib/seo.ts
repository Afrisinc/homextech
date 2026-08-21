import type { Metadata } from "next";

import { company } from "@/data/company";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? company.siteUrl;

interface PageSeoInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

/** Consistent per-page metadata: canonical, OpenGraph and Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: PageSeoInput): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: company.legalName,
      title: `${title} | ${company.name}`,
      description,
      locale: "en_RW",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${company.name}`,
      description,
    },
  };
}

/** Organization + service JSON-LD injected once from the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.name,
    url: siteUrl,
    email: company.email,
    description: company.descriptionShort,
    areaServed: company.serviceArea,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    knowsAbout: [
      "Network infrastructure",
      "Server infrastructure",
      "Private cloud",
      "CCTV and surveillance",
      "Computer and laptop repair",
      "AI and GPU infrastructure",
      "Cybersecurity",
      "Technical training",
    ],
  };
}
