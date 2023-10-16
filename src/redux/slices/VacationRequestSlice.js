// vacationRequestSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


//POST Vacation Request Start date & end date
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
        return rejectWithValue(data); // Handle error cases
      }

      const data = await response.json();
      return data; // Return the created vacation request data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Slice for vacation request
const vacationRequestSlice = createSlice({
    name: 'vacationRequest',
    initialState: {
      startDate: null,
      endDate: null,
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
        console.log("Succes POST");
      });
      builder.addCase(createVacationRequest.rejected, (state, action) => {
        console.log("Fail POST");
      });
    },
  });
  

export const { setStartDate, setEndDate } = vacationRequestSlice.actions;
export default vacationRequestSlice.reducer;