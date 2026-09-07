import { notFound } from "next/navigation";
import { getNews, getNewsRemote } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
import { peopleRoutes, staticRoutes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { HomePage } from "@/components/home-page";
import { ResearchPage } from "@/components/research-page";
import { AlumniPage, MembersPage, ProfessorPage } from "@/components/people-page";
import { PublicationsPage } from "@/components/publications-page";
import { NewsPage, NewsArticle } from "@/components/news-page";
import { JoinPage } from "@/components/join-page";
import { ContactPage } from "@/components/contact-page";
import { GalleryPage } from "@/components/gallery-page";

type Params = Promise<{ slug?: string[] }>;
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: [] as string[] },
    ...staticRoutes.filter(Boolean).map((path) => ({ slug: path.split("/") })),
    ...getNews().map((item) => ({ slug: ["news", item.id] })),
  ];
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug = [] } = await params;
  const t = dictionary;
  const path = slug.join("/");
  if (!path) return pageMetadata("", t.seo.home, t.seo.description);
  if (slug[0] === "news" && slug.length === 2) {
    const news = (await getNewsRemote()).find((item) => item.id === slug[1]);
    if (!news) notFound();
    return pageMetadata(path, `${news.title} | RLC Lab.`, news.body[0]);
  }
  if (peopleRoutes.includes(path as (typeof peopleRoutes)[number])) {
    const label = path.split("/")[1];
    return pageMetadata(path, `${label[0].toUpperCase()}${label.slice(1)} | RLC Lab.`, t.pages.people.description);
  }
  if (path === "gallery")
    return pageMetadata(path, "Gallery | RLC Lab.", "Gallery");
  const copy = t.pages[path as keyof typeof t.pages];
  if (!copy) notFound();
  return pageMetadata(path, `${t.nav[path as keyof typeof t.nav]} | RLC Lab.`, copy.description);
}

export default async function Page({ params }: { params: Params }) {
  const { slug = [] } = await params;
  if (slug[0] === "news" && slug.length === 2) {
    const article = (await getNewsRemote()).find((item) => item.id === slug[1]);
    if (!article) notFound();
    return <NewsArticle article={article} />;
  }
  switch (slug.join("/")) {
    case "": return <HomePage />;
    case "research": return <ResearchPage />;
    case "people/professor": return <ProfessorPage />;
    case "people/members": return <MembersPage />;
    case "people/alumni": return <AlumniPage />;
    case "publications": return <PublicationsPage />;
    case "news": return <NewsPage />;
    case "gallery": return <GalleryPage />;
    case "join": return <JoinPage />;
    case "contact": return <ContactPage />;
    default: notFound();
  }
}
