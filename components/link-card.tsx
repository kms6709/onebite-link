"use client";

import { useState } from "react";
import type { Bookmark } from "@/app/_types/bookmark";
import DeleteLinkModal from "./delete-link-modal";
import EditLinkModal from "./edit-link-modal";

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function LinkCard({ bookmark }: { bookmark: Bookmark }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const hostname = getHostname(bookmark.url);

  return (
    <div className="group relative">
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] transition-colors hover:bg-[var(--hover-bg)]"
      >
        {bookmark.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bookmark.thumbnail}
            alt=""
            loading="lazy"
            className="h-36 w-full object-cover"
          />
        )}

        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--hover-bg)] text-sm font-semibold text-[var(--text)]">
              {hostname.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[var(--text)]">
                {bookmark.title}
              </p>
              <p className="truncate text-xs text-[var(--text-sub)]">
                {hostname}
              </p>
            </div>
          </div>

          <p className="line-clamp-2 text-sm text-[var(--text-sub)]">
            {bookmark.description}
          </p>
        </div>
      </a>

      <div className="absolute top-2 right-2 hidden items-center gap-1 group-hover:flex">
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsEditModalOpen(true);
          }}
          aria-label={`${bookmark.title} 링크 수정`}
          className="flex h-7 w-7 items-center justify-center rounded-md bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-[var(--accent)]"
        >
          <PencilIcon />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsDeleteModalOpen(true);
          }}
          aria-label={`${bookmark.title} 링크 삭제`}
          className="flex h-7 w-7 items-center justify-center rounded-md bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-[var(--error)]"
        >
          <TrashIcon />
        </button>
      </div>

      {isEditModalOpen && (
        <EditLinkModal
          bookmark={bookmark}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteLinkModal
          bookmark={bookmark}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}

function PencilIcon() {
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
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
      />
    </svg>
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
