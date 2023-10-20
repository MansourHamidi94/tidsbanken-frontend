import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCommentsByRequestId = createAsyncThunk(
  'comments/fetchByRequestId',
  async (requestId) => {
    const response = await fetch(`https://localhost:7172/api/v1/VacationRequests/1/Comments`);
    const data = await response.json();
    return { requestId, comments: data };
  }
);

export const addCommentToApi = createAsyncThunk(
  'comments/addComment',
  async ({ requestId, comment }, thunkAPI) => {
      const response = await fetch(`https://localhost:7172/api/v1/VacationRequests/1/Comments`, {
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


export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsByRequestId: {},  
    status: 'pending',          
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
