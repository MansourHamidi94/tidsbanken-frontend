import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import vacationRequestReducer from './slices/VacationRequestSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        vacationRequest: vacationRequestReducer

    },
    devTools: true    
});

export default store;
