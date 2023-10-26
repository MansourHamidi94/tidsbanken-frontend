import { useContext, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { keycloakContext } from '../keycloak/keycloakProvider';
import { setAuthenticated, setToken, refreshToken, loginUser, logoutUser } from '../redux/slices/keycloak/keycloakSlice';
import { postUser, userExists } from '../redux/slices/user/userSlice';

const useKeycloak = () => {
  const keycloak = useContext(keycloakContext);
  const dispatch = useDispatch();

  const handleLogin = useCallback(() => {
    keycloak.login();
    dispatch(loginUser());
  }, [keycloak, dispatch]);

  const handleLogout = useCallback(() => {
    keycloak.logout();
    dispatch(logoutUser());
  }, [keycloak, dispatch]);

  useEffect(() => {
    if (keycloak) {
      const checkAuthentication = async () => {
    if (keycloak.authenticated) {
      dispatch(setToken(keycloak.token));
      try {
        const resultAction = await dispatch(userExists());
        if (userExists.fulfilled.match(resultAction)) {
          dispatch(setAuthenticated(true));
        } else if (userExists.rejected.match(resultAction)) {
          const createUserAction = await dispatch(postUser());
          if (postUser.fulfilled.match(createUserAction)) {
            dispatch(setAuthenticated(true));
          } else if (postUser.rejected.match(createUserAction)) {
            keycloak.logout();
            dispatch(setAuthenticated(false));
          }
        }
      } catch (error) {
        keycloak.logout();
        dispatch(setAuthenticated(false));
      }

      const intervalId = setInterval(() => {
        keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) {
            dispatch(refreshToken(keycloak.token));
          }
        }).catch(() => {
          dispatch(logoutUser());
        });
      }, 60000);

      return () => clearInterval(intervalId);
    } else {
      dispatch(setAuthenticated(false));
    }
  };
  checkAuthentication();
}
  }, [dispatch, keycloak]);

  return { keycloak, handleLogin, handleLogout };
};

export default useKeycloak;