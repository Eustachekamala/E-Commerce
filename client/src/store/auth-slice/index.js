import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// Register User Thunk
export const registerUser = createAsyncThunk(
  "auth/register", // Unique name for the thunk
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data; 
    } catch (error) {
      // Handle errors and return the error message
      return rejectWithValue(error.response?.data || "Registration failed. Please try again.");
    }
  }
);

// Login User Thunk
export const loginUser = createAsyncThunk(
  "auth/login", // Unique name for the thunk
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      // Handle errors and return the error message
      return rejectWithValue(error.response?.data || "Login failed. Please try again.");
    }
  }
);


export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async () => {
      const response = await axios.get(
        "http://localhost:8000/api/auth/check-auth",
        {
          withCredentials: true,
          headers : {
            "Cache-Control" : "no-store, no-cache, must-revalidate, proxy-revalidate",
            Expires : '0'
          }
        }
      );
      return response.data;
  });

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User Cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Login User Cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      //Chech-auth cases
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
  },
});

// Export Actions
export const { setUser, logoutUser } = authSlice.actions;

// Export Reducer
export default authSlice.reducer;