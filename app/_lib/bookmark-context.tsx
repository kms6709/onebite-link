"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Bookmark } from "@/app/_types/bookmark";
import { createClient } from "@/utils/supabase/client";

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
  addBookmark: (input: NewBookmarkInput) => Promise<void>;
  updateBookmark: (id: string, input: BookmarkUpdateInput) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
};

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
};

function toBookmark(row: LinkRow): Bookmark {
  return {
    id: String(row.id),
    url: row.url,
    title: row.title ?? "",
    description: row.description ?? "",
    thumbnail: row.thumbnail_url ?? undefined,
    folderId: row.folder_id != null ? String(row.folder_id) : "",
  };
}

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id")
      .order("id", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data) return;
        setBookmarks(data.map(toBookmark));
      });
  }, []);

  async function addBookmark(input: NewBookmarkInput) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("links")
      .insert({
        url: input.url,
        title: input.title,
        description: input.description,
        thumbnail_url: input.thumbnail,
        folder_id: input.folderId ? Number(input.folderId) : null,
      })
      .select("id, url, title, description, thumbnail_url, folder_id")
      .single();

    if (error || !data) return;

    setBookmarks((prev) => [toBookmark(data), ...prev]);
  }

  async function updateBookmark(id: string, input: BookmarkUpdateInput) {
    const title = input.title.trim();
    if (!title) return;

    const description = input.description.trim();

    const supabase = createClient();
    const { error } = await supabase
      .from("links")
      .update({
        title,
        description,
        folder_id: input.folderId ? Number(input.folderId) : null,
      })
      .eq("id", id);

    if (error) return;

    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === id
          ? { ...bookmark, folderId: input.folderId, title, description }
          : bookmark
      )
    );
  }

  async function deleteBookmark(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("links").delete().eq("id", id);

    if (error) return;

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
