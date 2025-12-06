// "use client";

// import { useEffect, useState } from "react";
// import { useAppSelector } from "@/redux/hooks";
// import { useDispatch } from "react-redux";
// import { replaceUi } from "@/redux/slices/ui.slice";
// import { loadUiState } from "@/utils/localStorage";
// import GlobalLoader from "./GlobalLoader";
// import InitialLoader from "./ui/InitialLoader";
// import tinycolor from "tinycolor2";

// export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
//   const ui = useAppSelector((s) => s.ui);
//   const dispatch = useDispatch();
//   const [isHydrated, setIsHydrated] = useState(false);

//   useEffect(() => {
//     // RTL
//     if (ui.rtl) document.documentElement.setAttribute("dir", "rtl");
//     else document.documentElement.removeAttribute("dir");

//     // Theme class
//     const isDark =
//       ui.theme === "dark" ||
//       (ui.theme === "system" &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches);

//     if (isDark) document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");

//     // CSS vars
//     document.documentElement.style.setProperty("--accent-color", ui.themeColor || "#fe9f43");
//     document.documentElement.style.setProperty("--sidebar-bg", ui.sidebarColor || "#111827");

//     // boxed/layout class
//     if (ui.layoutWidth === "fluid") document.documentElement.classList.remove("layout-boxed");
//     else document.documentElement.classList.add("layout-boxed");

//     // layoutMode class
//     document.documentElement.setAttribute("data-layout-mode", ui.layoutMode || "default");

//     // Listen for system theme changes if theme is 'system'
//     if (ui.theme === "system") {
//       const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//       const handleChange = (e: MediaQueryListEvent) => {
//         if (e.matches) document.documentElement.classList.add("dark");
//         else document.documentElement.classList.remove("dark");
//       };
//       mediaQuery.addEventListener("change", handleChange);
//       return () => mediaQuery.removeEventListener("change", handleChange);
//     }
//   }, [ui]);

//   // Hydrate state from localStorage on mount
//   useEffect(() => {
//     const savedState = loadUiState();
//     if (savedState) {
//       dispatch(replaceUi(savedState));
//     }
//     // Small delay to ensure CSS vars are applied before showing content
//     // This prevents the "flash" of default colors
//     setTimeout(() => {
//       setIsHydrated(true);
//     }, 100);
//   }, [dispatch]);


//   const ThemeVarsApplier = () => {
//     // use selector from store (hook)
//     const ui = useAppSelector((s) => s.ui);

//     useEffect(() => {
//       const themeColor = ui.themeColor || "#fe9f43"; // fallback
//       const tc = tinycolor(themeColor);

//       // Base CSS vars
//       document.documentElement.style.setProperty("--primary", tc.toHexString());
//       // darker/lighter variants for hover/focus
//       document.documentElement.style.setProperty("--primary-dark", tc.darken(12).toHexString());
//       document.documentElement.style.setProperty("--primary-light", tc.lighten(12).toHexString());
//       // translucent for outlines / shadows
//       document.documentElement.style.setProperty("--primary-20", tc.setAlpha(0.2).toRgbString());
//       // readable foreground (white/black)
//       const fg = tc.isLight() ? "#0f172a" : "#ffffff";
//       document.documentElement.style.setProperty("--primary-foreground", fg);

//       // scrollbar thumb color
//       document.documentElement.style.setProperty("--scrollbar-thumb", tc.darken(8).toHexString());

//       // selection color
//       document.documentElement.style.setProperty("--selection-bg", tc.setAlpha(0.2).toRgbString());
//       document.documentElement.style.setProperty("--selection-color", fg);

//       // also set sidebar / topbar if you want centralized:
//       if (ui.topbarColor) document.documentElement.style.setProperty("--topbar", ui.topbarColor);
//       if (ui.sidebarColor) document.documentElement.style.setProperty("--sidebar", ui.sidebarColor);

//       // dark-mode handling: if using .dark class, you can adjust further (optional)
//       // tinycolor can be used to compute accessible colors for dark mode too.

//     }, [ui.themeColor, ui.topbarColor, ui.sidebarColor]);

//     return null;
//   }


//   if (!isHydrated) {
//     return <InitialLoader />;
//   }

//   // This component must be used _inside_ Provider so hooks work
//   return (
//     <>
//       <GlobalLoader />
//       <ThemeVarsApplier />
//       {children}
//     </>
//   );
// }













// ============================================NEW CODE




























