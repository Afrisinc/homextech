import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { company } from "@/data/company";
import { organizationJsonLd, siteUrl } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "OfficeHomeTechX | Technology Infrastructure, AI & Practical Training",
    template: "%s | OfficeHomeTechX",
  },
  description: company.descriptionShort,
  applicationName: company.legalName,
  authors: [{ name: company.legalName }],
  keywords: [
    "technology infrastructure",
    "network infrastructure Rwanda",
    "private cloud",
    "CCTV installation",
    "computer repair",
    "AI infrastructure",
    "IT support",
    "technical training",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: company.legalName,
    title:
      "OfficeHomeTechX | Technology Infrastructure, AI & Practical Training",
    description: company.descriptionShort,
    locale: "en_RW",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "OfficeHomeTechX | Technology Infrastructure, AI & Practical Training",
    description: company.descriptionShort,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#04070b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/*
          Loaded here rather than via next/font so the project builds in
          offline / air-gapped environments; the CSS defines a full system
          fallback stack, so the site is fully styled even if this never
          resolves. The lint rule below targets the Pages Router's
          `_document`, which the App Router does not have.
        */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <script
          type="application/ld+json"
          // Static, developer-authored JSON-LD — no user input reaches this string.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#07130a]"
        >
          Skip to content
        </a>
        <Preloader />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
