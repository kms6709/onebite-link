"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Folder } from "@/app/_types/bookmark";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="url"
          className="text-sm font-medium text-[var(--text)]"
        >
          링크 주소
        </label>
        <input
          id="url"
          type="url"
          required
          placeholder="https://example.com"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="folder"
          className="text-sm font-medium text-[var(--text)]"
        >
          폴더
        </label>
        <select
          id="folder"
          required
          value={folderId}
          onChange={(event) => setFolderId(event.target.value)}
          className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
        >
          <option value="" disabled>
            폴더 선택
          </option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="h-11 rounded-md bg-[var(--accent)] text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
      >
        저장
      </button>
    </form>
  );
}
