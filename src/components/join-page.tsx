import Image from "next/image";
import { getSiteRemote } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
import { assetPath } from "@/lib/paths";
import { PageIntro } from "./ui";

export async function JoinPage() {
  const t = dictionary;
  const site = await getSiteRemote();

  return (
    <>
      <PageIntro title={t.pages.join.title} />
      <div className="container join-page">
        <section className="join-simple">
          <div className="join-simple-copy">
            <p>{t.join.emailIntro}</p>
            <a
              className="apply-email"
              href={`mailto:${site.contact.email}?subject=${encodeURIComponent(t.join.subject)}`}
            >
              {site.contact.email}
            </a>
          </div>
          <figure className="join-simple-image">
            <Image
              src={assetPath(site.join.image)}
              alt={site.join.imageAlt}
              width={693}
              height={442}
              sizes="(max-width: 760px) 100vw, 42vw"
            />
          </figure>
        </section>
      </div>
    </>
  );
}
