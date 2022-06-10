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
