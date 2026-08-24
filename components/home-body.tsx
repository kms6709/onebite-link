"use client";

import { useBookmarks } from "@/app/_lib/bookmark-context";
import { getFolderCounts } from "@/app/_lib/mock-data";
import PageShell from "./page-shell";
import LinkGrid from "./link-grid";

export default function HomeBody() {
  const { bookmarks } = useBookmarks();
  const countByFolderId = getFolderCounts(bookmarks);

  return (
    <PageShell
      countByFolderId={countByFolderId}
      totalCount={bookmarks.length}
      title="All"
    >
      <LinkGrid bookmarks={bookmarks} />
    </PageShell>
  );
}
