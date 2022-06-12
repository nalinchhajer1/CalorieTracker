import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
  fork,
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
  userItemPayload,
} from './CalorieTrackerConstants';
import {
  autoCompleteInitializeCompleted,
  deleteFoodItemCompleted,
  initializeAutoComplete,
  setAutocompleteFoodItems,
  updateCalorieBurnoutValue,
} from './CalorieTrackerAction';
import {AutocompleteTrie} from '../utils/AutocompleteTrie';
import {updateUserDetail} from '../../auth/redux/LoginAction';

let autoCompleteTrie = null;

function* onAppInitialized() {
  yield fork(downloadUserDetails);
  yield put({type: TYPE_CALORIE_TRACKER.APP_INITIALIZED_COMPLETED});
  yield put(initializeAutoComplete());
}

function* onReceiveSnapshotUpdate(action) {
  const {data} = action;
}

function* downloadUserDetails() {
  const loggedInUserId = yield select(state => state.loginState.loggedInUserId);
  if (isValidElement(loggedInUserId)) {
    const userDetail = yield firestore()
      .collection(FIREBASE_CONSTANTS.USER_COLLECTION)
      .doc(loggedInUserId)
      .get();
    const data = userDetail.data();
    yield put(
      updateUserDetail(userItemPayload(data.name, data.email, data.moderator)),
    );
  }
}

function* addFoodItem(action) {
  try {
    const {date, calorie, name, user} = action.payload;
    if (
      !isValidElement(date) ||
      !isValidElement(calorie) ||
      !isValidElement(name)
    ) {
      throw 'Invalid argument';
    }

    yield firestore()
      .collection(FIREBASE_CONSTANTS.FOOD_COLLECTION)
      .add(action.payload);

    yield firestore()
      .collection(FIREBASE_CONSTANTS.ANALYTICS_COLLECTION)
      .doc(date)
      .set(
        {
          calorie: firestore.FieldValue.increment(calorie),
          count: firestore.FieldValue.increment(1),
          user: firestore.FieldValue.arrayUnion(user),
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

function* performOnDeleteClick(action) {
  try {
    const {data} = action;
    if (!isValidElement(data)) {
      throw 'Invalid delete request';
    }
    const {date, calorie} = data;
    yield put(deleteFoodItemCompleted(data));
    yield firestore().doc(data._path).delete();

    yield firestore()
      .collection(FIREBASE_CONSTANTS.ANALYTICS_COLLECTION)
      .doc(date)
      .set(
        {
          calorie: firestore.FieldValue.increment(-calorie),
          count: firestore.FieldValue.increment(-1),
        },
        {merge: true},
      );
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

function* setUpAutoComplete() {
  try {
    const nutritionData = require('../../../nutrition_trim.json');
    autoCompleteTrie = new AutocompleteTrie();
    autoCompleteTrie.setRoot(nutritionData);
    yield put(autoCompleteInitializeCompleted());
  } catch (e) {
    reactotron.log(e.toString());
  }
}

function* performAutoCompleteText(action) {
  try {
    const {text} = action;
    let result = [];
    if (isValidElement(text) && text.length > 2) {
      result = autoCompleteTrie.autoComplete(text);
    }
    yield put(setAutocompleteFoodItems(result));
  } catch (e) {
    reactotron.log(e.toString());
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
    takeLeading(
      TYPE_CALORIE_TRACKER.INITIALIZE_AUTO_COMPLETE,
      setUpAutoComplete,
    ),
    takeLatest(
      TYPE_CALORIE_TRACKER.PERFORM_AUTO_COMPLETE_TEXT,
      performAutoCompleteText,
    ),
    takeEvery(TYPE_CALORIE_TRACKER.ON_DELETE_CLICK, performOnDeleteClick),
    takeEvery(
      TYPE_CALORIE_TRACKER.ON_RECEIVED_SNAPSHOT_UPDATE,
      onReceiveSnapshotUpdate,
    ),
  ]);
}

export default CalorieTrackerSaga;
