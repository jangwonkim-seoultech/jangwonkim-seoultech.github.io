import { getGalleryRemote } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
import { PageIntro } from "./ui";
import { GalleryExplorer } from "./gallery-explorer";
import site from "@config/site.json";

/** A JSON-driven gallery. Add an image and one content/gallery record to publish an item. */
export async function GalleryPage() {
  const t = dictionary;
  const items = await getGalleryRemote();
  const pageSize = [10, 15, 30].includes(site.display.galleryPerPage)
    ? site.display.galleryPerPage
    : 10;
  return (
    <>
      <PageIntro title="Gallery" />
      <section className="container gallery-page" aria-label="Gallery">
        {items.length ? (
          <GalleryExplorer items={items} pageSize={pageSize} />
        ) : (
          <p className="empty-state">{t.gallery.empty}</p>
        )}
      </section>
    </>
  );
}
