import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addProductReview = createAsyncThunk(
  "/shop/addProductReview",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
      formData
    );
    return response.data;
  }
);

export const getProductReviews = createAsyncThunk(
  "/shop/getProductReviews",
  async (productId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`
    );
     console.log("Fetched Reviews:", response.data);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = [action.payload.data, ...state.reviews];
      })
      .addCase(addProductReview.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      })
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getProductReviews.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default reviewSlice.reducer;
