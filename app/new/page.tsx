import Header from "@/components/header";
import PageShell from "@/components/page-shell";
import NewLinkForm from "@/components/new-link-form";
import { bookmarks, folders, getFolderCounts } from "@/app/_lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <PageShell
        folders={folders}
        countByFolderId={getFolderCounts(bookmarks)}
        totalCount={bookmarks.length}
        title="새 링크"
      >
        <NewLinkForm folders={folders} />
      </PageShell>
    </div>
  );
}
