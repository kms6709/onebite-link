import Header from "@/components/header";
import PageShell from "@/components/page-shell";
import LinkGrid from "@/components/link-grid";
import { bookmarks, getFolderCounts } from "./_lib/mock-data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header />
      <PageShell
        countByFolderId={getFolderCounts(bookmarks)}
        totalCount={bookmarks.length}
        title="All"
      >
        <LinkGrid bookmarks={bookmarks} />
      </PageShell>
    </div>
  );
}
