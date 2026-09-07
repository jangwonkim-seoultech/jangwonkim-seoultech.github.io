import type { Metadata } from "next";
import { site, pi } from "./content";
import { dictionary, href } from "./i18n";
import { assetPath } from "./paths";

export const siteUrl = (process.env.SITE_URL || site.url).replace(/\/$/, "");
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const canonical = siteUrl ? `${siteUrl}${href(path)}` : undefined;
  return {
    title,
    description,
    applicationName: site.lab.shortName,
    ...(siteUrl
      ? { metadataBase: new URL(siteUrl), alternates: { canonical } }
      : {}),
    robots: { index: Boolean(siteUrl), follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: site.lab.shortName,
      locale: "en_US",
      ...(canonical ? { url: canonical } : {}),
      ...(siteUrl
        ? { images: [{ url: `${siteUrl}/images/og.png`, width: 1200, height: 630, alt: dictionary.seo.home }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(siteUrl ? { images: [`${siteUrl}/images/og.png`] } : {}),
    },
    icons: { icon: assetPath(site.lab.logo.src) },
  };
}

export function LabSchema() {
  const value = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    name: site.lab.name,
    alternateName: site.lab.shortName,
    ...(siteUrl ? { url: `${siteUrl}${href()}` } : {}),
    foundingDate: String(site.lab.establishedYear),
    email: site.contact.email,
    telephone: site.contact.phone,
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: site.affiliation.university,
      url: site.links.university,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.location.street}, ${site.location.building} ${site.location.room}`,
      addressLocality: site.location.city,
      postalCode: site.location.postalCode,
      addressCountry: "KR",
    },
    member: {
      "@type": "Person",
      name: pi.name,
      jobTitle: pi.role,
    },
  };
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