"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { replaceUi } from "@/redux/slices/ui.slice";
import { loadUiState } from "@/utils/localStorage";
import GlobalLoader from "./GlobalLoader";
import InitialLoader from "./ui/InitialLoader";
import tinycolor from "tinycolor2"; // used to generate light/dark/alpha variants

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const ui = useAppSelector((s) => s.ui);
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // -------------------------------
    // KEEP EXISTING BEHAVIOR (RTL / THEME CLASS / LAYOUT / DATA ATTR)
    // -------------------------------

    // RTL: set HTML dir attribute
    if (ui.rtl) document.documentElement.setAttribute("dir", "rtl");
    else document.documentElement.removeAttribute("dir");

    // Theme class: dark / light / system handling (existing logic preserved)
    const isDark =
      ui.theme === "dark" ||
      (ui.theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // -------------------------------
    // THEME COLOR (NEW) — set many CSS variables based on ui.themeColor
    // -------------------------------
    // Explanation:
    // - We keep your existing setProperty for --accent-color and --sidebar-bg
    // - Additionally we compute sensible primary variants using tinycolor2 and
    //   set CSS variables that UI components can use: --primary, --primary-dark,
    //   --primary-light, --primary-20 (20% alpha), --primary-foreground.
    // - Also set scrollbar thumb & selection colors so those reflect the chosen theme color.
    // - Nothing else in your code is removed — only extra vars are set.

    const baseColor = ui.themeColor || "#fe9f43"; // fallback to your default
    // set the original accent var you had (kept for backward compatibility)
    document.documentElement.style.setProperty("--accent-color", baseColor);

    // compute variants using tinycolor
    try {
      const tc = tinycolor(baseColor);
      const primary = tc.toHexString(); // base hex
      const primaryDark = tc.darken(12).toHexString(); // hover / active
      const primaryLight = tc.lighten(12).toHexString(); // subtle bg
      const primary20 = tc.setAlpha(0.16).toRgbString(); // translucent for focus / overlay
      const primary30 = tc.setAlpha(0.28).toRgbString(); // slightly stronger translucent
      const scrollbarThumb = tc.darken(8).toHexString();

      // readable foreground (white or dark) depending on baseColor brightness
      const primaryFg = tc.isLight() ? "#0f172a" : "#ffffff";

      // Set CSS variables (components can use --primary etc.)
      document.documentElement.style.setProperty("--primary", primary);
      document.documentElement.style.setProperty("--primary-dark", primaryDark);
      document.documentElement.style.setProperty("--primary-light", primaryLight);
      document.documentElement.style.setProperty("--primary-20", primary20);
      document.documentElement.style.setProperty("--primary-30", primary30);
      document.documentElement.style.setProperty("--primary-foreground", primaryFg);

      // Scrollbar / selection / outline vars
      document.documentElement.style.setProperty("--scrollbar-thumb", scrollbarThumb);
      document.documentElement.style.setProperty("--selection-bg", tc.setAlpha(0.18).toRgbString());
      document.documentElement.style.setProperty("--selection-color", primaryFg);

      // Optional: provide topbar/sidebar vars if you want centralized usage
      if (ui.topbarColor) {
        document.documentElement.style.setProperty("--topbar", ui.topbarColor);
      } else {
        // if not set, use a derivative of primary (light/dark aware)
        document.documentElement.style.setProperty("--topbar", primary);
      }
      if (ui.sidebarColor) {
        document.documentElement.style.setProperty("--sidebar", ui.sidebarColor);
      } else {
        // keep a darker variant for sidebar by default
        document.documentElement.style.setProperty("--sidebar", tinycolor(primary).darken(30).toHexString());
      }
    } catch (e) {
      // if tinycolor fails for any reason, at least set the basic vars
      document.documentElement.style.setProperty("--primary", baseColor);
      document.documentElement.style.setProperty("--primary-foreground", "#0f172a");
    }

    // Keep existing: sidebar background var
    document.documentElement.style.setProperty("--sidebar-bg", ui.sidebarColor || "#111827");

    // -------------------------------
    // BOXED / LAYOUT classes (existing)
    // -------------------------------
    if (ui.layoutWidth === "fluid") document.documentElement.classList.remove("layout-boxed");
    else document.documentElement.classList.add("layout-boxed");

    // layoutMode attribute (existing)
    document.documentElement.setAttribute("data-layout-mode", ui.layoutMode || "default");

    // Listen for system theme changes if theme is 'system' (existing)
    if (ui.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [ui]); // <--- we keep same dependency (ui) so nothing else changes

  // Hydrate state from localStorage on mount (existing)
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

