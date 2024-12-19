import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rentedMovies: [],
};

const rentedMoviesSlice = createSlice({
  name: "rentedMovies",
  initialState,
  reducers: {
    setRentedMovies: (state, action) => {
      state.movies = action.payload;
    },
    watchedMovies: (state, action) => {
      state.movies.push(action.payload);
    },
  },
});

export const { setMovies, watchedMovies  } = moviesSlice.actions;
export default moviesSlice.reducer;
