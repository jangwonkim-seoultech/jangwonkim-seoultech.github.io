"use client";

import { dictionary } from "@/lib/i18n";

export function Pagination({
  page,
  totalPages,
  label,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  label: string;
  onPageChange: (page: number) => void;
}) {
  const t = dictionary;
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label={label}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        {t.common.previous}
      </button>
      <span aria-live="polite">
        {t.common.pageStatus} {page} / {totalPages}
      </span>
      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((value) => (
          <button
            type="button"
            key={value}
            className={value === page ? "selected" : ""}
            aria-current={value === page ? "page" : undefined}
            onClick={() => onPageChange(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        {t.common.next}
      </button>
    </nav>
  );
}
