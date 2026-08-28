"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/toast";

type LinkStatus = "checking" | "ready" | "invalid";

function getUpdateErrorMessage(message: string): string {
  if (message.includes("Password should be at least")) {
    return "비밀번호는 6자 이상이어야 합니다.";
  }
  return "비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [linkStatus, setLinkStatus] = useState<LinkStatus>("checking");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormFilled = password !== "" && passwordConfirm !== "";

  useEffect(() => {
    const supabase = createClient();

    async function init() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      // Case 1: the /auth/confirm route already verified the recovery link
      // and set the session cookie before redirecting here.
      let { data } = await supabase.auth.getSession();

      // Case 2: a PKCE-style `?code=` redirect landed here directly.
      if (!data.session && code) {
        await supabase.auth.exchangeCodeForSession(code);
        ({ data } = await supabase.auth.getSession());
      }

      // Case 3: Supabase's default "Reset Password" email template redirects
      // here itself (bypassing our /auth/confirm route) using the classic
      // implicit format, i.e. tokens in the URL hash rather than a `code`.
      // The SDK is configured for PKCE, so it won't auto-consume this hash —
      // read it manually and establish the session ourselves.
      if (!data.session && url.hash) {
        const hashParams = new URLSearchParams(url.hash.slice(1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (accessToken && refreshToken) {
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          ({ data } = await supabase.auth.getSession());
        }
      }

      window.history.replaceState(null, "", url.pathname);
      setLinkStatus(data.session ? "ready" : "invalid");
    }

    init();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormFilled || isSubmitting) return;

    if (password !== passwordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setIsSubmitting(false);
      setErrorMessage(getUpdateErrorMessage(error.message));
      return;
    }

    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6">
      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage("")} />
      )}

      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-bold text-[var(--text)]">
          한입 링크
        </h1>

        {linkStatus === "invalid" ? (
          <div className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <p className="text-sm text-[var(--text-sub)]">
              유효하지 않거나 만료된 링크입니다.
            </p>
            <Link
              href="/forgot-password"
              className="text-sm text-[var(--accent)] hover:underline"
            >
              재설정 링크 다시 받기
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[var(--text)]"
              >
                새 비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={linkStatus !== "ready"}
                className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] disabled:opacity-40"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="passwordConfirm"
                className="text-sm font-medium text-[var(--text)]"
              >
                새 비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력해 주세요"
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                disabled={linkStatus !== "ready"}
                className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] disabled:opacity-40"
              />
            </div>

            <button
              type="submit"
              disabled={!isFormFilled || isSubmitting || linkStatus !== "ready"}
              className="mt-2 h-11 rounded-md bg-[var(--accent)] text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {linkStatus === "checking"
                ? "링크 확인 중..."
                : isSubmitting
                  ? "변경 중..."
                  : "비밀번호 변경"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
