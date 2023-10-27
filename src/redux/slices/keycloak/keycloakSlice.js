import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as keycloakAPI from './keycloakAPI';

export const initializeApp = createAsyncThunk('keycloak/initialize', async (dispatch) => {
  const authenticated = await keycloakAPI.initializeKeycloak();
  if (authenticated) {
    return {
      authenticated: true,
      token: keycloakAPI.getKeycloakToken(),
    };
  } else {
    return { authenticated: false };
  }
});

export const loginUser = createAsyncThunk('keycloak/login', async () => {
  await keycloakAPI.login();
});

export const logoutUser = createAsyncThunk('keycloak/logout', async () => {
  await keycloakAPI.logout();
});

const keycloakSlice = createSlice({
  name: 'keycloak',
  initialState: {
    authenticated: false,
    token: null,
    roles: [],
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    refreshToken: (state, action) => {
      state.token = action.payload;
    },
    setRoles: (state, action) => {
    state.roles = action.payload;
    },
    logout: (state) => {
      state.authenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.authenticated = action.payload.authenticated;
        state.token = action.payload.token;
        state.roles = action.payload;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.authenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authenticated = false;
        state.token = null;
        state.roles = [];
      });
  },
});

export const { setRoles, logout, setAuthenticated, setToken, refreshToken } = keycloakSlice.actions;

export default keycloakSlice.reducer;