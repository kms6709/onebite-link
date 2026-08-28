import type { Metadata } from "next";
import Header from "@/components/header";
import FolderPageBody from "@/components/folder-page-body";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata(
  "폴더",
  "폴더에 저장된 링크를 확인하세요."
);

export default async function FolderPage(
  props: PageProps<"/folder/[folderId]">
) {
  const { folderId } = await props.params;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Header />
      <FolderPageBody folderId={folderId} />
    </div>
  );
}
