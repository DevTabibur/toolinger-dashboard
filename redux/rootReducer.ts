import { blogApi } from "./api/blog.api";
import uiReducer from "./slices/ui.slice";
export const reducer = {
  ui: uiReducer,
  [blogApi.reducerPath]: blogApi.reducer,
};
