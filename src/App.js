// import logo from './logo.svg';
import './App.css';
import ControlPanel from "./components/controlPanel/ControlPanel.jsx"
import Calendar from "./components/calendar/Calendar"
import Profile from './components/profile/Profile';
import Admin from "./components/admin/Admin";
import VacationRequest from './components/vacationRequest/VacationRequest';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useContext, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated, setToken, refreshToken, logout } from './redux/slices/keycloakSlice/keycloakSlice';
import { KeycloakContext } from './keycloak/keycloakContext';


function App() {
  const keycloak = useContext(KeycloakContext); // Use the Keycloak context
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.keycloak.authenticated);

  const handleLogin = useCallback(() => {
    keycloak.login();
  }, [keycloak]);

  const handleLogout = useCallback(() => {
    keycloak.logout();
    dispatch(logout());
  }, [keycloak, dispatch]);

  useEffect(() => {
    if (keycloak) {
      if (keycloak.authenticated) {
        dispatch(setAuthenticated(true));
        dispatch(setToken(keycloak.token));

        // Handle token refresh
        setInterval(() => {
          keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
              dispatch(refreshToken(keycloak.token));
            }
          }).catch(() => {
            dispatch(logout());
          });
        }, 60000); // Check every minute
      } else {
        dispatch(setAuthenticated(false));
      }
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