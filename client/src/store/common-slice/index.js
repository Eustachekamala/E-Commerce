import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading : false,
    featureImageList : []
}

export const addImageFeature = createAsyncThunk("/order/addImageFeature", async (image) => {
    const response = await axios.post('http://localhost:8000/api/common/feature/add', {image})
    return response.data
})


export const getImageFeatures = createAsyncThunk("/order/getImageFeatures", async () => {
    const response = await axios.get('http://localhost:8000/api/common/feature/get')
    return response.data
})


const commonSlice = createSlice({
    name : "commonSlice",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getImageFeatures.pending, (state) => {
            state.isLoading = false
        }).addCase(getImageFeatures.fulfilled, (state, action) => {
            state.isLoading = true,
            state.featureImageList = action.payload.data
        }).addCase(getImageFeatures.rejected, (state) => {
            state.isLoading = false
            state.featureImageList = []
        })
    }
})


export default commonSlice.reducer;