import {TYPE_CALORIE_TRACKER} from './CalorieTrackerTypes';

const initialState = {
  appInitialized: false,
  calorieList: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE_CALORIE_TRACKER.APP_INITIALIZED:
      return {
        ...state,
        appInitialized: true,
      };
    case TYPE_CALORIE_TRACKER.UPDATE_CALORIE_BURNOUT_VALUE:
      return {
        ...state,
        calorieList: action.result,
      };
    default:
      return state;
  }
};
