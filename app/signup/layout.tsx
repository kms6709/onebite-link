import type { Metadata } from "next";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata(
  "회원가입",
  "한입 링크에 가입하고 북마크를 폴더별로 관리해 보세요."
);

export default function SignupLayout({ children }: LayoutProps<"/signup">) {
  return children;
}
