import {TYPE_CALORIE_TRACKER} from './CalorieTrackerTypes';

export const appInitialized = () => {
  return {
    type: TYPE_CALORIE_TRACKER.APP_INITIALIZED,
  };
};

export const addNewFoodItem = (date, name, calorie) => {
  return {
    type: TYPE_CALORIE_TRACKER.ADD_NEW_FOOD_ITEM,
    date,
    name,
    calorie,
  };
};

export const findCalorieBurnout = (start_date, end_date) => {
  return {
    type: TYPE_CALORIE_TRACKER.FIND_CALORIE_BURNOUT,
    start_date,
    end_date,
  };
};

export const updateCalorieBurnoutValue = (start_date, end_date, result) => {
  return {
    type: TYPE_CALORIE_TRACKER.UPDATE_CALORIE_BURNOUT_VALUE,
    start_date,
    end_date,
    result,
  };
};

export const getCalorieBuronoutFromFirestore = action => {
  return {
    ...action,
    type: TYPE_CALORIE_TRACKER.GET_CALORIE_BURNOUT_FROM_FIRESTORE,
  };
};
