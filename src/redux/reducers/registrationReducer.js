import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
} from '../actions/userActions';

const initialState = {
    loading: false,
    user: null,
    error: null,
};

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            };
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default registrationReducer;
