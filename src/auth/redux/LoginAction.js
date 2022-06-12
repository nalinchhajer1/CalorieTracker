import {TYPE_LOGIN} from './LoginType';

export const onLoginScreenLaunchGoogleLoginConfiguration = () => {
  return {
    type: TYPE_LOGIN.ON_GOOGLE_LOGIN_CONFIGURATION,
  };
};

export const onPressGoogleLogin = payload => {
  return {
    type: TYPE_LOGIN.ON_GOOGLE_LOGIN_PRESS,
    payload: payload,
  };
};

export const changeLoginState = payload => {
  return {
    type: TYPE_LOGIN.CHANGE_LOGIN_STATE,
    payload: payload,
  };
};

export const setLoggedInUserId = payload => {
  return {
    type: TYPE_LOGIN.SET_LOGGED_IN_USER_ID,
    payload: payload,
  };
};

export const updateUserDetail = data => {
  return {
    type: TYPE_LOGIN.UPDATE_USER_DATA,
    payload: data,
  };
};

export const onLogoutRequest = () => {
  return {
    type: TYPE_LOGIN.ON_LOGOUT_REQUEST,
  };
};
