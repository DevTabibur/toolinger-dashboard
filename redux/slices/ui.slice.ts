
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UiState = {
  theme: "system" | "light" | "dark";
  rtl: boolean;
  accent: string;
  layoutMode:
    | "default"
    | "mini"
    | "horizontal"
    | "two-column"
    | "detached"
    | "without-header";
  boxed: boolean;
  sidebarColor: string;
};

export const defaultUiState: UiState = {
  theme: "system",
  rtl: false,
  accent: "#2563eb",
  layoutMode: "default",
  boxed: false,
  sidebarColor: "#111827",
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
    setAccent(state, action: PayloadAction<string>) {
      state.accent = action.payload;
    },
    setLayoutMode(state, action: PayloadAction<UiState["layoutMode"]>) {
      state.layoutMode = action.payload;
    },
    setBoxed(state, action: PayloadAction<boolean>) {
      state.boxed = action.payload;
    },
    setSidebarColor(state, action: PayloadAction<string>) {
      state.sidebarColor = action.payload;
    },
    // helper to replace UI with loaded state
    replaceUi(state, action: PayloadAction<Partial<UiState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setTheme,
  setRtl,
  setAccent,
  setLayoutMode,
  setBoxed,
  setSidebarColor,
  replaceUi,
} = uiSlice.actions;

export default uiSlice.reducer;
