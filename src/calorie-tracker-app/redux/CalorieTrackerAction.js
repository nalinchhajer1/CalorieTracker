import {TYPE_CALORIE_TRACKER} from './CalorieTrackerTypes';

export const appInitialized = () => {
  return {
    type: TYPE_CALORIE_TRACKER.APP_INITIALIZED,
  };
};
