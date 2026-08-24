"use client";

import { useState } from "react";
import Link from "next/link";
import NewFolderModal from "./new-folder-modal";

export default function Header() {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/90 px-4 backdrop-blur-sm">
      <span className="text-base font-semibold tracking-tight text-[var(--text)]">
        한입 링크
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsFolderModalOpen(true)}
          className="flex h-9 items-center gap-1.5 rounded-md border border-[var(--border)] px-4 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--hover-bg)]"
        >
          <span aria-hidden className="text-base leading-none">
            +
          </span>
          새 폴더
        </button>

        <Link
          href="/new"
          className="flex h-9 items-center gap-1.5 rounded-md bg-[var(--accent)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          <span aria-hidden className="text-base leading-none">
            +
          </span>
          새 링크
        </Link>
      </div>

      {isFolderModalOpen && (
        <NewFolderModal onClose={() => setIsFolderModalOpen(false)} />
      )}
    </header>
  );
}
