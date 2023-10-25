import keycloak from '../../../keycloak';

// User Login
export const loginUser = async () => {
  const token = await keycloak.login();
  if (token) {
    return { token };
  }
  throw new Error('Failed to retrieve token from Keycloak.');
};

// User Logout
export const logoutUser = () => {
  keycloak.logout();
};

// Token Refresh
export const refreshToken = async (minValidity) => {
  try {
    await keycloak.updateToken(minValidity);
    return keycloak.token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};