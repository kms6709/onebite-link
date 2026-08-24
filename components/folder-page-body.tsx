"use client";

import { useFolders } from "@/app/_lib/folder-context";
import { useBookmarks } from "@/app/_lib/bookmark-context";
import { getFolderCounts } from "@/app/_lib/mock-data";
import PageShell from "./page-shell";
import LinkGrid from "./link-grid";

type FolderPageBodyProps = {
  folderId: string;
};

export default function FolderPageBody({ folderId }: FolderPageBodyProps) {
  const { folders } = useFolders();
  const { bookmarks } = useBookmarks();
  const folder = folders.find((item) => item.id === folderId);

  const countByFolderId = getFolderCounts(bookmarks);

  if (!folder) {
    return (
      <PageShell
        countByFolderId={countByFolderId}
        totalCount={bookmarks.length}
        title="폴더를 찾을 수 없습니다"
      >
        <p className="text-sm text-[var(--text-sub)]">
          존재하지 않는 폴더입니다.
        </p>
      </PageShell>
    );
  }

  const folderBookmarks = bookmarks.filter(
    (bookmark) => bookmark.folderId === folderId
  );

  return (
    <PageShell
      countByFolderId={countByFolderId}
      totalCount={bookmarks.length}
      title={folder.name}
    >
      <LinkGrid bookmarks={folderBookmarks} />
    </PageShell>
  );
}
