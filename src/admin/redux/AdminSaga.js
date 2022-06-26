import {all, put, takeLatest} from 'redux-saga/effects';
import {ADMIN_TYPE} from './AdminType';
import firestore from '@react-native-firebase/firestore';
import {FIREBASE_CONSTANTS} from '../../auth/redux/LoginConstants';
import {
  getAnalyticsDateQuery,
  getChartDataFromAnalyticsFirebase,
} from './AdminConstants';
import {updateAnalyticsData} from './AdminAction';
import reactotron from '../../../ReactotronConfig';

function* getAdminAnalyticsData() {
  try {
    const result = yield firestore()
      .collection(FIREBASE_CONSTANTS.ANALYTICS_COLLECTION)
      .get({source: 'server'});
    yield put(
      updateAnalyticsData(
        getChartDataFromAnalyticsFirebase(result, getAnalyticsDateQuery()),
      ),
    );
  } catch (e) {
    reactotron.log(e.toString());
  }
}

function* adminSaga() {
  yield all([
    takeLatest(ADMIN_TYPE.GET_ADMIN_ANALYTICS_DATA, getAdminAnalyticsData),
  ]);
}

export default adminSaga;
