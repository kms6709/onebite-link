"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/toast";

function getResetErrorMessage(message: string): string {
  if (message.toLowerCase().includes("valid email")) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return "요청에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const isFormFilled = email !== "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormFilled || isSubmitting) return;

    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(getResetErrorMessage(error.message));
      return;
    }

    setIsSent(true);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6">
      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage("")} />
      )}
      {isSent && (
        <Toast
          message="비밀번호 재설정 링크를 이메일로 보내드렸습니다."
          onClose={() => setIsSent(false)}
          variant="success"
        />
      )}

      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-bold text-[var(--text)]">
          한입 링크
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
        >
          <p className="text-sm text-[var(--text-sub)]">
            가입하신 이메일로 비밀번호 재설정 링크를 보내드려요.
          </p>

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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormFilled || isSubmitting}
            className="mt-2 h-11 rounded-md bg-[var(--accent)] text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "발송 중..." : "재설정 링크 발송"}
          </button>

          <Link
            href="/login"
            className="text-center text-sm text-[var(--accent)] hover:underline"
          >
            로그인으로 돌아가기
          </Link>
        </form>
      </div>
    </div>
  );
}
