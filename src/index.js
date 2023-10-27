import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { KeycloakProvider } from './keycloak/keycloakProvider';
import store  from './redux/store';
import { Provider } from 'react-redux'; 

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