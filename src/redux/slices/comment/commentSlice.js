import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let API_URL = 'https://localhost:7172/api/v1/VacationRequests/1/Comments';


export const fetchCommentsByRequestId = createAsyncThunk(
  'comments/fetchByRequestId',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://localhost:7172/api/v1/VacationRequests/${requestId}/Comments`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data);
      }

      const data = await response.json();
      return { requestId, comments: data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCommentToApi = createAsyncThunk(
  'comments/addComment',
  async ({ requestId, comment }, thunkAPI) => {
      const response = await fetch(`${API_URL}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(comment)
      });

      if (response.ok) {
          const data = await response.json();
          return data;
      } else {
          const error = await response.json();
          return thunkAPI.rejectWithValue(error);
      }
  }
);

export const fetchAllCommentsForUser = createAsyncThunk(
  'comments/fetchAllCommentsForUser',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      // This assumes you have an endpoint to fetch all vacation requests for a user.
      const response = await fetch(`https://localhost:7172/api/v1/VacationRequests/user?id=7d94f7d7-da61-49a0-b0e3-8790b93168de`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data);
      }

      const vacationRequests = await response.json();

      // Now, for each vacation request, fetch its comments
      for (let request of vacationRequests) {
        dispatch(fetchCommentsByRequestId(request.id));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsByVacationRequestId: {},
    message: "", 
    error: null              
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByRequestId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommentsByRequestId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.commentsByVacationRequestId[action.payload.requestId] = action.payload.comments;
      })
      .addCase(fetchCommentsByRequestId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCommentToApi.fulfilled, (state, action) => {
        if (!state.commentsByVacationRequestId[action.payload.requestId]) {
          state.commentsByVacationRequestId[action.payload.requestId] = [];
        }
        state.commentsByVacationRequestId[action.payload.requestId].push(action.payload.comment);
      });
  },
});


export const selectCommentsByRequestId = (state, requestId) => state.comments.commentsByVacationRequestId[requestId] || [];

export default commentsSlice.reducer;