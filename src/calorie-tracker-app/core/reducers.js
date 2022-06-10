import {combineReducers} from 'redux';
import calorieTrackerReducer from '../redux/CalorieTrackerReducer';
import loginReducer from '../../auth/redux/LoginReducer';

const rootReducer = combineReducers({
  loginState: loginReducer,
  calorieTrackerState: calorieTrackerReducer,
});

export default rootReducer;
