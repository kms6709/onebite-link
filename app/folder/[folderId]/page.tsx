import { notFound } from "next/navigation";
import Header from "@/components/header";
import PageShell from "@/components/page-shell";
import LinkGrid from "@/components/link-grid";
import { bookmarks, folders, getFolderCounts } from "@/app/_lib/mock-data";

export default async function FolderPage(
  props: PageProps<"/folder/[folderId]">
) {
  const { folderId } = await props.params;
  const folder = folders.find((item) => item.id === folderId);

  if (!folder) {
    notFound();
  }

  const folderBookmarks = bookmarks.filter(
    (bookmark) => bookmark.folderId === folderId
  );

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <PageShell
        folders={folders}
        countByFolderId={getFolderCounts(bookmarks)}
        totalCount={bookmarks.length}
        title={folder.name}
      >
        <LinkGrid bookmarks={folderBookmarks} />
      </PageShell>
    </div>
  );
}
