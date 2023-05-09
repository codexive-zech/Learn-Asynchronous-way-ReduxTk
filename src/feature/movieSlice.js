import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../utils/customFetch";

const initialState = {
  isLoading: false,
  movies: [],
  movie: {},
  searchTerm: "",
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
  async (_, thunkApi) => {
    const { searchTerm } = thunkApi.getState().movie;
    if (searchTerm.length === 0) {
      try {
        const response = customFetch.get(
          "trending/all/week?api_key=4761ab2e2f056d1db3f43dfecaf6f07b&language=en-US"
        );
        return (await response).data;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = customFetch.get(
          `/search/movie?api_key=4761ab2e2f056d1db3f43dfecaf6f07b&query=${searchTerm}`
        );
        return (await response).data;
      } catch (error) {
        console.log(error);
      }
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
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

export const { updateSearchTerm } = movieSlice.actions;

export default movieSlice.reducer;
