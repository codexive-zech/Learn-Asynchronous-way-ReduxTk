import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../feature/movieSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});
