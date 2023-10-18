import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createVacationRequest = createAsyncThunk(
  'vacationRequest/createVacationRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://localhost:7172/api/v1/VacationRequests', {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        credentials: "include"
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const vacationRequestSlice = createSlice({
    name: 'vacationRequest',
    initialState: {
      startDate: null,
      endDate: null,
      requestStatus: null,
    },
    reducers: {
      setStartDate: (state, action) => {
        state.startDate = action.payload;
      },
      setEndDate: (state, action) => {
        state.endDate = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(createVacationRequest.fulfilled, (state, action) => {
        state.requestStatus = "Success";
      });
      builder.addCase(createVacationRequest.rejected, (state, action) => {
        state.requestStatus = "Failed";
      });
    },
});

export const { setStartDate, setEndDate } = vacationRequestSlice.actions;
export default vacationRequestSlice.reducer;
