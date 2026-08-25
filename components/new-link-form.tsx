"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/app/_lib/folder-context";
import { useBookmarks } from "@/app/_lib/bookmark-context";

type OpenGraphResponse = {
  title: string;
  description: string;
  thumbnail: string;
};

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addBookmark } = useBookmarks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `/api/og?url=${encodeURIComponent(url)}`
      );

      if (!response.ok) {
        setError("링크 정보를 가져오지 못했습니다. 주소를 확인해 주세요.");
        return;
      }

      const og: OpenGraphResponse = await response.json();

      await addBookmark({
        url,
        folderId,
        title: og.title || url,
        description: og.description,
        thumbnail: og.thumbnail,
      });

      router.push("/");
    } catch {
      setError("링크 정보를 가져오지 못했습니다. 주소를 확인해 주세요.");
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
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

      {error && <p className="text-sm text-[var(--error)]">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 rounded-md bg-[var(--accent)] text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "확인 중..." : "확인"}
      </button>
    </form>
  );
}
