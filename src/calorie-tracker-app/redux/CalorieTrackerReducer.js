import {TYPE_CALORIE_TRACKER} from './CalorieTrackerTypes';
import {
  performLocalDeleteForFoodItem,
  performLocalUpdateForFoodItem,
} from './CalorieTrackerConstants';
import {TYPE_LOGIN} from '../../auth/redux/LoginType';

const initialState = {
  appInitialized: false,
  calorieList: null,
  autoCompleteResult: null,
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
    case TYPE_CALORIE_TRACKER.UPDATE_AUTO_COMPLETE_RESULT:
      return {
        ...state,
        autoCompleteResult: action.result,
      };
    case TYPE_CALORIE_TRACKER.ON_DELETE_SUCCESSFULL_ITEM:
      return {
        ...state,
        calorieList: performLocalDeleteForFoodItem(
          state.calorieList,
          action.data,
        ),
      };
    case TYPE_CALORIE_TRACKER.ON_UPDATE_SUCCESSFULL_ITEM:
      return {
        ...state,
        calorieList: performLocalUpdateForFoodItem(
          state.calorieList,
          action.data,
          action.newData,
        ),
      };
    case TYPE_LOGIN.ON_LOGOUT_REQUEST:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
