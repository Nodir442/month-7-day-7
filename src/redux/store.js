import { configureStore } from "@reduxjs/toolkit";
import { todoServise } from "./service/todo-api";

export const store = configureStore({
  reducer: {
    [todoServise.reducerPath]: todoServise.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoServise.middleware),
});
