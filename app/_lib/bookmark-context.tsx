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

type BookmarkContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (input: NewBookmarkInput) => void;
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

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark }}>
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
