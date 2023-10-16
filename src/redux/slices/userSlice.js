    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

    const API_URL = 'https://localhost:7172/api/User';

    export const signupUser = createAsyncThunk(
    "user/signupUser",
    async (userData, { rejectWithValue }) => {
        try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Signup failed');
        return data;
        } catch (error) {
        return rejectWithValue(error.message);
        }
    }
    );

    export const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: null,
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
        state.profile = null;
        state.isAuthenticated = false;
        state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(signupUser.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
    });

    export const { logoutUser } = userSlice.actions;
    export default userSlice.reducer;
