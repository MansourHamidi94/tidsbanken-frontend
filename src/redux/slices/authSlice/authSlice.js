import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutUser, refreshToken } from './authAPI';


// Async thunks
// Login
export const performLogin = createAsyncThunk(
  'auth/performLogin', 
  async () => {
    const response = await loginUser();
    if (response && response.token) {
      return response.token;
    }
    throw new Error('Login failed or token not received.');
  }
);

// Logout
export const performLogout = createAsyncThunk(
  'auth/performLogout', 
  async () => {
  await logoutUser();
});

// Refresh token (async thunk)
export const refreshUserToken = createAsyncThunk(
  'auth/refreshUserToken', 
  async (minValidity, { dispatch, rejectWithValue }) => {
  try {
    const token = await refreshToken(minValidity);
    dispatch(setToken(token));
    return token;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


// Initial state
const initialState = {
  isAuthenticated: false,
  token: null,
};


// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performLogin.fulfilled, (state, action) => {
        // Handle login success
        state.isAuthenticated = true;
        state.token = action.payload;
      })
      .addCase(performLogin.rejected, (state) => {
        // Handle login failure
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(performLogout.fulfilled, (state) => {
        // Handle logout success
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        // Handle token refresh success
        state.token = action.payload;
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        // Handle token refresh failure here if needed
      });
  },
});

export const { setToken, setError } = authSlice.actions;
export default authSlice.reducer;