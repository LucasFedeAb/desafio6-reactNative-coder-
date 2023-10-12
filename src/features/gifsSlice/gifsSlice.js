import { createSlice } from "@reduxjs/toolkit";
/* import dataCategories from "../data/dataCategories";
import gifsData from "../data/gifsData"; */

const initialState = {
  /* categories: dataCategories,
  gifs: gifsData, */
  /* gifsFilteredByCategory: [], */
  uniqueCategories: [],
  categorySelected: "",
  gifIdSelected: null,
};

export const gifsSlice = createSlice({
  name: "gifs",
  initialState,
  reducers: {
    setCategorySelected: (state, action) => {
      state.categorySelected = action.payload;
    },
    setGifIdSelected: (state, action) => {
      state.gifIdSelected = action.payload;
    },
    setUniqueCategories: (state, action) => {
      state.uniqueCategories = action.payload;
    },
    /* setGifsFilteredByCategory: (state, action) => {
      state.gifsFilteredByCategory = action.payload;
    }, */
  },
});

export const { setCategorySelected, setGifIdSelected, setUniqueCategories } =
  gifsSlice.actions;

export default gifsSlice.reducer;
