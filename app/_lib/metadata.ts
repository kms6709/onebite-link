import type { Metadata } from "next";

export const siteName = "한입 링크";
export const defaultDescription = "북마크를 폴더별로 정리하고 관리하는 서비스";

export const ogImage = {
  url: "/thumbnail.png",
  width: 1200,
  height: 630,
  alt: siteName,
};

export function pageMetadata(
  title: string,
  description: string = defaultDescription
): Metadata {
  const fullTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      siteName,
      images: [ogImage],
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
