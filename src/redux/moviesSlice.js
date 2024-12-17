import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    addMovies: (state, action) => {
      state.movies.push(action.payload);
    },
    // removeMovie: (state, action) => {
    //   state.movies = state.movies.filter(movie => movie.id !== action.payload);
    // },
  },
});

export const { setMovies, addMovies /* removeMovie  */ } = moviesSlice.actions;
export default moviesSlice.reducer;
