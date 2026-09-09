import { addressLinesRemote, officeRemote, getPiRemote, getSiteRemote } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
import { Arrow, ExternalLink, PageIntro } from "./ui";

export async function ContactPage() {
  const t = dictionary;
  const [site, pi, address, officeName] = await Promise.all([getSiteRemote(), getPiRemote(), addressLinesRemote(), officeRemote()]);
  const mapQuery = encodeURIComponent(site.location.mapQuery);
  const building = `${t.common.building} ${site.location.buildingNumber}`;

  return (
    <>
      <PageIntro title={t.pages.contact.title} />
      <div className="container contact-page">
        <section className="contact-layout">
          <div className="contact-details">
            <h2>{site.lab.name}</h2>
            <p className="contact-professor">{`${t.contact.pi} ${pi.name}`}</p>
            <p className="contact-affiliation">
              {site.affiliation.department}
              <br />
              {site.affiliation.university}
            </p>
            <dl className="contact-facts">
              <div>
                <dt>{t.common.office}</dt>
                <dd>{officeName}</dd>
              </div>
              <div>
                <dt>{t.common.building}</dt>
                <dd>{building}</dd>
              </div>
              <div>
                <dt>{t.common.email}</dt>
                <dd>
                  <a href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                    <Arrow diagonal />
                  </a>
                </dd>
              </div>
              <div>
                <dt>{t.common.phone}</dt>
                <dd>
                  <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}>{site.contact.phone}</a>
                </dd>
              </div>
              <div>
                <dt>{t.common.address}</dt>
                <dd>
                  <address>
                    {address.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                </dd>
              </div>
            </dl>
            <p className="visit-note">{t.contact.visit}</p>
          </div>
          <figure className="contact-map">
            <iframe
              src={`https://maps.google.com/maps?q=${mapQuery}&z=${site.location.mapZoom}&hl=en&output=embed`}
              title={t.contact.mapTitle}
              width="800"
              height="660"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <figcaption>
              <span>{`${site.location.building} - ${building}`}</span>
              <ExternalLink href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} t={t}>
                {t.contact.openMap}
              </ExternalLink>
            </figcaption>
          </figure>
        </section>
        <section className="contact-bottom">
          <div>
            <h2>{t.contact.directions}</h2>
            <p>{t.contact.transport}</p>
          </div>
          <div>
            <h2>{t.contact.links}</h2>
            <ul className="useful-links">
              {(["university", "department", "campusMap"] as const).map((key) => (
                <li key={key}>
                  <ExternalLink href={site.links[key]} t={t}>{t.contact[key]}</ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
