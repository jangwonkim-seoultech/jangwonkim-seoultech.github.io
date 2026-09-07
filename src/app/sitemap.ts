import type { MetadataRoute } from "next";
import { getNews } from "@/lib/content";
import { siteUrl } from "@/lib/seo";
import { href } from "@/lib/i18n";
import { staticRoutes } from "@/lib/routes";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const paths = [...staticRoutes, ...getNews().map((n) => `news/${n.id}`)];
  return paths.map((path) => ({ url: `${siteUrl}${href(path)}` }));
}
