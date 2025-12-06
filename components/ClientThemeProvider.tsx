"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { replaceUi } from "@/redux/slices/ui.slice";
import { loadUiState } from "@/utils/localStorage";
import GlobalLoader from "./GlobalLoader";
import InitialLoader from "./ui/InitialLoader";

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const ui = useAppSelector((s) => s.ui);
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // RTL
    if (ui.rtl) document.documentElement.setAttribute("dir", "rtl");
    else document.documentElement.removeAttribute("dir");

    // Theme class
    const isDark =
      ui.theme === "dark" ||
      (ui.theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // CSS vars
    document.documentElement.style.setProperty("--accent-color", ui.themeColor || "#fe9f43");
    document.documentElement.style.setProperty("--sidebar-bg", ui.sidebarColor || "#111827");

    // boxed/layout class
    if (ui.boxed) document.documentElement.classList.add("layout-boxed");
    else document.documentElement.classList.remove("layout-boxed");

    // layoutMode class
    document.documentElement.setAttribute("data-layout-mode", ui.layoutMode || "default");

    // Listen for system theme changes if theme is 'system'
    if (ui.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [ui]);

  // Hydrate state from localStorage on mount
  useEffect(() => {
    const savedState = loadUiState();
    if (savedState) {
      dispatch(replaceUi(savedState));
    }
    // Small delay to ensure CSS vars are applied before showing content
    // This prevents the "flash" of default colors
    setTimeout(() => {
      setIsHydrated(true);
    }, 100);
  }, [dispatch]);

  if (!isHydrated) {
    return <InitialLoader />;
  }

  // This component must be used _inside_ Provider so hooks work
  return (
    <>
      <GlobalLoader />
      {children}
    </>
  );
}
