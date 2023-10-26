import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ineligiblePeriodAPI from './ineligiblePeriodAPI'; // Importing API functions

// Async thunk to fetch ineligible period by request id
export const fetchIneligiblePeriods = createAsyncThunk(
  'ineligiblePeriods/fetchIneligiblePeriods',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.keycloak.token; // Assuming the token is stored in the keycloak slice of your Redux store
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
      const state = getState();
      const token = state.keycloak.token; // Assuming the token is stored in the keycloak slice of your Redux store
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
      const state = getState();
      const token = state.keycloak.token; // Assuming the token is stored in the keycloak slice of your Redux store
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
      const state = getState();
      const token = state.keycloak.token; // Assuming the token is stored in the keycloak slice of your Redux store
      await ineligiblePeriodAPI.deleteIneligiblePeriod(id, token); // API call to delete ineligible period
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete ineligible period');
    }
  }
);

// Ineligible period slice
const ineligiblePeriodSlice = createSlice({
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

export default ineligiblePeriodSlice.reducer;