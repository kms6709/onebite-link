"use client";

import { useFolders } from "@/app/_lib/folder-context";
import FolderList from "./folder-list";

type SidebarProps = {
  countByFolderId: Record<string, number>;
  totalCount: number;
};

export default function Sidebar({ countByFolderId, totalCount }: SidebarProps) {
  const { folders } = useFolders();

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
