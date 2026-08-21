import type { Bookmark } from "@/app/_types/bookmark";
import LinkCard from "./link-card";

export default function LinkGrid({ bookmarks }: { bookmarks: Bookmark[] }) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <p className="text-sm text-[var(--text-sub)]">
          등록된 링크가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {bookmarks.map((bookmark) => (
        <LinkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
