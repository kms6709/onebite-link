"use client";

import type { Folder } from "@/app/_types/bookmark";
import { useFolders } from "@/app/_lib/folder-context";

type DeleteFolderModalProps = {
  folder: Folder;
  onClose: () => void;
};

export default function DeleteFolderModal({
  folder,
  onClose,
}: DeleteFolderModalProps) {
  const { deleteFolder } = useFolders();

  async function handleConfirm() {
    await deleteFolder(folder.id);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-80 flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
      >
        <h2 className="text-base font-semibold text-[var(--text)]">
          폴더 삭제
        </h2>

        <p className="text-sm text-[var(--text-sub)]">
          <span className="font-medium text-[var(--text)]">
            &ldquo;{folder.name}&rdquo;
          </span>{" "}
          폴더를 삭제하시겠습니까?
          <br />
          삭제한 폴더는 복구할 수 없습니다.
        </p>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-md border border-[var(--border)] px-4 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--hover-bg)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="h-9 rounded-md bg-[var(--error)] px-4 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
