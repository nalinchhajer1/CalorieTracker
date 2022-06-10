import {TYPE_LOGIN} from './LoginType';

const initialState = {
  userState: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE_LOGIN.CHANGE_LOGIN_STATE:
      return {
        ...state,
        userState: action.payload,
      };
    default:
      return state;
  }
};
