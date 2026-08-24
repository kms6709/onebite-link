import type { Metadata } from "next";
import "./globals.css";
import { FolderProvider } from "@/app/_lib/folder-context";
import { BookmarkProvider } from "@/app/_lib/bookmark-context";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "북마크를 폴더별로 정리하고 관리하는 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <FolderProvider>
          <BookmarkProvider>{children}</BookmarkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
