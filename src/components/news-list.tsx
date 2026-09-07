import Link from "next/link";
import type { News } from "@/lib/schemas";
import { dictionary, href, formatDate } from "@/lib/i18n";
import { Arrow } from "./ui";

export function NewsList({ news }: { news: News[] }) {
  const t = dictionary;
  return (
    <ol className="news-list">
      {news.map((item) => (
        <li key={item.id}>
          <Link className="news-row" href={href(`news/${item.id}`)}>
            <time dateTime={item.date}>{formatDate(item.date)}</time>
            <div className="news-text">
              <span className="eyebrow news-category">{t.news[item.category]}</span>
              <h3>{item.title}</h3>
            </div>
            <Arrow />
          </Link>
        </li>
      ))}
    </ol>
  );
}
