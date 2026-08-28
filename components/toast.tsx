"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
  variant?: "error" | "success";
};

export default function Toast({ message, onClose, variant = "error" }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const color = variant === "success" ? "var(--success)" : "var(--error)";

  return (
    <div
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-md border bg-[var(--surface)] px-4 py-3 text-sm font-medium"
      style={{ borderColor: color, color }}
    >
      {message}
    </div>
  );
}
