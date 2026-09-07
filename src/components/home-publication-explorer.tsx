"use client";

import { useMemo, useState } from "react";
import type { Publication } from "@/lib/schemas";
import { dictionary } from "@/lib/i18n";
import { PublicationList } from "./publication-list";

type HomePublicationType = "journal" | "conference";

export function HomePublicationExplorer({
  publications,
  limit,
}: {
  publications: Publication[];
  limit: number;
}) {
  const t = dictionary;
  const hasJournals = publications.some((publication) => publication.type === "journal");
  const [type, setType] = useState<HomePublicationType>(hasJournals ? "journal" : "conference");
  const visiblePublications = useMemo(
    () => publications.filter((publication) => publication.type === type).slice(0, limit),
    [publications, type, limit],
  );

  return (
    <div className="home-publications">
      <div className="type-filters" role="group" aria-label={t.publications.filter}>
        {(["journal", "conference"] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={type === value}
            className={type === value ? "selected" : ""}
            onClick={() => setType(value)}
          >
            {t.publications[value]}
          </button>
        ))}
      </div>
      {visiblePublications.length ? (
        <PublicationList publications={visiblePublications} t={t} featured />
      ) : (
        <p className="empty-state">{t.publications.empty}</p>
      )}
    </div>
  );
}
