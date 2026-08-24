"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Folder } from "@/app/_types/bookmark";
import DeleteFolderModal from "./delete-folder-modal";

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
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  return (
    <nav className="flex flex-col gap-1">
      <SidebarItem
        href="/"
        label="All"
        count={totalCount}
        isActive={pathname === "/"}
      />

      <p className="mt-4 mb-1 px-3 text-xs font-medium text-[var(--text-sub)]">
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
                onRequestDelete={() => setFolderToDelete(folder)}
              />
            </li>
          );
        })}
      </ul>

      {folderToDelete && (
        <DeleteFolderModal
          folder={folderToDelete}
          onClose={() => setFolderToDelete(null)}
        />
      )}
    </nav>
  );
}

type SidebarItemProps = {
  href: string;
  label: string;
  count: number;
  isActive: boolean;
  onRequestDelete?: () => void;
};

function SidebarItem({
  href,
  label,
  count,
  isActive,
  onRequestDelete,
}: SidebarItemProps) {
  return (
    <div className="group relative">
      <Link
        href={href}
        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
          isActive
            ? "bg-[var(--hover-bg)] font-medium text-[var(--text)]"
            : "font-medium text-[var(--text-sub)] hover:bg-[var(--hover-bg)] hover:text-[var(--text)]"
        }`}
      >
        <span className="truncate">{label}</span>
        <span
          className={`text-xs text-[var(--text-sub)] ${
            onRequestDelete ? "group-hover:opacity-0" : ""
          }`}
        >
          {count}
        </span>
      </Link>

      {onRequestDelete && (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onRequestDelete();
          }}
          aria-label={`${label} 폴더 삭제`}
          className="absolute top-1/2 right-2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-[var(--text-sub)] transition-colors hover:text-[var(--error)] group-hover:flex"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}
