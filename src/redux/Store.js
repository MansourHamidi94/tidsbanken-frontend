import { configureStore } from '@reduxjs/toolkit';
<<<<<<< Updated upstream
import vacationRequestReducer from './Slices/VacationRequestSlice';

export const store = configureStore({
    reducer: {
        vacationRequest: vacationRequestReducer
    }
});
=======
import userReducer from './slices/userSlice';
import vacationRequestReducer from './Slices/VacationRequestSlice';
import commentsReducer from './slices/commentsSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        vacationRequest: vacationRequestReducer,
        comments: commentsReducer


    },
    devTools: true    
});

export default store;
>>>>>>> Stashed changes
