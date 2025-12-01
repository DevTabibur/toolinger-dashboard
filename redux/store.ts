import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./rootReducer";
import { defaultUiState, UiState } from "./slices/ui.slice";

function loadUiFromStorage(): { ui: UiState } | undefined {
  try {
    if (typeof window === "undefined") return undefined;
    const raw = localStorage.getItem("toolinger_ui");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    // Validate minimal shape
    return { ui: { ...defaultUiState, ...(parsed || {}) } };
  } catch (e) {
    console.warn("Failed to load ui from storage", e);
    return undefined;
  }
}

export const store = configureStore({
  reducer,
  preloadedState: loadUiFromStorage(),
});

// Persist UI automatically to localStorage (simple approach)
store.subscribe(() => {
  try {
    const state = store.getState();
    const ui = state.ui;
    localStorage.setItem("toolinger_ui", JSON.stringify(ui));
  } catch (e) {
    // ignore
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
