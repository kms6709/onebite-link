"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Folder } from "@/app/_types/bookmark";
import { createClient } from "@/utils/supabase/client";
import { useAuthUserId } from "@/app/_lib/use-auth-user-id";

type FolderContextValue = {
  folders: Folder[];
  isAddingFolder: boolean;
  addFolder: (name: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const isAddingRef = useRef(false);
  const userId = useAuthUserId();

  useEffect(() => {
    if (!userId) {
      queueMicrotask(() => setFolders([]));
      return;
    }

    const supabase = createClient();

    supabase
      .from("folders")
      .select("id, name")
      .eq("user_id", userId)
      .order("id", { ascending: true })
      .then(({ data, error }) => {
        if (error || !data) return;
        setFolders(data.map((row) => ({ id: String(row.id), name: row.name })));
      });
  }, [userId]);

  async function addFolder(name: string) {
    const trimmed = name.trim();
    if (!trimmed || isAddingRef.current) return;

    isAddingRef.current = true;
    setIsAddingFolder(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("folders")
        .insert({ name: trimmed })
        .select("id, name")
        .single();

      if (error || !data) return;

      setFolders((prev) => [...prev, { id: String(data.id), name: data.name }]);
    } finally {
      isAddingRef.current = false;
      setIsAddingFolder(false);
    }
  }

  async function renameFolder(id: string, name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .update({ name: trimmed })
      .eq("id", id);

    if (error) return;

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: trimmed } : folder
      )
    );
  }

  async function deleteFolder(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("folders").delete().eq("id", id);

    if (error) return;

    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }

  return (
    <FolderContext.Provider
      value={{ folders, isAddingFolder, addFolder, renameFolder, deleteFolder }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
