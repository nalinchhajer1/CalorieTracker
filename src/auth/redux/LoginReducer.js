import {TYPE_LOGIN} from './LoginType';

const initialState = {
  userState: null,
  loggedInUserId: null,
  user_name: null,
  user_email: null,
  user_moderator: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE_LOGIN.CHANGE_LOGIN_STATE:
      return {
        ...state,
        userState: action.payload,
      };
    case TYPE_LOGIN.SET_LOGGED_IN_USER_ID:
      return {
        ...state,
        loggedInUserId: action.payload,
      };
    case TYPE_LOGIN.UPDATE_USER_DATA:
      return {
        ...state,
        user_name: action.payload.user_name,
        user_email: action.payload.user_email,
        user_moderator: action.payload.user_moderator,
      };
    case TYPE_LOGIN.ON_LOGOUT_REQUEST:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
