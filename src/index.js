import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
//import { initialize } from './keycloak';
import { KeycloakProvider } from './keycloak/keycloakProvider';
import store  from './redux/store';
import { Provider } from 'react-redux'; // Import Redux Provider
//import { userExists } from './redux/slices/userSlice/userSlice';

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const root = createRoot(document.getElementById('root'));
root.render(
  <KeycloakProvider>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </KeycloakProvider>
);