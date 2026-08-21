import type { Folder } from "@/app/_types/bookmark";
import FolderList from "./folder-list";

type SidebarProps = {
  folders: Folder[];
  countByFolderId: Record<string, number>;
  totalCount: number;
};

export default function Sidebar({
  folders,
  countByFolderId,
  totalCount,
}: SidebarProps) {
  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] bg-[var(--background)] px-3 py-6">
      <FolderList
        folders={folders}
        countByFolderId={countByFolderId}
        totalCount={totalCount}
      />
    </aside>
  );
}
