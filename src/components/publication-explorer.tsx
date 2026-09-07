"use client";

import { useMemo, useState } from "react";
import type { Publication } from "@/lib/schemas";
import { dictionary } from "@/lib/i18n";
import { PublicationList } from "./publication-list";
import { Pagination } from "./pagination";

export function PublicationExplorer({
  publications,
  pageSize,
}: {
  publications: Publication[];
  pageSize: number;
}) {
  const t = dictionary;
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);

  const result = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return publications.filter(
      (p) =>
        (type === "all" || type === p.type) &&
        `${p.title} ${p.authors.join(" ")} ${p.venue}`
          .toLocaleLowerCase()
          .includes(normalizedQuery),
    );
  }, [publications, query, type]);

  const totalPages = Math.max(1, Math.ceil(result.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visiblePublications = result.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function updateType(value: string) {
    setType(value);
    setPage(1);
  }

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <>
      <div className="publication-toolbar">
        <div className="type-filters" role="group" aria-label={t.publications.filter}>
          {(["all", "journal", "conference", "preprint"] as const).map((value) => (
            <button
              key={value}
              aria-pressed={type === value}
              className={type === value ? "selected" : ""}
              onClick={() => updateType(value)}
            >
              {t.publications[value]}
            </button>
          ))}
        </div>
        <div className="publication-search">
          <label className="sr-only" htmlFor="publication-search">
            {t.publications.search}
          </label>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <input
            id="publication-search"
            type="search"
            placeholder={t.publications.searchPlaceholder}
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
          />
        </div>
      </div>
      <p className="result-count" role="status" aria-live="polite">
        {result.length} {t.publications.results}
      </p>
      {result.length ? (
        <>
          <PublicationList publications={visiblePublications} t={t} />
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            label="Publication pages"
            onPageChange={setPage}
          />
        </>
      ) : (
        <div className="empty-state">
          <p>{t.publications.empty}</p>
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
              setType("all");
              setPage(1);
            }}
          >
            {t.publications.reset}
            <span aria-hidden="true"> -&gt;</span>
          </button>
        </div>
      )}
    </>
  );
}
