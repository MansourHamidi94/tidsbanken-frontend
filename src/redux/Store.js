import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import vacationRequestReducer from './slices/VacationRequestSlice';
import commentsReducer from './slices/userSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        vacationRequest: vacationRequestReducer,
        comments: commentsReducer


    },
    devTools: true    
});

export default store;