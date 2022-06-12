import {ADMIN_TYPE} from './AdminType';
import {TYPE_LOGIN} from '../../auth/redux/LoginType';

const initialState = {
  chartData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_TYPE.UPDATE_ANALYTICS_DATA:
      return {
        ...state,
        chartData: action.payload,
      };
    case TYPE_LOGIN.ON_LOGOUT_REQUEST:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
