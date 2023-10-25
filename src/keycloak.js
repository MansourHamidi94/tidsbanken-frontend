/*import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'https://keycloak-middleware.azurewebsites.net',
    realm: 'noroff',
    clientId: 'Tidsbanken-FrontEnd'
});

try {
    const authenticated = keycloak.init();
    console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
} catch (error) {
    console.error('Failed to initialize adapter:', error);
}*/

//export default keycloak;
/*
import Keycloak from "keycloak-js";

// NB! Leave the / or the relative path will use the Router path
const keycloak = new Keycloak("/keycloakConfig.json");

/**
 * Initialize Keycloak and silently checking for an existing login.
 * @description Should be called before render() of app.
 * @returns { Promise<void> } Promise
 
export const initialize = () => {
  const config = {
    checkLoginIframe: true,
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin,
  };
  return keycloak.init(config);
};

/** @type { Keycloak } keycloak 
export default keycloak;*/