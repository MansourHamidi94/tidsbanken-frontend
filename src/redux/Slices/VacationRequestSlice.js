<<<<<<< Updated upstream
// vacationRequestSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


//POST Vacation Request Start date & end date
=======
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
>>>>>>> Stashed changes
export const createVacationRequest = createAsyncThunk(
  'vacationRequest/createVacationRequest',
  async (requestData, { rejectWithValue }) => {
    try {
<<<<<<< Updated upstream
      const response = await fetch('https://localhost:7172/api/v1/VacationRequests', {
=======
      const response = await fetch(`${API_URL}`, {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        return rejectWithValue(data); // Handle error cases
      }

      const data = await response.json();
      return data; // Return the created vacation request data
=======
        return rejectWithValue(data);
      }

      const data = await response.json();
      return data;
>>>>>>> Stashed changes
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

<<<<<<< Updated upstream
//Slice for vacation request
=======

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






>>>>>>> Stashed changes
const vacationRequestSlice = createSlice({
    name: 'vacationRequest',
    initialState: {
      startDate: null,
<<<<<<< Updated upstream
      endDate: null,
=======
  endDate: null,
  requestStatus: null,
  vacationRequests: [],
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
    

      builder.addCase(fetchVacationRequestById.fulfilled, (state, action) => {
        state.vacationRequests = [action.payload];  // Store the single fetched vacation request in an array
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
>>>>>>> Stashed changes
