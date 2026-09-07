"use client";

import { useState } from "react";
import type { News } from "@/lib/schemas";
import { NewsList } from "./news-list";
import { Pagination } from "./pagination";

export function NewsExplorer({
  news,
  pageSize,
}: {
  news: News[];
  pageSize: number;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(news.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleNews = news.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <NewsList news={visibleNews} />
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        label="News pages"
        onPageChange={setPage}
      />
    </>
  );
}
