import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIneligiblePeriods = createAsyncThunk(
  'ineligiblePeriods/fetchIneligiblePeriods',
  async () => {
    const response = await fetch('https://localhost:7172/api/v1/IneligiblePeriods');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }
);

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
      });
  },
});

export default ineligiblePeriodsSlice.reducer;
