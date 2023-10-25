import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  token: null,
  userDetails: null,
};

const keycloakSlice = createSlice({
  name: 'keycloak',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    refreshToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.authenticated = false;
      state.token = null;
      state.userDetails = null;
    }
}
});

export const { logout, refreshToken, setAuthenticated, setToken, setUserDetails } = keycloakSlice.actions;
export default keycloakSlice.reducer;