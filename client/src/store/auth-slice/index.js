import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token : null
};

// Register User Thunk
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
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
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
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

//Logout User Thunk
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`, {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      
    }
  }
);


// export const checkAuth = createAsyncThunk(
//   "/auth/checkauth",
//   async () => {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
//         {
//           withCredentials: true,
//           headers : {
//             "Cache-Control" : "no-store, no-cache, must-revalidate, proxy-revalidate",
//             Expires : '0'
//           }
//         }
//       );
//       return response.data;
//   });

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Authentication check failed.");
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    resetTokenAndCredentials : (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null
    }
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
      .addCase(registerUser.rejected, (state) => {
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
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.token
        sessionStorage.setItem('token', JSON.stringify(action.payload.token))
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null
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
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
  },
});

// Export Actions
export const { setUser, resetTokenAndCredentials } = authSlice.actions;

// Export Reducer
export default authSlice.reducer;