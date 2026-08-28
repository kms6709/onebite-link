import type { Metadata } from "next";
import "./globals.css";
import { FolderProvider } from "@/app/_lib/folder-context";
import { BookmarkProvider } from "@/app/_lib/bookmark-context";
import { defaultDescription, ogImage, siteName } from "@/app/_lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  description: defaultDescription,
  openGraph: {
    title: siteName,
    description: defaultDescription,
    siteName,
    images: [ogImage],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    images: [ogImage.url],
  },
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
