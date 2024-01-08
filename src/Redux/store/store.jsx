import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "../features/playerReducers";

export const GlobalStore = configureStore({
  reducer: {
    player: playerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
