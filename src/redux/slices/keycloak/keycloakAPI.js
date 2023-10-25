import Keycloak from 'keycloak-js';
import keycloakConfig from '../../../keycloak/keycloakConfigJS'; // Adjust the path accordingly

// Initialize the Keycloak instance
const keycloak = new Keycloak(keycloakConfig);

export const initializeKeycloak = async () => {
  try {
    const authenticated = await keycloak.init({ onLoad: 'login-required' });
    if (authenticated) {
      // Handle token refresh
      setInterval(() => {
        keycloak.updateToken(70).catch(() => {
          // Handle the logout or token refresh failure here
        });
      }, 60000); // Check every minute
    }
    return authenticated;
  } catch (error) {
    console.error("Error initializing Keycloak", error);
    return false;
  }
};

export const login = async () => {
  try {
    await keycloak.login();
  } catch (error) {
    console.error("Error logging in", error);
  }
};

export const logout = async () => {
  try {
    await keycloak.logout();
  } catch (error) {
    console.error("Error logging out", error);
  }
};

export const getKeycloakToken = () => {
  return keycloak.token;
};