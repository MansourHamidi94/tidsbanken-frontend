import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import keycloakConfig from '../keycloakConfigJS';
import { KeycloakContext } from './keycloakContext'; // Path to your KeycloakContext file

export const KeycloakProvider = ({ children }) => {
  const [keycloak, setKeycloak] = useState(null);

  useEffect(() => {
    const kc = new Keycloak(keycloakConfig);
    kc.init({ onLoad: 'login-required', checkLoginIframe: false }).then(() => {
      setKeycloak(kc);
    });
  }, []);

  return (
    <KeycloakContext.Provider value={keycloak}>
      {children}
    </KeycloakContext.Provider>
  );
};