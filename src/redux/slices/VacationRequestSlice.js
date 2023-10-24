import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let API_URL = 'https://localhost:7172/api/v1/VacationRequests';


//GET
//dispatch(fetchVacationRequestById(requestId));
export const fetchVacationRequestById = createAsyncThunk(
  'vacationRequest/fetchVacationRequestById',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/1`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
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





//POST
export const createVacationRequest = createAsyncThunk(
  'vacationRequest/createVacationRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}`, {
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


//PUT
export const updateVacationRequest = createAsyncThunk(
  'vacationRequest/updateVacationRequest',
  async ({ requestId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
        credentials: 'include',
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




//DELETE
export const deleteVacationRequest = createAsyncThunk(
  'vacationRequest/deleteVacationRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${requestId}`, {
        method: 'DELETE', 
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data);
      }

      return { success: true, message: 'Successfully deleted' };
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
  vacationRequests: [],
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
    

      builder.addCase(fetchVacationRequestById.fulfilled, (state, action) => {
        state.vacationRequests = [action.payload];  
      })
      .addCase(fetchVacationRequestById.rejected, (state, action) => {
        console.error('Failed to fetch vacation request:', action.error.message);
      })
      .addCase(createVacationRequest.fulfilled, (state, action) => {
        state.requestStatus = "Success";
      })
      .addCase(createVacationRequest.rejected, (state, action) => {
        state.requestStatus = "Failed";
      });
    },
});

export const { setStartDate, setEndDate } = vacationRequestSlice.actions;
export default vacationRequestSlice.reducer;
