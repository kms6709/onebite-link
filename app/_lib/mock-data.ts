import type { Bookmark, Folder } from "../_types/bookmark";

export const folders: Folder[] = [
  { id: "frontend", name: "프론트엔드" },
  { id: "backend", name: "백엔드" },
  { id: "design", name: "디자인" },
  { id: "readlater", name: "나중에 읽기" },
];

export const bookmarks: Bookmark[] = [
  {
    id: "1",
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    description: "Next.js 공식 문서에서 라우팅과 렌더링을 학습합니다.",
    folderId: "frontend",
  },
  {
    id: "2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 우선 CSS 프레임워크 공식 사이트입니다.",
    folderId: "frontend",
  },
  {
    id: "3",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준 기술에 대한 참고 문서 모음입니다.",
    folderId: "frontend",
  },
  {
    id: "4",
    title: "Spring Boot Reference",
    url: "https://spring.io/projects/spring-boot",
    description: "스프링 부트 공식 레퍼런스 문서입니다.",
    folderId: "backend",
  },
  {
    id: "5",
    title: "PostgreSQL Docs",
    url: "https://www.postgresql.org/docs",
    description: "PostgreSQL 데이터베이스 공식 문서입니다.",
    folderId: "backend",
  },
  {
    id: "6",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "UI/UX 디자인 영감을 얻을 수 있는 사이트입니다.",
    folderId: "design",
  },
  {
    id: "7",
    title: "Figma Community",
    url: "https://figma.com/community",
    description: "다양한 디자인 리소스를 공유하는 커뮤니티입니다.",
    folderId: "design",
  },
  {
    id: "8",
    title: "Refactoring UI",
    url: "https://refactoringui.com",
    description: "개발자를 위한 UI 디자인 가이드입니다.",
    folderId: "readlater",
  },
];

export function getFolderCounts(bookmarks: Bookmark[]): Record<string, number> {
  return bookmarks.reduce<Record<string, number>>((counts, bookmark) => {
    counts[bookmark.folderId] = (counts[bookmark.folderId] ?? 0) + 1;
    return counts;
  }, {});
}
