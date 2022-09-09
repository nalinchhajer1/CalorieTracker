import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {TYPE_LOGIN} from './LoginType';
import {FIREBASE_CONSTANTS, isValidElement, LOGIN_TYPE} from './LoginConstants';
import {
  changeLoginState,
  setLoggedInUserId,
  updateUserDetail,
} from './LoginAction';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {userItemPayload} from '../../calorie-tracker-app/redux/CalorieTrackerConstants';
import reactotron from '../../../ReactotronConfig';

function* registerUserUsingGoogle(action) {
  try {
    const result = yield call(performGoogleLogin, action.payload);
    if (result) {
      yield call(onSigninSuccess, result);
      yield put(setLoggedInUserId(result.user.uid));
      yield put(changeLoginState(LOGIN_TYPE.USER_LOGGED_IN, result));
      yield fork(downloadUserDetails);
    }
  } catch (e) {
    reactotron.log(e.toString());
  }
}

function* performGoogleLogin(action) {
  try {
    const {idToken, accessToken} = action;
    const googleCredential = auth.GoogleAuthProvider.credential(
      idToken,
      accessToken,
    );

    return yield auth().signInWithCredential(googleCredential);
  } catch (e) {
    reactotron.log(e.toString());
    return null;
  }
}

function* onSigninSuccess(result) {
  try {
    const {user} = result;
    const {displayName, email, uid} = user;
    const usersCollection = firestore().collection(
      FIREBASE_CONSTANTS.USER_COLLECTION,
    );

    yield usersCollection
      .doc(uid)
      .set({name: displayName, email: email}, {merge: true});

    yield put(updateUserDetail(userItemPayload(displayName, email, null)));
  } catch (e) {
    reactotron.log(e.toString());
  }
}

export function* downloadUserDetails() {
  try {
    const loggedInUserId = yield select(
      state => state.loginState.loggedInUserId,
    );
    if (isValidElement(loggedInUserId)) {
      const userDetail = yield firestore()
        .collection(FIREBASE_CONSTANTS.USER_COLLECTION)
        .doc(loggedInUserId)
        .get();
      const data = userDetail.data();
      yield put(
        updateUserDetail(
          userItemPayload(data.name, data.email, data.moderator),
        ),
      );
    }
  } catch (e) {
    reactotron.log(e.toString());
  }
}

function* onLogoutRequestSaga() {
  try {
    yield auth().signOut();
  } catch (e) {
    reactotron.log(e.toString());
  }
}

function* LoginSaga() {
  yield all([
    takeLatest(TYPE_LOGIN.ON_GOOGLE_LOGIN_PRESS, registerUserUsingGoogle),
    takeLatest(TYPE_LOGIN.ON_LOGOUT_REQUEST, onLogoutRequestSaga),
  ]);
}

export default LoginSaga;
