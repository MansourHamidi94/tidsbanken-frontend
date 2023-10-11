// Action Types
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCES = 'REGISTER_USER_SUCCES';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';


// Action Creators
export const registerUserRequest = () => ({
    type: REGISTER_USER_REQUEST,
});

export const registerUserSucces = (userData) => ({
    type: REGISTER_USER_SUCCES,
    payload: userData,
});

export const registerUserFailure = (error) => ({
    type: REGISTER_USER_FAILURE,
    payload: error,
});