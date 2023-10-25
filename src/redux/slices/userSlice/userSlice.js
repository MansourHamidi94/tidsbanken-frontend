import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkUserExists, registerUser, createUser, updateUser, deleteUser } from './userAPI';

// Async thunks
export const userExists = createAsyncThunk(
    'user/userExists',
    async (_, thunkAPI) => {
      try {
        const response = await checkUserExists();
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const registerNewUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewUser = createAsyncThunk(
  'user/add',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  'user/edit',
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateUser(userId, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeUser = createAsyncThunk(
  'user/delete',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await deleteUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
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
        state.userExists = action.payload; // Update userExists in the state
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        // Handle user registration success
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        // Handle adding a new user success
      })
      .addCase(editUser.fulfilled, (state, action) => {
        // Handle editing a user success
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        // Handle removing a user success
      });
  }
});

export default userSlice.reducer;