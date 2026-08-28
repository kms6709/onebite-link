import type { Metadata } from "next";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata(
  "로그인",
  "한입 링크에 로그인하고 저장한 북마크를 확인하세요."
);

export default function LoginLayout({ children }: LayoutProps<"/login">) {
  return children;
}
