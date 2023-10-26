import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentAPI from './commentAPI'; // Importing API functions

// Async thunk to fetch comments by request id
export const fetchCommentsByRequestId = createAsyncThunk(
  'comments/fetchByRequestId',
  async (requestId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.keycloak.token;
    try {
      const comments = await commentAPI.getComment(requestId, token); // API call to get comments
      return { requestId, comments };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch comments');
    }
  }
);

// Async thunk to add a comment
export const addCommentToApi = createAsyncThunk(
  'comments/addComment',
  async ({ requestId, comment }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.keycloak.token;
    try {
      const data = await commentAPI.postComment(requestId, comment, token); // API call to post a comment
      return { requestId, comment: data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to add comment');
    }
  }
);

// Async thunk to update a comment
export const updateCommentInApi = createAsyncThunk(
  'comments/updateComment',
  async ({ requestId, commentId, updatedComment }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.keycloak.token;
    try {
      const data = await commentAPI.putComment(commentId, updatedComment, token); // API call to update a comment
      return { requestId, commentId, updatedComment: data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to update comment');
    }
  }
);

// Async thunk to delete a comment
export const deleteCommentFromApi = createAsyncThunk(
  'comments/deleteComment',
  async ({ requestId, commentId }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.keycloak.token;
    try {
      await commentAPI.deleteComment(commentId, token); // API call to delete a comment
      return { requestId, commentId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to delete comment');
    }
  }
);

// Comments slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsByRequestId: {},
    status: 'idle',
    error: null
  },
  reducers: {},
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
      })
      .addCase(updateCommentInApi.fulfilled, (state, action) => {
        const { requestId, commentId, updatedComment } = action.payload;
        if (!state.commentsByRequestId[requestId]) {
          state.commentsByRequestId[requestId] = [];
        }
        const commentIndex = state.commentsByRequestId[requestId].findIndex(c => c.id === commentId);
        if (commentIndex !== -1) {
          state.commentsByRequestId[requestId][commentIndex] = updatedComment;
        }
      })
      .addCase(deleteCommentFromApi.fulfilled, (state, action) => {
        const { requestId, commentId } = action.payload;
        if (!state.commentsByRequestId[requestId]) {
          state.commentsByRequestId[requestId] = [];
        }
        state.commentsByRequestId[requestId] = state.commentsByRequestId[requestId].filter(c => c.id !== commentId);
      });
  },
});

export const selectCommentsByRequestId = (state, requestId) => state.comments.commentsByRequestId[requestId] || [];
export default commentsSlice.reducer;
