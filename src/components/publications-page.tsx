import { getPublicationsRemote } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
import site from "@config/site.json";
import { PageIntro } from "./ui";
import { PublicationExplorer } from "./publication-explorer";

export async function PublicationsPage() {
  const t = dictionary;
  const pageSize = [10, 15, 30].includes(site.display.publicationsPerPage)
    ? site.display.publicationsPerPage
    : 10;
  return (
    <>
      <PageIntro title={t.pages.publications.title} />
      <div className="container publications-page">
        <PublicationExplorer publications={await getPublicationsRemote()} pageSize={pageSize} />
      </div>
    </>
  );
}
