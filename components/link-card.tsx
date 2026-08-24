import type { Bookmark } from "@/app/_types/bookmark";

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function LinkCard({ bookmark }: { bookmark: Bookmark }) {
  const hostname = getHostname(bookmark.url);

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] transition-colors hover:bg-[var(--hover-bg)]"
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
  );
}
