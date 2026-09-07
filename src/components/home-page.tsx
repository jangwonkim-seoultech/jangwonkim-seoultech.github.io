import Image from "next/image";
import { getPublicationsRemote, getNewsRemote, getSiteRemote } from "@/lib/content";
import { dictionary, href } from "@/lib/i18n";
import { SectionHeading, TextLink } from "./ui";
import { HomePublicationExplorer } from "./home-publication-explorer";
import { NewsList } from "./news-list";
import { LabLogo } from "./lab-logo";
import { assetPath } from "@/lib/paths";

function LabIntroduction({ site }: { site: Awaited<ReturnType<typeof getSiteRemote>> }) {
  return (
    <section className="lab-introduction">
      <div className="container lab-introduction-inner">
        <div className="lab-introduction-logo">
          <LabLogo />
        </div>
        <div className="lab-introduction-copy">
          <h2>{site.home.introductionTitle}</h2>
          <p>{site.home.introductionBody}</p>
        </div>
      </div>
    </section>
  );
}

export async function HomePage() {
  const t = dictionary;
  const site = await getSiteRemote();
  const publications = await getPublicationsRemote();
  const news = (await getNewsRemote()).slice(0, site.display.homeNewsCount);
  return (
    <>
      <section className="home-hero container">
        <div className="hero-content">
          <h1>
            {site.home.heroTitle}
          </h1>
          <TextLink className="hero-research-link" href={href("research")}>
            {site.home.heroCta}
          </TextLink>
        </div>
        <figure className="hero-figure">
          <div className="hero-figure-image">
            <Image
              className="home-motion-image"
              src={assetPath(site.home.heroImage)}
              alt={site.home.heroImageAlt}
              width={1536}
              height={1024}
              priority
            />
          </div>
        </figure>
      </section>
      <LabIntroduction site={site} />
      {publications.length > 0 && (
        <section className="work-section">
          <div className="section container">
            <SectionHeading title={t.home.workTitle}>
              <TextLink href={href("publications")}>{t.common.allPublications}</TextLink>
            </SectionHeading>
            <HomePublicationExplorer publications={publications} limit={site.display.homePublicationCount} />
          </div>
        </section>
      )}
      {news.length > 0 && (
        <section className="section container home-news">
          <SectionHeading title={t.home.newsTitle}>
              <TextLink href={href("news")}>{t.common.allNews}</TextLink>
          </SectionHeading>
          <NewsList news={news} />
        </section>
      )}
    </>
  );
}
