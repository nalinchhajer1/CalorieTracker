import {TYPE_LOGIN} from './LoginType';

const initialState = {
  userState: null,
  loggedInUserId: null,
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
    default:
      return state;
  }
};
