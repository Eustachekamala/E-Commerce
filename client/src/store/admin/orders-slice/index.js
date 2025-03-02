import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading :false,
    orderList : [],
    orderDetails : null
}


export const getAllOrdersOfAllUser = createAsyncThunk(
  "/order/getAllOrdersOfAllUser",
  async () => {
    const response = await axios.get(
      `http://localhost:8000/api/admin/orders/get`);
      console.log("Orders Response:", response.data);
    return response.data;
  }
);

export const getAllOrderDetailsForAllUser = createAsyncThunk(
  "/order/getAllOrderDetailsForAllUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/orders/details/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const adminOrderSlice = createSlice({
    name : 'adminOrderSlice',
    initialState,
    reducers: {
      resetOrderDetails : (state) => {
        state.orderDetails = null
      }
    },
    extraReducers : (builder => {
        builder.addCase(getAllOrdersOfAllUser.pending , (state) => {
            state.isLoading = true;
        }).addCase(getAllOrdersOfAllUser.fulfilled , (state, action) => {
            state.isLoading = false;
            state.orderList = action.payload.data
        }).addCase(getAllOrdersOfAllUser.rejected , (state) => {
            state.isLoading = false;
            state.orderList = [];
        }).addCase(getAllOrderDetailsForAllUser.pending , (state) => {
            state.isLoading = true
        }).addCase(getAllOrderDetailsForAllUser.fulfilled , (state, action) => {
            state.isLoading = false,
            state.orderDetails = action.payload.data
        }).addCase(getAllOrderDetailsForAllUser.rejected , (state) => {
            state.isLoading = false;
        state.orderDetails = null
        })
    })
})

export const { resetOrderDetails } = adminOrderSlice.reducer


export default adminOrderSlice.reducer;