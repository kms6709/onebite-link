import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-black">
      <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        한입 링크
      </span>

      <Link
        href="/new"
        className="flex h-10 items-center gap-1.5 rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        <span aria-hidden className="text-base leading-none">
          +
        </span>
        새 링크
      </Link>
    </header>
  );
}
