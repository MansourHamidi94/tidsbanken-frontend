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

/*
const root = ReactDOM.createRoot(document.getElementById('root'));

// Initialize Keycloak
initialize()
  .then(() => { // If No Keycloak Error occurred - Display the App
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  })
  .catch(() => {
    root.render(
      <React.StrictMode>
        <p>Could Not Connect To Keycloak.</p>
      </React.StrictMode>
    );
  });


initialize({ onLoad: 'login-required' }).then(authenticated => {
  if (authenticated) {
    userExists()
      .then((userExists) => {
        if (userExists) {
          console.log('User exists in the database.');
          // Dispatch an action to set user existence status in the Redux store
          store.dispatch({ type: 'SET_USER_EXISTS', payload: userExists });
        } else {
          console.log('User does not exist in the database.');
          // Dispatch an action to set user existence status in the Redux store
          store.dispatch({ type: 'SET_USER_EXISTS', payload: userExists });
        }
      })
      .catch((error) => {
        console.error('Error checking user in the database:', error);
      })
      .finally(() => {
        // Render your main application within the Promise
        root.render(
          <React.StrictMode>
            <Provider store={store}>
              <App />
            </Provider>
          </React.StrictMode>
        );
      });
  } else {
    console.log('User is not authenticated.');
    window.location.reload();
  }
}).catch(() => {
  window.location.reload();
});*/