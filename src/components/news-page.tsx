import Image from "next/image";
import { getNewsRemote } from "@/lib/content";
import type { News } from "@/lib/schemas";
import { dictionary, href, formatDate } from "@/lib/i18n";
import { Arrow, PageIntro, ExternalLink, TextLink } from "./ui";
import { NewsExplorer } from "./news-explorer";
import { assetPath } from "@/lib/paths";
import site from "@config/site.json";

export async function NewsPage() {
  const t = dictionary;
  const news = await getNewsRemote();
  const pageSize = [10, 15, 30].includes(site.display.newsPerPage) ? site.display.newsPerPage : 10;
  return (
    <>
      <PageIntro title={t.pages.news.title} />
      <div className="container news-page">
        {news.length ? (
          <NewsExplorer news={news} pageSize={pageSize} />
        ) : (
          <p className="empty-state">{t.news.empty}</p>
        )}
      </div>
    </>
  );
}
export function NewsArticle({ article }: { article: News }) {
  const t = dictionary;
  return (
    <article className="container news-article">
      <TextLink className="back-link" href={href("news")}>
        {t.common.backNews}
      </TextLink>
      <div className="article-meta">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span className="eyebrow">{t.news[article.category]}</span>
      </div>
      <h1>{article.title}</h1>
      {article.image && (
        <Image
          src={assetPath(article.image)}
          alt={article.imageAlt}
          width={1200}
          height={750}
          className="article-image"
        />
      )}
      <div className="article-body">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {article.source && (
          <ExternalLink href={article.source} t={t}>
            {t.common.source}
          </ExternalLink>
        )}
        {article.attachment && (
          <div>
            <a
              href={assetPath(article.attachment)}
              download
              className="external-link news-attachment"
            >
              {article.attachmentName?.trim() || "Download attachment"}
              <Arrow diagonal />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
