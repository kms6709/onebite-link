import type { Metadata } from "next";
import Header from "@/components/header";
import PageShell from "@/components/page-shell";
import NewLinkForm from "@/components/new-link-form";
import { bookmarks, getFolderCounts } from "@/app/_lib/mock-data";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata(
  "새 링크 추가",
  "새로운 링크를 추가하고 원하는 폴더에 저장하세요."
);

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
