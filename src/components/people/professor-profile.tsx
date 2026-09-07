import Image from "next/image";
import { getPiRemote, getSiteRemote } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
import { Arrow } from "../ui";
import { assetPath } from "@/lib/paths";

/** Professor block. Keep profile content here so it can be edited independently of member lists. */
export async function ProfessorProfile() {
  const t = dictionary;
  const [pi, site] = await Promise.all([getPiRemote(), getSiteRemote()]);

  return (
    <section className="pi-profile">
      <div className="pi-aside">
        {pi.image && (
          <Image
            className="pi-portrait"
            src={assetPath(pi.image)}
            alt={pi.name}
            width={420}
            height={540}
            priority
          />
        )}
      </div>
      <div className="pi-details">
        <div className="pi-name">
          <h2>{pi.name}</h2>
        </div>
        <p className="pi-role">{pi.role}</p>
        <div className="profile-links">
          <a href={`mailto:${site.contact.email}`}>
            {t.common.email}
            <Arrow diagonal />
          </a>
        </div>
        <section className="profile-section">
          <h3>{t.people.education}</h3>
          <ol className="timeline">
            {pi.education.map((edu) => (
              <li key={edu.year}>
                <span>{edu.year}</span>
                <div>
                  <strong>{edu.degree}</strong>
                  <p>{edu.institution}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="profile-section">
          <h3>{t.people.experience}</h3>
          <ol className="timeline experience">
            {pi.experience.map((exp) => (
              <li key={exp.period}>
                <span>{exp.period}</span>
                <div>
                  <strong>{exp.title}</strong>
                  {exp.useAffiliation ? (
                    <p>{site.affiliation.university}</p>
                  ) : (
                    exp.institution && <p>{exp.institution}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}
