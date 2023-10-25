import { configureStore } from '@reduxjs/toolkit';
import keycloakReducer from './slices/keycloak/keycloakSlice';
import userReducer from './slices/user/userSlice';
import vacationRequestReducer from './slices/vacationRequest/VacationRequestSlice';
import commentsReducer from './slices/comment/commentsSlice';
import ineligiblePeriodsReducer from './slices/ineligiblePeriod/IneligiblePeriodsSlice';

const store = configureStore({
    reducer: {
        keycloak: keycloakReducer,
        user: userReducer,
        vacationRequest: vacationRequestReducer,
        comments: commentsReducer,
        ineligiblePeriods: ineligiblePeriodsReducer,
    },
    devTools: true
});

export default store;