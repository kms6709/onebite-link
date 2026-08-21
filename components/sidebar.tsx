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
    <aside className="w-56 shrink-0 border-r border-zinc-200 bg-white px-3 py-6 dark:border-zinc-800 dark:bg-black">
      <FolderList
        folders={folders}
        countByFolderId={countByFolderId}
        totalCount={totalCount}
      />
    </aside>
  );
}
