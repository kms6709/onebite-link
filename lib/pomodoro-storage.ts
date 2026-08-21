import { useSyncExternalStore } from "react";

export const POMODORO_DURATION_KEY = "pomodoro-duration-minutes";

export const DEFAULT_DURATION_MINUTES = 25;
export const MIN_DURATION_MINUTES = 1;
export const MAX_DURATION_MINUTES = 60;

export function getStoredDurationMinutes(): number {
  if (typeof window === "undefined") {
    return DEFAULT_DURATION_MINUTES;
  }

  const stored = window.localStorage.getItem(POMODORO_DURATION_KEY);
  const parsed = stored === null ? NaN : Number(stored);

  if (
    !Number.isFinite(parsed) ||
    parsed < MIN_DURATION_MINUTES ||
    parsed > MAX_DURATION_MINUTES
  ) {
    return DEFAULT_DURATION_MINUTES;
  }

  return parsed;
}

export function setStoredDurationMinutes(minutes: number): void {
  window.localStorage.setItem(POMODORO_DURATION_KEY, String(minutes));
}

function subscribeToStorage(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerDurationSnapshot(): number {
  return DEFAULT_DURATION_MINUTES;
}

export function useStoredDurationMinutes(): number {
  return useSyncExternalStore(
    subscribeToStorage,
    getStoredDurationMinutes,
    getServerDurationSnapshot
  );
}
