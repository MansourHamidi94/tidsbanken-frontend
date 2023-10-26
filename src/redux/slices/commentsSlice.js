import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let API_URL = 'https://localhost:7172/api/v1/VacationRequests/1/Comments';
let BASE_API_URL = 'https://localhost:7172/api/v1/VacationRequests';


export const fetchCommentsByRequestId = createAsyncThunk(
  'comments/fetchByRequestId',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_API_URL}/${requestId}/Comments`, {
        method: 'GET',
        mode: 'cors',
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
      try {
          const response = await fetch(`${BASE_API_URL}/${requestId}/Comments`, { // Adjusted the URL
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(comment) // Passing the comment object directly as it matches the expected API body
          });

          if (!response.ok) {
              const error = await response.json();
              return thunkAPI.rejectWithValue(error);
          }

          const data = await response.json();
          return data;

      } catch (error) {
          // Handle network error (if the server does not respond)
          return thunkAPI.rejectWithValue('Network error');
      }
  }
);



export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsByRequestId: {},  
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
        state.commentsByRequestId[action.payload.requestId] = action.payload.comments;
      })
      .addCase(fetchCommentsByRequestId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCommentToApi.fulfilled, (state, action) => {
        if (!state.commentsByRequestId[action.payload.requestId]) {
          state.commentsByRequestId[action.payload.requestId] = [];
        }
        state.commentsByRequestId[action.payload.requestId].push(action.payload.comment);
      });
  },
});


export const selectCommentsByRequestId = (state, requestId) => state.comments.commentsByRequestId[requestId] || [];

export default commentsSlice.reducer;
