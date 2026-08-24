"use client";

import { useState, type FormEvent } from "react";
import type { Folder } from "@/app/_types/bookmark";
import { useFolders } from "@/app/_lib/folder-context";

type EditFolderModalProps = {
  folder: Folder;
  onClose: () => void;
};

export default function EditFolderModal({
  folder,
  onClose,
}: EditFolderModalProps) {
  const { renameFolder } = useFolders();
  const [name, setName] = useState(folder.name);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;
    renameFolder(folder.id, name);
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
        className="flex w-80 flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
      >
        <h2 className="text-base font-semibold text-[var(--text)]">
          폴더 수정
        </h2>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-folder-name"
            className="text-sm font-medium text-[var(--text)]"
          >
            폴더 이름
          </label>
          <input
            id="edit-folder-name"
            type="text"
            autoFocus
            required
            placeholder="폴더 이름을 입력하세요"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
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
