import type { Publication } from "@/lib/schemas";
import type { Dictionary } from "@/lib/i18n";
import { ExternalLink } from "./ui";

export function PublicationList({
  publications,
  t,
  featured = false,
}: {
  publications: Publication[];
  t: Dictionary;
  featured?: boolean;
}) {
  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
  if (featured)
    return (
      <ol className="publication-list featured-publications">
        {publications.map((p) => (
          <PublicationEntry key={p.id} publication={p} t={t} showYear />
        ))}
      </ol>
    );
  return (
    <div className="publication-years">
      {years.map((year) => (
        <section className="publication-year" key={year} aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`}>{year}</h2>
          <ol className="publication-list">
            {publications
              .filter((p) => p.year === year)
              .map((p) => (
                <PublicationEntry key={p.id} publication={p} t={t} />
              ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

function PublicationEntry({
  publication: p,
  t,
  showYear,
}: {
  publication: Publication;
  t: Dictionary;
  showYear?: boolean;
}) {
  return (
    <li className="publication" id={p.id}>
      {showYear && (
        <div className="publication-side">
          <span>{p.year}</span>
          <span className="publication-type">{t.publications[p.type]}</span>
        </div>
      )}
      <div className="publication-content">
        <h3 lang="en">{p.title}</h3>
        <p className="authors" lang="en">
          {p.authors.map((name, i) => (
            <span key={`${name}-${i}`}>
              {i > 0 && ", "}
              {name}
            </span>
          ))}
        </p>
        <p className="venue" lang="en">
          {p.venue}
        </p>
        <div className="publication-links">
          {Object.entries(p.links)
            .filter(([, value]) => value)
            .map(([key, value]) => (
              <ExternalLink key={key} href={value!} t={t}>
                {t.common[key as "paper" | "code" | "project" | "video"]}
              </ExternalLink>
            ))}
        </div>
      </div>
    </li>
  );
}
