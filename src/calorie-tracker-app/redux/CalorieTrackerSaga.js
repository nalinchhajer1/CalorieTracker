import {all, put, takeLatest} from 'redux-saga/effects';
import {TYPE_CALORIE_TRACKER} from './CalorieTrackerTypes';

function* onAppInitialized() {
  yield put({type: TYPE_CALORIE_TRACKER.APP_INITIALIZED_COMPLETED});
}

function* CalorieTrackerSaga() {
  yield all([
    takeLatest(TYPE_CALORIE_TRACKER.APP_INITIALIZED, onAppInitialized),
  ]);
}

export default CalorieTrackerSaga;
