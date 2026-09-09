import Image from "next/image";
import { getResearchRemote } from "@/lib/content";
import { dictionary, href } from "@/lib/i18n";
import { PageIntro, TextLink } from "./ui";
import { JoinBanner } from "./join-banner";
import { assetPath } from "@/lib/paths";
import { ResearchVideo } from "./research-video";
import { RevealSection } from "./reveal-on-scroll";

function isMp4(src: string) {
  return /\.mp4(?:[?#].*)?$/i.test(src);
}

function ResearchMedia({ src, alt }: { src: string; alt: string }) {
  if (isMp4(src)) {
    return <ResearchVideo src={assetPath(src)} alt={alt} />;
  }

  return (
    <Image
      className="research-media-element"
      src={assetPath(src)}
      alt={alt}
      width={1280}
      height={720}
    />
  );
}

export async function ResearchPage() {
  const t = dictionary;
  const research = await getResearchRemote();
  return (
    <>
      <PageIntro title={t.pages.research.title} />
      <div className="container research-page">
        {research.map((item) => (
          <RevealSection id={item.id} className="research-section" key={item.id}>
            <div className="research-section-title">
              <h2>{item.title}</h2>
            </div>
            <p className="research-description">{item.description}</p>
            <div className="research-media-grid">
              {item.media.map((media) => (
                <figure className="research-media" key={media.src}>
                  <ResearchMedia src={media.src} alt={media.alt} />
                </figure>
              ))}
            </div>
          </RevealSection>
        ))}
        <div className="research-bottom">
          <TextLink href={href("publications")}>{t.common.allPublications}</TextLink>
        </div>
      </div>
      <JoinBanner />
    </>
  );
}
