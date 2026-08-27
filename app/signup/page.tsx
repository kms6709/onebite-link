import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-bold text-[var(--text)]">
          한입 링크
        </h1>

        <form className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[var(--text)]"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[var(--text)]"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="passwordConfirm"
              className="text-sm font-medium text-[var(--text)]"
            >
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력해 주세요"
              className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
            />
          </div>

          <button
            type="button"
            className="mt-2 h-11 rounded-md bg-[var(--accent)] text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            회원가입
          </button>

          <Link
            href="/login"
            className="text-center text-sm text-[var(--accent)] hover:underline"
          >
            이미 계정이 있으신가요? 로그인
          </Link>
        </form>
      </div>
    </div>
  );
}
