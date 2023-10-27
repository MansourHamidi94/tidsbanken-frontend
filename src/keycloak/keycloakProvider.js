import React, { useEffect, useState, createContext } from 'react';
import Keycloak from 'keycloak-js';
import keycloakConfig from './keycloakConfigJS';


export const keycloakContext = createContext(null);

export const KeycloakProvider = ({ children }) => {
  const [keycloak, setKeycloak] = useState(null);

  useEffect(() => {
    const kc = new Keycloak(keycloakConfig);
    kc.init({ onLoad: 'login-required', checkLoginIframe: false }).then(() => {
      setKeycloak(kc);
    });
  }, []);

  return (
    <keycloakContext.Provider value={keycloak}>
      {children}
    </keycloakContext.Provider>
  );
};