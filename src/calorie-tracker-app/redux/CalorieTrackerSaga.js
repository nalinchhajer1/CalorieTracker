import {
  all,
  put,
  takeLatest,
  select,
  takeEvery,
  takeLeading,
  call,
} from 'redux-saga/effects';
import {TYPE_CALORIE_TRACKER} from './CalorieTrackerTypes';
import firestore from '@react-native-firebase/firestore';
import {
  FIREBASE_CONSTANTS,
  isValidElement,
} from '../../auth/redux/LoginConstants';
import reactotron from 'reactotron-react-native';
import {
  convertDatesToUnixFormat,
  convertFirestoreObjectToFoodItemModal,
} from './CalorieTrackerConstants';
import {updateCalorieBurnoutValue} from './CalorieTrackerAction';

function* onAppInitialized() {
  yield put({type: TYPE_CALORIE_TRACKER.APP_INITIALIZED_COMPLETED});
}

function* addFoodItem(action) {
  try {
    const loggedInUserId = yield select(
      state => state.loginState.loggedInUserId,
    );
    const {date, name, calorie} = action;

    yield firestore().collection(FIREBASE_CONSTANTS.FOOD_COLLECTION).add({
      name,
      calorie,
      date: date,
      createdAt: firestore.FieldValue.serverTimestamp(),
      user: loggedInUserId,
    });

    yield firestore()
      .collection('analytics')
      .doc(loggedInUserId)
      .set(
        {
          ['calorie-' + date]: firestore.FieldValue.increment(calorie),
          ['count-' + date]: firestore.FieldValue.increment(1),
        },
        {merge: true},
      );
  } catch (e) {
    reactotron.log(e.toString());
  }
}

function* findCaloriesBurnoutForPeriod(action) {
  try {
    const result = yield call(getCalorieBurnOutForPeriodFromFirestore, action);
    reactotron.log('received result', result);
    const {start_date, end_date} = action;
    yield put(updateCalorieBurnoutValue(start_date, end_date, result));
  } catch (e) {
    reactotron.log(e.toString());
  }
}

function* getCalorieBurnOutForPeriodFromFirestore(action) {
  try {
    const {start_date, end_date} = action;
    const loggedInUserId = yield select(
      state => state.loginState.loggedInUserId,
    );

    const {start_time, end_time} = convertDatesToUnixFormat(
      start_date,
      end_date,
    );

    reactotron.log({start_time, end_time});

    if (
      isValidElement(start_time) &&
      isValidElement(end_time) &&
      isValidElement(loggedInUserId)
    ) {
      const result = yield firestore()
        .collection(FIREBASE_CONSTANTS.FOOD_COLLECTION)
        .where(FIREBASE_CONSTANTS.FIELD_USER, '==', loggedInUserId)
        .where(
          FIREBASE_CONSTANTS.FIELD_CREATED_AT,
          '>',
          firestore.Timestamp.fromMillis(start_time),
        )
        .where(
          FIREBASE_CONSTANTS.FIELD_CREATED_AT,
          '<',
          firestore.Timestamp.fromMillis(end_time),
        )
        .orderBy(FIREBASE_CONSTANTS.FIELD_CREATED_AT, 'desc')
        .get({source: 'cache'});

      return convertFirestoreObjectToFoodItemModal(result);
    } else {
      throw 'start time and end time was invalid';
    }
  } catch (e) {
    reactotron.log(e.toString());
    return null;
  }
}

function* CalorieTrackerSaga() {
  yield all([
    takeLeading(TYPE_CALORIE_TRACKER.APP_INITIALIZED, onAppInitialized),
    takeEvery(TYPE_CALORIE_TRACKER.ADD_NEW_FOOD_ITEM, addFoodItem),
    takeLatest(
      TYPE_CALORIE_TRACKER.FIND_CALORIE_BURNOUT,
      findCaloriesBurnoutForPeriod,
    ),
    takeEvery(
      TYPE_CALORIE_TRACKER.GET_CALORIE_BURNOUT_FROM_FIRESTORE,
      getCalorieBurnOutForPeriodFromFirestore,
    ),
  ]);
}

export default CalorieTrackerSaga;
