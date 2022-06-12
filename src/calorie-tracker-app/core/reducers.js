import {combineReducers} from 'redux';
import calorieTrackerReducer from '../redux/CalorieTrackerReducer';
import loginReducer from '../../auth/redux/LoginReducer';
import adminReducer from '../../admin/redux/AdminReducer';

const rootReducer = combineReducers({
  loginState: loginReducer,
  calorieTrackerState: calorieTrackerReducer,
  adminState: adminReducer,
});

export default rootReducer;
