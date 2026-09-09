"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties, type SyntheticEvent } from "react";
import type { GalleryItem } from "@/lib/schemas";
import { formatDate } from "@/lib/i18n";
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
  const [thumbnailMattes, setThumbnailMattes] = useState<Record<string, string>>({});
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const rememberThumbnailMatte = (id: string, event: SyntheticEvent<HTMLImageElement>) => {
    if (thumbnailMattes[id]) return;

    const image = event.currentTarget;
    try {
      const canvas = document.createElement("canvas");
      const size = 24;
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;

      context.drawImage(image, 0, 0, size, size);
      const { data } = context.getImageData(0, 0, size, size);
      let red = 0;
      let green = 0;
      let blue = 0;
      let samples = 0;

      for (let y = 0; y < size; y += 1) {
        for (let x = 0; x < size; x += 1) {
          if (x !== 0 && y !== 0 && x !== size - 1 && y !== size - 1) continue;

          const offset = (y * size + x) * 4;
          const alpha = data[offset + 3] / 255;
          red += data[offset] * alpha + 255 * (1 - alpha);
          green += data[offset + 1] * alpha + 255 * (1 - alpha);
          blue += data[offset + 2] * alpha + 255 * (1 - alpha);
          samples += 1;
        }
      }

      const matte = `rgb(${Math.round(red / samples)} ${Math.round(green / samples)} ${Math.round(blue / samples)})`;
      setThumbnailMattes((current) => (current[id] ? current : { ...current, [id]: matte }));
    } catch {
      setThumbnailMattes((current) => (current[id] ? current : { ...current, [id]: "#fff" }));
    }
  };

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
              style={{ "--gallery-matte": thumbnailMattes[item.id] } as CSSProperties}
              aria-label={`View ${item.title} larger`}
              onClick={() => setSelectedItem(item)}
            >
              <Image
                src={assetPath(item.image)}
                alt={item.alt}
                fill
                sizes="(max-width: 760px) 100vw, 33vw"
                onLoad={(event) => rememberThumbnailMatte(item.id, event)}
              />
            </button>
            <div>
              <time dateTime={item.date}>{formatDate(item.date)}</time>
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
              <time dateTime={selectedItem.date}>{formatDate(selectedItem.date)}</time>
              <h2>{selectedItem.title}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
