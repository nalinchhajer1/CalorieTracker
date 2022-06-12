import {all} from 'redux-saga/effects';
import CalorieTrackerSaga from '../redux/CalorieTrackerSaga';
import loginSaga from '../../auth/redux/LoginSaga';
import adminSaga from '../../admin/redux/AdminSaga';

export default function* IndexSaga() {
  yield all([CalorieTrackerSaga(), loginSaga(), adminSaga()]);
}
