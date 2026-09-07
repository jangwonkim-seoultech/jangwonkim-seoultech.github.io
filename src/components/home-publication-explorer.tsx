"use client";

import { useMemo, useState } from "react";
import type { Publication } from "@/lib/schemas";
import { dictionary } from "@/lib/i18n";
import { PublicationList } from "./publication-list";

type HomePublicationType = "journal" | "conference";

export function HomePublicationExplorer({
  publications,
  limit,
  internationalConferenceLimit,
  domesticConferenceLimit,
}: {
  publications: Publication[];
  limit: number;
  internationalConferenceLimit: number;
  domesticConferenceLimit: number;
}) {
  const t = dictionary;
  const hasJournals = publications.some((publication) => publication.type === "journal");
  const [type, setType] = useState<HomePublicationType>(hasJournals ? "journal" : "conference");
  const visiblePublications = useMemo(
    () => publications.filter((publication) => publication.type === type).slice(0, limit),
    [publications, type, limit],
  );
  const internationalConferences = useMemo(
    () =>
      publications
        .filter(
          (publication) =>
            publication.type === "conference" && publication.conferenceType === "international",
        )
        .slice(0, internationalConferenceLimit),
    [publications, internationalConferenceLimit],
  );
  const domesticConferences = useMemo(
    () =>
      publications
        .filter(
          (publication) => publication.type === "conference" && publication.conferenceType === "domestic",
        )
        .slice(0, domesticConferenceLimit),
    [publications, domesticConferenceLimit],
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
      {type === "conference" ? (
        <div className="conference-groups">
          <section className="conference-group">
            <h3 className="conference-group-title">{t.publications.internationalConference}</h3>
            {internationalConferences.length ? (
              <PublicationList publications={internationalConferences} t={t} featured />
            ) : (
              <p className="empty-state">{t.publications.empty}</p>
            )}
          </section>
          <section className="conference-group">
            <h3 className="conference-group-title">{t.publications.domesticConference}</h3>
            {domesticConferences.length ? (
              <PublicationList publications={domesticConferences} t={t} featured />
            ) : (
              <p className="empty-state">{t.publications.empty}</p>
            )}
          </section>
        </div>
      ) : visiblePublications.length ? (
        <PublicationList publications={visiblePublications} t={t} featured />
      ) : (
        <p className="empty-state">{t.publications.empty}</p>
      )}
    </div>
  );
}
