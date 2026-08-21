import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/90 px-4 backdrop-blur-sm">
      <span className="text-base font-semibold tracking-tight text-[var(--text)]">
        한입 링크
      </span>

      <Link
        href="/new"
        className="flex h-9 items-center gap-1.5 rounded-md bg-[var(--accent)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
      >
        <span aria-hidden className="text-base leading-none">
          +
        </span>
        새 링크
      </Link>
    </header>
  );
}
