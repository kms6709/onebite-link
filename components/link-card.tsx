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
      className="group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
          {hostname.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {bookmark.title}
          </p>
          <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">
            {hostname}
          </p>
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
        {bookmark.description}
      </p>
    </a>
  );
}
