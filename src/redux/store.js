import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import vacationRequestReducer from './slices/VacationRequestSlice';
import commentsReducer from './slices/commentsSlice';
import ineligiblePeriodsReducer from './slices/IneligiblePeriodsSlice';  



const store = configureStore({
    reducer: {
        user: userReducer,
        vacationRequest: vacationRequestReducer,
        comments: commentsReducer,
        ineligiblePeriods: ineligiblePeriodsReducer

        
    },
    devTools: true    
});

export default store;
