import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  axios from 'axios'


const initialState = {
    isLoading : false,
    addressList : []
}


export const addAddress = createAsyncThunk('address/addAddress', async (formData) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/address/add`, formData);
  return response.data;
});

export const fetchAllAddress = createAsyncThunk('address/fetchAllAddress', async (userId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`)
    return response.data;
})


export const updateAddress = createAsyncThunk('address/updateAddress', async ({ userId, addressId, formData}) => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`, formData)
    return response.data
})

export const deleteAddress = createAsyncThunk('address/deleteAddress', async ({userId, addressId}) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`);
    return response.data
})


const addressSlice = createSlice({
    name : 'address',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(addAddress.pending, (state) => {
            state.isLoading = true
        }).addCase(addAddress.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(addAddress.rejected, (state) => {
            state.isLoading = false
        }).addCase(fetchAllAddress.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllAddress.fulfilled, (state, action) => {
            state.isLoading = false,
            state.addressList = action.payload.data
        }).addCase(fetchAllAddress.rejected, (state) => {
            state.isLoading = false,
            state.addressList = []
        })
    }
});

export default addressSlice.reducer;
