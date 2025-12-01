
"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const ui = useAppSelector((s) => s.ui);

  useEffect(() => {
    // RTL
    if (ui.rtl) document.documentElement.setAttribute("dir", "rtl");
    else document.documentElement.removeAttribute("dir");

    // Theme class
    if (ui.theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // CSS vars
    document.documentElement.style.setProperty("--accent-color", ui.accent || "#2563eb");
    document.documentElement.style.setProperty("--sidebar-bg", ui.sidebarColor || "#111827");

    // boxed/layout class
    if (ui.boxed) document.documentElement.classList.add("layout-boxed");
    else document.documentElement.classList.remove("layout-boxed");

    // layoutMode class
    document.documentElement.setAttribute("data-layout-mode", ui.layoutMode || "default");
  }, [ui]);

  // This component must be used _inside_ Provider so hooks work
  return <>{children}</>;
}
