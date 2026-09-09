"use client";

import { useMemo, useState } from "react";
import type { Publication } from "@/lib/schemas";
import { dictionary } from "@/lib/i18n";
import { PublicationList } from "./publication-list";

type HomePublicationType = "journal" | "conference";
type HomeConferenceType = "international" | "domestic";

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
  const [conferenceType, setConferenceType] = useState<HomeConferenceType>("international");
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
  const visibleConferences =
    conferenceType === "international" ? internationalConferences : domesticConferences;

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
        <div className="home-conference-panel">
          <div className="conference-type-filters type-filters" role="group" aria-label="Conference type">
            {(["international", "domestic"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={conferenceType === value}
                className={conferenceType === value ? "selected" : ""}
                onClick={() => setConferenceType(value)}
              >
                {value === "international"
                  ? t.publications.internationalConference
                  : t.publications.domesticConference}
              </button>
            ))}
          </div>
          {visibleConferences.length ? (
            <PublicationList publications={visibleConferences} t={t} featured />
          ) : (
            <p className="empty-state">{t.publications.empty}</p>
          )}
        </div>
      ) : visiblePublications.length ? (
        <PublicationList publications={visiblePublications} t={t} featured />
      ) : (
        <p className="empty-state">{t.publications.empty}</p>
      )}
    </div>
  );
}
