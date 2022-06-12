import {TYPE_CALORIE_TRACKER} from './CalorieTrackerTypes';

export const appInitialized = () => {
  return {
    type: TYPE_CALORIE_TRACKER.APP_INITIALIZED,
  };
};

export const addNewFoodItem = payload => {
  return {
    type: TYPE_CALORIE_TRACKER.ADD_NEW_FOOD_ITEM,
    payload: payload,
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

export const initializeAutoComplete = () => {
  return {
    type: TYPE_CALORIE_TRACKER.INITIALIZE_AUTO_COMPLETE,
  };
};

export const autoCompleteInitializeCompleted = () => {
  return {
    type: TYPE_CALORIE_TRACKER.AUTO_COMPLETE_INITIALIZE_COMPLETED,
  };
};

export const autoCompleteFoodItems = text => {
  return {
    type: TYPE_CALORIE_TRACKER.PERFORM_AUTO_COMPLETE_TEXT,
    text,
  };
};

export const setAutocompleteFoodItems = result => {
  return {
    type: TYPE_CALORIE_TRACKER.UPDATE_AUTO_COMPLETE_RESULT,
    result,
  };
};

export const deleteFoodItem = data => {
  return {
    type: TYPE_CALORIE_TRACKER.ON_DELETE_CLICK,
    data,
  };
};

export const deleteFoodItemCompleted = data => {
  return {
    type: TYPE_CALORIE_TRACKER.ON_DELETE_SUCCESSFULL_ITEM,
    data,
  };
};

export const onReceiveSnapshotUpdate = data => {
  return {
    type: TYPE_CALORIE_TRACKER.ON_RECEIVED_SNAPSHOT_UPDATE,
    data,
  };
};

export const updateFoodItem = (data, name, calorie) => {
  return {
    type: TYPE_CALORIE_TRACKER.UPDATE_FOOD_ITEM,
    data,
    name,
    calorie,
  };
};

export const onUpdateFoodItemCompleted = (data, newData) => {
  return {
    type: TYPE_CALORIE_TRACKER.ON_UPDATE_SUCCESSFULL_ITEM,
    data,
    newData,
  };
};
