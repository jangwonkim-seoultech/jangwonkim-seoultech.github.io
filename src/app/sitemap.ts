import type { MetadataRoute } from "next";
import { getNews } from "@/lib/content";
import { absoluteSiteUrl, siteUrl } from "@/lib/seo";
import { staticRoutes } from "@/lib/routes";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const paths = [...staticRoutes, ...getNews().map((n) => `news/${n.id}`)];
  return paths.map((path) => ({ url: absoluteSiteUrl(path) }));
}
