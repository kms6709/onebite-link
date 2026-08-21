import type { ReactNode } from "react";
import type { Folder } from "@/app/_types/bookmark";
import Sidebar from "./sidebar";

type PageShellProps = {
  folders: Folder[];
  countByFolderId: Record<string, number>;
  totalCount: number;
  title: string;
  children: ReactNode;
};

export default function PageShell({
  folders,
  countByFolderId,
  totalCount,
  title,
  children,
}: PageShellProps) {
  return (
    <div className="flex flex-1">
      <Sidebar
        folders={folders}
        countByFolderId={countByFolderId}
        totalCount={totalCount}
      />

      <main className="flex-1 overflow-y-auto px-8 py-6">
        <h1 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        {children}
      </main>
    </div>
  );
}
