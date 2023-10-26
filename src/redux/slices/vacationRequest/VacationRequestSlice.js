import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as VacationRequestAPI from './vacationRequestAPI';

// AsyncThunks
export const fetchVacationRequestById = createAsyncThunk(
  'vacationRequest/fetchVacationRequestById',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await VacationRequestAPI.getVacationRequestById(requestId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createVacationRequest = createAsyncThunk(
  'vacationRequest/createVacationRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await VacationRequestAPI.postVacationRequest(requestData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  startDate: null,
  endDate: null,
  requestStatus: null,
  vacationRequests: [],
  error: null,
}

// VacationRequest redux slice
const vacationRequestSlice = createSlice({
  name: 'vacationRequest',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacationRequestById.fulfilled, (state, action) => {
        state.vacationRequests = [action.payload];
        state.error = null;
      })
      .addCase(fetchVacationRequestById.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createVacationRequest.fulfilled, (state) => {
        state.requestStatus = "Success";
        state.error = null;
      })
      .addCase(createVacationRequest.rejected, (state, action) => {
        state.requestStatus = "Failed";
        state.error = action.payload;
      });
    // ... other cases ...
  },
});

export const { setStartDate, setEndDate } = vacationRequestSlice.actions;
export default vacationRequestSlice.reducer;
