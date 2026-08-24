import Header from "@/components/header";
import FolderPageBody from "@/components/folder-page-body";

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
