import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import moviesReducer from './moviesSlice';
import categoriesReducer from "./categoriesSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    categories : categoriesReducer
  },
});

export default store;