import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./rootReducer";
import { defaultUiState, UiState } from "./slices/ui.slice";
import { blogApi } from "./api/blog.api";

function loadUiFromStorage(): { ui: UiState } | undefined {
  try {
    if (typeof window === "undefined") return undefined;
    const raw = localStorage.getItem("toolinger_ui");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return { ui: { ...defaultUiState, ...(parsed || {}) } };
  } catch (e) {
    console.warn("Failed to load ui from storage", e);
    return undefined;
  }
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware), 
  preloadedState: loadUiFromStorage(),
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const ui = state.ui;
    // console.log('ui', ui);
    localStorage.setItem("toolinger_ui", JSON.stringify(ui));
  } catch (e) {
    console.error("Failed to save ui to storage", e);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
