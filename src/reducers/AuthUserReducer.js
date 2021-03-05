/**
 * Auth User Reducers
 */
import { NotificationManager } from 'react-notifications';
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    USER_TYPE_SUCCESS,
    LOGOUT_USER,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS
} from 'Actions/types';

// import create

/**
 * initial auth user
 */

const INIT_STATE = {
    user: JSON.parse(localStorage.getItem('userData')),
    token: JSON.parse(localStorage.getItem('token')),
    userType: null,
    loading: false
};

const LoginReducerAim = (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOGIN_USER:
            return { ...state, loading: true };

        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload.user, token: action.payload.token, userType: action.payload.userType, hassucceeded: action.payload.hassucceeded };

        case USER_TYPE_SUCCESS:
            return { ...state, userType: action.payload.userType }

        case LOGIN_USER_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false, hassucceeded: action.payload.hassucceeded, message: action.payload.message };

        case LOGOUT_USER:
            return { ...state };

        case LOGOUT_USER_SUCCESS:
            NotificationManager.success('User Logged Out');
            return { ...state, user: null, token: null };

        case LOGOUT_USER_FAILURE:
            return { ...state };

        case SIGNUP_USER:
            return { ...state, loading: true };

        case SIGNUP_USER_SUCCESS:
            NotificationManager.success('Account Created');
            return { ...state, loading: false, user: action.payload.uid };

        case SIGNUP_USER_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false };

        case FORGOT_PASSWORD:
            return { ...state, loading: true };
            
        case FORGOT_PASSWORD_FAILURE:
            NotificationManager.error(action.payload);
            return { ...state, loading: false };

        case FORGOT_PASSWORD_SUCCESS:
            NotificationManager.success('Email Sent succefully');
            return { ...state, loading: false };


        default: return { ...state };
    }
}
export default LoginReducerAim
