export const setToLocalStorage = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export const loadUiState = () => {
  try {
    if (typeof window === "undefined") return undefined;
    const raw = localStorage.getItem("toolinger_ui");
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Failed to load ui from storage", e);
    return undefined;
  }
};
