/**
 * Auth Actions
 * Auth Action With Google, Facebook, Twitter and Github
 */
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    LOGIN_FACEBOOK_USER,
    LOGIN_GOOGLE_USER,
    LOGIN_TWITTER_USER,
    LOGIN_GITHUB_USER,
    LOGOUT_USER_FAILURE,
    USER_TYPE_SUCCESS,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD
} from './types';

/**
 * Redux Action To Sigin User With Firebase
 */
export const signinUserInFirebase = (user, history) => ({
    type: LOGIN_USER,
    payload: { user, history }
});

/** 
 * Redux Action Signin User Success
 */
export const signinUserSuccess = (user, token = null, userType, hassucceeded) => ({
    type: LOGIN_USER_SUCCESS,
    payload: { user: user, token: token, userType: userType, hassucceeded:hassucceeded }
});
 

/**
 * Redux Action for GET USER TYPE 
 */
export const userTypeSuccess = (user, userType) => ({
    type: USER_TYPE_SUCCESS,
    payload: { user: user, userType: userType }
});

/**
 * Redux Action To Signup User Success
 */
export const signUpUserInFirebaseSuccess = (user) => ({
    type: SIGNUP_USER_SUCCESS,
    payload: user
});

/**
 * Redux Action To Signup User Failure
 */
export const signUpUserInFirebaseFailure = (error) => ({
    type: SIGNUP_USER_FAILURE,
    payload: error
});

/**
 * Redux Action Signin User Failure
 */
export const signinUserFailure = (error) => ({
    type: LOGIN_USER_FAILURE,
    payload: error
})

/**
 * Redux Action To Signout User From  Firebase
 */
export const logoutUserFromFirebase = () => ({
    type: LOGOUT_USER
});

/**
 * Redux Action Signout User Success
 */
export const logoutUserFromFirebaseSuccess = () => ({
    type: LOGOUT_USER_SUCCESS
});
 
/**
 * Redux Action Signout User Failure
 */
export const logoutUserFromFirebaseFailure = () => ({
    type: LOGOUT_USER_FAILURE
});

/**
 * Redux Action To Signup User In Firebase
 */
export const signupUserInFirebase = (user, history) => ({
    type: SIGNUP_USER,
    payload: { user, history }
})

/**
 * Redux Action To Signin User In Firebase With Facebook
 */
export const signinUserWithFacebook = (history) => ({
    type: LOGIN_FACEBOOK_USER,
    payload: history
})

/**
 * Redux Action To Signin User In Firebase With Google
 */
export const signinUserWithGoogle = (history) => ({
    type: LOGIN_GOOGLE_USER,
    payload: history
})

/**
 * Redux Action To Signin User In Firebase With Github
 */
export const signinUserWithGithub = (history) => ({
    type: LOGIN_GITHUB_USER,
    payload: history
});

/**
 * Redux Action To Signin User In Firebase With Twitter
 */
export const signinUserWithTwitter = (history) => ({
    type: LOGIN_TWITTER_USER,
    payload: history
});

/**
 * Redux Action To Signin User In Firebase With Twitter
 */
export const forgotPassword = (email,callback) => ({
    type: FORGOT_PASSWORD,
    payload: {email: email},
    callback: callback
});

/**
 * Redux Action To Signin User In Firebase With Twitter
 */
export const forgotPasswordSuccess = (history,callback) => ({
    type: FORGOT_PASSWORD_SUCCESS,
  
});

/**
 * Redux Action To Signin User In Firebase With Twitter
 */
export const forgotPasswordFailure = (message) => ({
    type: FORGOT_PASSWORD_FAILURE,
    payload: message
});
