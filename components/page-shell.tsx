import type { ReactNode } from "react";
import Sidebar from "./sidebar";

type PageShellProps = {
  countByFolderId: Record<string, number>;
  totalCount: number;
  title: string;
  children: ReactNode;
};

export default function PageShell({
  countByFolderId,
  totalCount,
  title,
  children,
}: PageShellProps) {
  return (
    <div className="flex flex-1">
      <Sidebar countByFolderId={countByFolderId} totalCount={totalCount} />

      <main className="flex-1 overflow-y-auto px-8 py-10">
        <h1 className="mb-8 text-xl font-semibold text-[var(--text)]">
          {title}
        </h1>
        {children}
      </main>
    </div>
  );
}
