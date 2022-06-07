import {all} from 'redux-saga/effects';
import CalorieTrackerSaga from '../redux/CalorieTrackerSaga';

export default function* IndexSaga() {
  yield all([CalorieTrackerSaga()]);
}
