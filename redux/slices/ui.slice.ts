import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UiState = {
  theme: "system" | "light" | "dark";
  rtl: boolean;
  themeColor: string;
  layoutMode:
    | "default"
    | "mini"
    | "horizontal"
    | "two-column"
    | "detached"
    | "without-header";
  layoutWidth: "fluid" | "stretched";
  sidebarColor: string | null;
  topbarColor: string | null;
  sidebarBackground: string;
  customizerOpen: boolean;
  isLoading: boolean;
};

export const defaultUiState: UiState = {
  theme: "system",
  rtl: false,
  themeColor: "#007496",
  layoutMode: "default",
  sidebarColor: null, // "#111827",
  topbarColor: null,
  sidebarBackground: "",
  layoutWidth: "fluid",
  customizerOpen: false,
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: defaultUiState,
  reducers: {
    setTheme(state, action: PayloadAction<UiState["theme"]>) {
      state.theme = action.payload;
    },
    setRtl(state, action: PayloadAction<boolean>) {
      state.rtl = action.payload;
    },
    setThemeColor(state, action: PayloadAction<string>) {
      state.themeColor = action.payload;
    },
    setLayoutMode(state, action: PayloadAction<UiState["layoutMode"]>) {
      state.layoutMode = action.payload;
    },
    setLayoutWidth(state, action: PayloadAction<UiState["layoutWidth"]>) {
      state.layoutWidth = action.payload;
    },
    setSidebarColor(state, action: PayloadAction<string>) {
      state.sidebarColor = action.payload;
    },
    setTopbarColor(state, action: PayloadAction<string | null>) {
      state.topbarColor = action.payload;
    },
    setSidebarBackground(state, action: PayloadAction<string>) {
      state.sidebarBackground = action.payload;
    },
    toggleCustomizer(state) {
      state.customizerOpen = !state.customizerOpen;
    },
    setCustomizerOpen(state, action: PayloadAction<boolean>) {
      state.customizerOpen = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    // helper to replace UI with loaded state
    replaceUi(state, action: PayloadAction<Partial<UiState>>) {
      return { ...state, ...action.payload };
    },
    resetTheme(state) {
      return {
        ...defaultUiState,
        customizerOpen: state.customizerOpen,
      };
    },
  },
});

export const {
  setTheme,
  setRtl,
  setThemeColor,
  setLayoutMode,
  setLayoutWidth,
  setSidebarColor,
  setTopbarColor,
  setSidebarBackground,
  toggleCustomizer,
  setCustomizerOpen,
  setLoading,
  replaceUi,
  resetTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
