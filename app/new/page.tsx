import Header from "@/components/header";
import PageShell from "@/components/page-shell";
import NewLinkForm from "@/components/new-link-form";
import { bookmarks, getFolderCounts } from "@/app/_lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header />
      <PageShell
        countByFolderId={getFolderCounts(bookmarks)}
        totalCount={bookmarks.length}
        title="새 링크"
      >
        <NewLinkForm />
      </PageShell>
    </div>
  );
}
