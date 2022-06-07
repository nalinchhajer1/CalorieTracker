import {TYPE_CALORIE_TRACKER} from './CalorieTrackerTypes';

const initialState = {
  appInitialized: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE_CALORIE_TRACKER.APP_INITIALIZED:
      return {
        ...state,
        appInitialized: true,
      };
    default:
      return state;
  }
};
