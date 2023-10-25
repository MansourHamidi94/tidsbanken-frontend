import './App.css';
import ControlPanel from "./components/controlPanel/ControlPanel.jsx"
import Calendar from "./components/calendar/Calendar"
import Profile from './components/profile/Profile';
import Admin from "./components/admin/Admin";
import VacationRequest from './components/vacationRequest/VacationRequest';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useContext, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated, setToken, refreshToken, logout, logoutUser, loginUser } from './redux/slices/keycloak/keycloakSlice';
import { keycloakContext } from './keycloak/keycloakProvider';
import { postUser, userExists } from './redux/slices/user/userSlice';

function App() {
  const keycloak = useContext(keycloakContext); // Use the Keycloak context
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.keycloak.authenticated);

  const handleLogin = useCallback(() => {
    keycloak.login();
    dispatch(loginUser())
  }, [keycloak, dispatch]);

  const handleLogout = useCallback(() => {
    keycloak.logout();
    dispatch(logoutUser());
  }, [keycloak, dispatch]);

  useEffect(() => {
  if (keycloak) {
    const checkAuthentication = async () => {
      if (keycloak.authenticated) {
        // Dispatch action to set the token in the Redux store
        dispatch(setToken(keycloak.token));

        // Check if the user exists in the database
        try {
          const resultAction = await dispatch(userExists());
          if (userExists.fulfilled.match(resultAction)) {
            console.log('User exists in the database.', resultAction.payload);
            // Dispatch action to set the authentication state in the Redux store
            dispatch(setAuthenticated(true));
          } else if (userExists.rejected.match(resultAction)) {
            console.log('User does not exist in the database. Attempting to create user...');
            const createUserAction = await dispatch(postUser());
            console.log('Create user action:', createUserAction);
            if (postUser.fulfilled.match(createUserAction)) {
              console.log('User created successfully:', createUserAction.payload);
              // Dispatch action to set the authentication state in the Redux store
              dispatch(setAuthenticated(true));
            } else if (postUser.rejected.match(createUserAction)) {
              console.error('Error creating user:', createUserAction.payload);
              // Log out from Keycloak and set authentication state to false
              keycloak.logout();
              dispatch(setAuthenticated(false));
            }
          }
        } catch (error) {
          console.error('Error checking user existence:', error);
          // Log out from Keycloak and set authentication state to false
          keycloak.logout();
          dispatch(setAuthenticated(false));
        }
        
        // Handle token refresh
        const intervalId = setInterval(() => {
          keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
              dispatch(refreshToken(keycloak.token));
            }
          }).catch(() => {
            dispatch(logout());
          });
        }, 60000); // Check every minute

        // Clear interval on cleanup
        return () => clearInterval(intervalId);
      } else {
        // Set authentication state to false if not authenticated with Keycloak
        dispatch(setAuthenticated(false));
      }
    }
    checkAuthentication();
  }
}, [dispatch, keycloak]);


  if (!keycloak) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Welcome to Keycloak-React-Redux App</h1>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ControlPanel />} />
          <Route path="/ControlPanel" element={<ControlPanel />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path='/vacation-request' element={<VacationRequest/>}/>
          <Route path="/Admin" element={<Admin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;