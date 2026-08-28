"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFolders } from "@/app/_lib/folder-context";
import { createClient } from "@/utils/supabase/client";
import FolderList from "./folder-list";

type SidebarProps = {
  countByFolderId: Record<string, number>;
  totalCount: number;
};

export default function Sidebar({ countByFolderId, totalCount }: SidebarProps) {
  const { folders } = useFolders();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    const supabase = createClient();
    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--background)] px-3 py-6">
      <FolderList
        folders={folders}
        countByFolderId={countByFolderId}
        totalCount={totalCount}
      />

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="mt-auto flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[var(--text-sub)] transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <LogoutIcon />
        {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
      </button>

      <Link
        href="/privacy"
        className="mt-1 px-3 py-1 text-xs text-[var(--text-sub)] transition-colors hover:text-[var(--text)]"
      >
        개인정보 처리방침
      </Link>
    </aside>
  );
}

function LogoutIcon() {
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
        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3H21"
      />
    </svg>
  );
}
