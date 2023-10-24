import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = 'https://localhost:7172/api/User';


//GET
//Fetch all users
export const fetchAllUsers = createAsyncThunk(
    "user/fetchAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://localhost:7172/api/v1/Users', {
                method: "GET",
                headers: { "accept": "application/json" }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



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


// Adding a user
export const addUser = createAsyncThunk(
    "user/addUser",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API_URL}/add`, { // Change the URL as per your API's endpoint
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to add user');
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Deleting a user
  export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API_URL}/${userId}`, { // Change the URL as per your API's endpoint
          method: "DELETE",
        });
        if (!response.ok) throw new Error('Failed to delete user');
        return userId;
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
        users: []
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
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload; 
            }) 
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(u => u.id === action.payload);
                if (index !== -1) state.users.splice(index, 1);
            })
            ;
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
