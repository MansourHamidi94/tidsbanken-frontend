import { configureStore } from '@reduxjs/toolkit';
import vacationRequestReducer from './Slices/VacationRequestSlice';

export const store = configureStore({
    reducer: {
        vacationRequest: vacationRequestReducer
    }
});
