import {ADMIN_TYPE} from './AdminType';

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
    default:
      return state;
  }
};
