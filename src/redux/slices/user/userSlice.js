import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkUserExists, createUser } from './userAPI';

// Async thunks
export const userExists = createAsyncThunk(
    'user/userExists',
    async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.keycloak.token; // Assuming the token is stored in the keycloak slice of your Redux store
      try {
        const response = await checkUserExists(token);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const postUser = createAsyncThunk(
    'user/postUser',
    async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.keycloak.token; // Assuming the token is stored in the keycloak slice of your Redux store
      try {
        const response = await createUser(token);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

// Initial state
const initialState = {
  id: null,
  username: '',
  firstName: '',
  lastName: '',
  email: ''
};

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
       .addCase(userExists.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName; // Update userExists in the state
        state.email = action.payload.email;
      })
       .addCase(userExists.rejected, (action) => {
        console.error('Error checking if user exists:', action.payload);
      })
       .addCase(postUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName; // Update userExists in the state
        state.email = action.payload.email;
      })
      .addCase(postUser.rejected, (state, action) => {
        console.error('Error creating user:', action.payload);
      });
    }
});

export default userSlice.reducer;