import type { Metadata } from "next";
import { site, pi } from "./content";
import { dictionary, href } from "./i18n";
import { assetPath, basePath } from "./paths";

const configuredSiteUrl = (process.env.SITE_URL || site.url).replace(/\/$/, "");
export const siteUrl =
  configuredSiteUrl && basePath && configuredSiteUrl.endsWith(basePath)
    ? configuredSiteUrl.slice(0, -basePath.length)
    : configuredSiteUrl;
export function absoluteSiteUrl(path: string = "") {
  return `${siteUrl}${basePath}${href(path)}`;
}

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const canonical = siteUrl ? absoluteSiteUrl(path) : undefined;
  const ogImage = siteUrl ? `${siteUrl}${assetPath("/images/og.png")}` : undefined;
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
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: dictionary.seo.home }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
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
    ...(siteUrl ? { url: absoluteSiteUrl() } : {}),
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
      streetAddress: `2F, ${site.location.building}, ${site.location.street}`,
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
