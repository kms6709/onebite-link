"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Folder } from "@/app/_types/bookmark";
import { folders as initialFolders } from "@/app/_lib/mock-data";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  function addFolder(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name: trimmed,
    };
    setFolders((prev) => [...prev, newFolder]);
  }

  function renameFolder(id: string, name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: trimmed } : folder
      )
    );
  }

  function deleteFolder(id: string) {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }

  return (
    <FolderContext.Provider
      value={{ folders, addFolder, renameFolder, deleteFolder }}
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
