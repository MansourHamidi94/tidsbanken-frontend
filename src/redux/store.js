import { configureStore } from '@reduxjs/toolkit';
//import userReducer from './slices/userSlice/userSlice';
import vacationRequestReducer from './slices/VacationRequestSlice';
import commentsReducer from './slices/commentsSlice';
import ineligiblePeriodsReducer from './slices/IneligiblePeriodsSlice';
//import authReducer from './slices/authSlice/authSlice';
//import useraReducer from './slices/userSlice';
import keycloakReducer from './slices/keycloakSlice/keycloakSlice';

const store = configureStore({
    reducer: {
        //user: userReducer,
        vacationRequest: vacationRequestReducer,
        comments: commentsReducer,
        ineligiblePeriods: ineligiblePeriodsReducer,
        //auth: authReducer,
        //usera: useraReducer,
        keycloak: keycloakReducer
    },
    devTools: true
});

export default store;
