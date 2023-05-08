import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../utils/customFetch";

const initialState = {
  isLoading: false,
  movies: [],
  movie: {},
};

export const getMovies = createAsyncThunk("movie/getMovies", async () => {
  try {
    const response = customFetch.get(
      "trending/all/week?api_key=4761ab2e2f056d1db3f43dfecaf6f07b&language=en-US"
    );
    return (await response).data;
  } catch (error) {
    console.log(error);
  }
});

export const getSingleMovie = createAsyncThunk(
  "movie/getSingleMovie",
  async (id) => {
    try {
      const response = await customFetch.get(
        `movie/${id}?api_key=4761ab2e2f056d1db3f43dfecaf6f07b&language=en-US`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSearchedMovies = createAsyncThunk(
  "movie/getSearchedMovies",
  async (searchValue) => {
    try {
      const response = customFetch.get(
        `/search/movie?api_key=4761ab2e2f056d1db3f43dfecaf6f07b&query=${searchValue}`
      );
      return (await response).data;
    } catch (error) {
      console.log(error);
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload.results;
    },
    [getMovies.rejected]: (state) => {
      state.isLoading = false;
      alert("Error Occurred");
    },
    // getting single movie
    [getSingleMovie.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movie = action.payload;
    },
    [getSingleMovie.rejected]: (state) => {
      state.isLoading = false;
      alert("Error Occurred");
    },
    // getting search movies
    [getSearchedMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [getSearchedMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload.results;
    },
    [getSearchedMovies.rejected]: (state) => {
      state.isLoading = false;
      alert("Error Occurred");
    },
  },
});

export const { changeSearchTeam } = movieSlice.actions;

export default movieSlice.reducer;
