"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Bookmark } from "@/app/_types/bookmark";
import { bookmarks as initialBookmarks } from "@/app/_lib/mock-data";

type NewBookmarkInput = {
  url: string;
  folderId: string;
  title: string;
  description: string;
  thumbnail: string;
};

type BookmarkUpdateInput = {
  folderId: string;
  title: string;
  description: string;
};

type BookmarkContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (input: NewBookmarkInput) => void;
  updateBookmark: (id: string, input: BookmarkUpdateInput) => void;
  deleteBookmark: (id: string) => void;
};

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);

  function addBookmark(input: NewBookmarkInput) {
    const newBookmark: Bookmark = {
      id: `bookmark-${Date.now()}`,
      ...input,
    };
    setBookmarks((prev) => [newBookmark, ...prev]);
  }

  function updateBookmark(id: string, input: BookmarkUpdateInput) {
    const title = input.title.trim();
    if (!title) return;

    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === id
          ? {
              ...bookmark,
              folderId: input.folderId,
              title,
              description: input.description.trim(),
            }
          : bookmark
      )
    );
  }

  function deleteBookmark(id: string) {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  }

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, updateBookmark, deleteBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
