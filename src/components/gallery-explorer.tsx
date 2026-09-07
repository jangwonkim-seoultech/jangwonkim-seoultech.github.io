"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { GalleryItem } from "@/lib/schemas";
import { assetPath } from "@/lib/paths";
import { Pagination } from "./pagination";

export function GalleryExplorer({
  items,
  pageSize,
}: {
  items: GalleryItem[];
  pageSize: number;
}) {
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    if (!selectedItem) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedItem]);

  return (
    <>
      <div className="gallery-grid">
        {visibleItems.map((item) => (
          <article className="gallery-item" key={item.id}>
            <button
              type="button"
              className="gallery-image-button"
              aria-label={`View ${item.title} larger`}
              onClick={() => setSelectedItem(item)}
            >
              <Image
                src={assetPath(item.image)}
                alt={item.alt}
                width={1100}
                height={780}
                sizes="(max-width: 760px) 100vw, 33vw"
              />
            </button>
            <div>
              <time dateTime={item.date}>{item.date.replace("-", ".")}</time>
              <h2>{item.title}</h2>
            </div>
          </article>
        ))}
      </div>
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        label="Gallery pages"
        onPageChange={setPage}
      />
      {selectedItem && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          onClick={() => setSelectedItem(null)}
        >
          <div className="gallery-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="gallery-lightbox-close"
              aria-label="Close enlarged image"
              onClick={() => setSelectedItem(null)}
            >
              ×
            </button>
            <Image
              src={assetPath(selectedItem.image)}
              alt={selectedItem.alt}
              width={1800}
              height={1300}
              sizes="95vw"
              priority
            />
            <div className="gallery-lightbox-caption">
              <time dateTime={selectedItem.date}>{selectedItem.date.replace("-", ".")}</time>
              <h2>{selectedItem.title}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
