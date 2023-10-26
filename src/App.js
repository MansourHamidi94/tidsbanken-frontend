import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import useKeycloak from './keycloak/keycloakUse';
import AppRoutes from './routes/appRoutes';

function App() {
  const { handleLogin, handleLogout } = useKeycloak();
  const isAuthenticated = useSelector((state) => state.keycloak.authenticated);

  return (
    <div className="App">
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      <AppRoutes/>
    </div>
  );
}

export default App;