"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/app/_types/bookmark";

type FolderListProps = {
  folders: Folder[];
  countByFolderId: Record<string, number>;
  totalCount: number;
};

export default function FolderList({
  folders,
  countByFolderId,
  totalCount,
}: FolderListProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      <SidebarItem
        href="/"
        label="All"
        count={totalCount}
        isActive={pathname === "/"}
      />

      <p className="mt-4 mb-1 px-3 text-xs font-medium text-zinc-400 dark:text-zinc-500">
        폴더
      </p>

      <ul className="flex flex-col gap-1">
        {folders.map((folder) => {
          const href = `/folder/${folder.id}`;
          return (
            <li key={folder.id}>
              <SidebarItem
                href={href}
                label={folder.name}
                count={countByFolderId[folder.id] ?? 0}
                isActive={pathname === href}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

type SidebarItemProps = {
  href: string;
  label: string;
  count: number;
  isActive: boolean;
};

function SidebarItem({ href, label, count, isActive }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
      }`}
    >
      <span className="truncate">{label}</span>
      <span
        className={`text-xs ${
          isActive
            ? "text-white/70 dark:text-zinc-900/60"
            : "text-zinc-400 dark:text-zinc-500"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}
