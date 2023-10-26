import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as vacationRequestAPI from './vacationRequestAPI';

// AsyncThunk for fetching vacation request by id
export const fetchVacationRequestById = createAsyncThunk(
  'vacationRequest/fetchVacationRequestById',
  async (requestId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.keycloak.token; // Assuming the token is stored in the keycloak slice of your Redux store
      const response = await vacationRequestAPI.getVacationRequestById(requestId, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch vacation request');
    }
  }
);

// AsyncThunk for creating a new vacation request
export const createVacationRequest = createAsyncThunk(
  'vacationRequest/createVacationRequest',
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.keycloak.token; // Assuming the token is stored in the keycloak slice of your Redux store
      const response = await vacationRequestAPI.postVacationRequest(requestData, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create vacation request');
    }
  }
);

// AsyncThunk for updating an existing vacation request
export const updateVacationRequest = createAsyncThunk(
  'vacationRequest/updateVacationRequest',
  async ({ id, updatedData }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.keycloak.token; // Assuming the token is stored in the keycloak slice of your Redux store
      await vacationRequestAPI.putVacationRequest(id, updatedData, token);
      return { id, updatedData };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update vacation request');
    }
  }
);

// AsyncThunk for deleting a vacation request
export const deleteVacationRequest = createAsyncThunk(
  'vacationRequest/deleteVacationRequest',
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.keycloak.token; // Assuming the token is stored in the keycloak slice of your Redux store
      await vacationRequestAPI.deleteVacationRequest(id, token);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete vacation request');
    }
  }
);

// The initial state of the vacationRequest part of the Redux store
const initialState = {
  startDate: null,
  endDate: null,
  requestStatus: null,
  vacationRequests: [],
  error: null,
};

// The slice of the Redux store concerning vacation requests
const vacationRequestSlice = createSlice({
  name: 'vacationRequest',
  initialState,
  reducers: {
    // Reducer for setting the start date of a vacation request
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    // Reducer for setting the end date of a vacation request
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling the fulfilled state of fetchVacationRequestById
      .addCase(fetchVacationRequestById.fulfilled, (state, action) => {
        state.vacationRequests = [action.payload];
        state.error = null;
      })
      // Handling the rejected state of fetchVacationRequestById
      .addCase(fetchVacationRequestById.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Handling the fulfilled state of createVacationRequest
      .addCase(createVacationRequest.fulfilled, (state, action) => {
        state.vacationRequests.push(action.payload);
        state.requestStatus = "Success";
        state.error = null;
      })
      // Handling the rejected state of createVacationRequest
      .addCase(createVacationRequest.rejected, (state, action) => {
        state.requestStatus = "Failed";
        state.error = action.payload;
      })
      // Handling the fulfilled state of updateVacationRequest
      .addCase(updateVacationRequest.fulfilled, (state, action) => {
        const { id, updatedData } = action.payload;
        const index = state.vacationRequests.findIndex(request => request.id === id);
        if (index !== -1) {
          state.vacationRequests[index] = { ...state.vacationRequests[index], ...updatedData };
        }
      })
      // Handling the rejected state of updateVacationRequest
      .addCase(updateVacationRequest.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Handling the fulfilled state of deleteVacationRequest
      .addCase(deleteVacationRequest.fulfilled, (state, action) => {
        state.vacationRequests = state.vacationRequests.filter(request => request.id !== action.payload);
      })
      // Handling the rejected state of deleteVacationRequest
      .addCase(deleteVacationRequest.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Exporting the reducer actions for use in components
export const { setStartDate, setEndDate } = vacationRequestSlice.actions;
// Exporting the reducer itself
export default vacationRequestSlice.reducer;
