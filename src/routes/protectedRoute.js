/*import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import keycloak from './keycloak';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const isAuthorized = (roles) => {
    if (keycloak && roles) {
      return roles.some(role => keycloak.realmAccess?.roles.includes(role));
    }
    return false;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthorized(roles) ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
*/