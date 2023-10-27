import { configureStore } from '@reduxjs/toolkit';
import keycloakReducer from './slices/keycloak/keycloakSlice';
import userReducer from './slices/user/userSlice';
import vacationRequestReducer from './slices/vacationRequest/vacationRequestSlice';
import commentsReducer from './slices/comment/commentSlice';
import ineligiblePeriodsReducer from './slices/ineligiblePeriod/ineligiblePeriodSlice';

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