import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { basePath } from "@/lib/paths";

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return siteUrl
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}${basePath}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
