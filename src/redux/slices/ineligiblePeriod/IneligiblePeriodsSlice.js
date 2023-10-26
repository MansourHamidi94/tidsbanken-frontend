import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ineligiblePeriodAPI from './ineligiblePeriodAPI'; // Importing API functions
import { selectToken } from './userSlice'; // Importing the token selector from userSlice

// Async thunk to fetch ineligible period by request id
export const fetchIneligiblePeriods = createAsyncThunk(
  'ineligiblePeriods/fetchIneligiblePeriods',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = selectToken(getState()); // Selecting the token from the state
      const periods = await ineligiblePeriodAPI.getIneligiblePeriods(token); // API call to get ineligible periods
      return periods;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch ineligible periods');
    }
  }
);

// Async thunk to add an ineligible period
export const createIneligiblePeriod = createAsyncThunk(
  'ineligiblePeriods/createIneligiblePeriod',
  async (newPeriod, { getState, rejectWithValue }) => {
    try {
      const token = selectToken(getState()); // Selecting the token from the state
      const period = await ineligiblePeriodAPI.postIneligiblePeriod(newPeriod, token); // API call to create ineligible period
      return period;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create ineligible period');
    }
  }
);

// Async thunk to update an ineligible period
export const updateIneligiblePeriod = createAsyncThunk(
  'ineligiblePeriods/updateIneligiblePeriod',
  async ({ id, updatedPeriod }, { getState, rejectWithValue }) => {
    try {
      const token = selectToken(getState()); // Selecting the token from the state
      await ineligiblePeriodAPI.putIneligiblePeriod(id, updatedPeriod, token); // API call to update ineligible period
      return { id, updatedPeriod };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update ineligible period');
    }
  }
);

// Async thunk to delete an ineligible period
export const deleteIneligiblePeriod = createAsyncThunk(
  'ineligiblePeriods/deleteIneligiblePeriod',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = selectToken(getState()); // Selecting the token from the state
      await ineligiblePeriodAPI.deleteIneligiblePeriod(id, token); // API call to delete ineligible period
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete ineligible period');
    }
  }
);

// Ineligible period slice
const ineligiblePeriodsSlice = createSlice({
  name: 'ineligiblePeriods',
  initialState: {
    periods: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIneligiblePeriods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIneligiblePeriods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.periods = action.payload;
      })
      .addCase(fetchIneligiblePeriods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createIneligiblePeriod.fulfilled, (state, action) => {
        state.periods.push(action.payload);
      })
      .addCase(updateIneligiblePeriod.fulfilled, (state, action) => {
        const { id, updatedPeriod } = action.payload;
        const index = state.periods.findIndex(period => period.id === id);
        if (index !== -1) {
          state.periods[index] = updatedPeriod;
        }
      })
      .addCase(deleteIneligiblePeriod.fulfilled, (state, action) => {
        state.periods = state.periods.filter(period => period.id !== action.payload);
      });
  },
});

export default ineligiblePeriodsSlice.reducer;