"use client";

/**
 * Theme system for Enchiridion Learn.
 *
 * - LIGHT is the preferred DEFAULT; DARK is opt-in (chosen in Settings).
 * - The choice persists in localStorage under "enchiridion-theme-mode".
 * - Propagates app-wide via `data-theme` on <html>, which drives the enc-*
 *   token utilities. It ALSO toggles the legacy `.deep-time` class so existing
 *   components built on the older `--color-ds-*` tokens track the same switch.
 *
 * A tiny inline script in <head> (see app/layout.tsx) applies the stored mode
 * before first paint to avoid a flash of the wrong theme; this provider then
 * reconciles React state with the DOM on mount.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "enchiridion-theme-mode";

interface ThemeValue {
  mode: ThemeMode;
  /** True once the provider has reconciled with the persisted value. */
  ready: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeValue | null>(null);

/** Apply a mode to <html> (data-theme + legacy .deep-time class). */
function applyMode(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", mode);
  root.classList.toggle("deep-time", mode === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default LIGHT. The pre-paint inline script may have already set the DOM to
  // the persisted mode; we reconcile React state to it on mount below.
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: ThemeMode | null = null;
    try {
      const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (raw === "light" || raw === "dark") stored = raw;
    } catch {
      // storage unavailable — fall back to default
    }
    const initial = stored ?? "light";
    setModeState(initial);
    applyMode(initial);
    setReady(true);
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    applyMode(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // ignore unavailable storage
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  const value = useMemo<ThemeValue>(
    () => ({ mode, ready, setMode, toggleTheme }),
    [mode, ready, setMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
