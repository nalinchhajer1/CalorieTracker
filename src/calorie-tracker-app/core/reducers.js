import {combineReducers} from 'redux';
import calorieTrackerReducer from '../redux/CalorieTrackerReducer';

const rootReducer = combineReducers({
  calorieTrackerState: calorieTrackerReducer,
});

export default rootReducer;
