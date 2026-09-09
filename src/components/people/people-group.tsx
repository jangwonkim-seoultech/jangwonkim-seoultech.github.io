import Image from "next/image";
import type { Person } from "@/lib/schemas";
import { dictionary } from "@/lib/i18n";
import { Arrow, ExternalLink } from "../ui";
import { assetPath } from "@/lib/paths";

/** Reusable Members and Alumni page body; adding people content needs no layout edits. */
export function PeopleGroup({
  title,
  members,
}: {
  title: "Members" | "Alumni";
  members: Person[];
}) {
  const t = dictionary;

  return (
    <section
      id={title.toLowerCase()}
      className={`people-group ${members.length === 0 ? "is-empty" : ""}`}
    >
      <div className="people-grid" aria-label={`${title} list`}>
        {members.map((person) => (
          <article className="person" key={person.id}>
            {person.image && (
              <div className="person-photo-frame">
                <Image
                  className={person.image.endsWith("placeholder-person.svg") ? "person-placeholder" : undefined}
                  src={assetPath(person.image)}
                  alt={person.name}
                  width={300}
                  height={400}
                />
              </div>
            )}
            <h3>{person.name}</h3>
            <p className="person-role">{person.role}</p>
            {person.research.length > 0 && (
              <div className="person-research-block">
                <p>{t.people.researchInterests}</p>
                <ul className="person-research">
                  {person.research.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="person-links">
              {person.email && (
                <a href={`mailto:${person.email}`}>
                  {person.email}
                  <Arrow diagonal />
                </a>
              )}
              {(["homepage", "github", "scholar"] as const)
                .filter((key) => person[key])
                .map((key) => (
                  <ExternalLink key={key} href={person[key]} t={t}>
                    {key === "homepage" ? t.common.website : t.common[key]}
                  </ExternalLink>
                ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
