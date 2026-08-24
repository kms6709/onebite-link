"use client";

import { useState, type FormEvent } from "react";
import type { Bookmark } from "@/app/_types/bookmark";
import { useFolders } from "@/app/_lib/folder-context";
import { useBookmarks } from "@/app/_lib/bookmark-context";

type EditLinkModalProps = {
  bookmark: Bookmark;
  onClose: () => void;
};

export default function EditLinkModal({
  bookmark,
  onClose,
}: EditLinkModalProps) {
  const { folders } = useFolders();
  const { updateBookmark } = useBookmarks();
  const [folderId, setFolderId] = useState(bookmark.folderId);
  const [title, setTitle] = useState(bookmark.title);
  const [description, setDescription] = useState(bookmark.description);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    updateBookmark(bookmark.id, { folderId, title, description });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="flex w-96 flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
      >
        <h2 className="text-base font-semibold text-[var(--text)]">
          링크 수정
        </h2>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-link-folder"
            className="text-sm font-medium text-[var(--text)]"
          >
            폴더
          </label>
          <select
            id="edit-link-folder"
            required
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
          >
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-link-title"
            className="text-sm font-medium text-[var(--text)]"
          >
            제목
          </label>
          <input
            id="edit-link-title"
            type="text"
            autoFocus
            required
            placeholder="링크 제목을 입력하세요"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-link-description"
            className="text-sm font-medium text-[var(--text)]"
          >
            설명
          </label>
          <textarea
            id="edit-link-description"
            rows={3}
            placeholder="링크 설명을 입력하세요"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="resize-none rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-md border border-[var(--border)] px-4 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--hover-bg)]"
          >
            취소
          </button>
          <button
            type="submit"
            className="h-9 rounded-md bg-[var(--accent)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
