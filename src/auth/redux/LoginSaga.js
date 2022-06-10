import {all, call, put, takeLatest} from 'redux-saga/effects';
import {TYPE_LOGIN} from './LoginType';
import {
  FIREBASE_CONSTANTS,
  GOOGLE_SIGN_IN_SCOPES,
  GOOGLE_WEB_CLIENT_ID,
  LOGIN_TYPE,
} from './LoginConstants';
import {GoogleSignin} from '@react-native-community/google-signin';
import {changeLoginState} from './LoginAction';
import auth from '@react-native-firebase/auth';
import reactotron from 'reactotron-react-native';
import firestore from '@react-native-firebase/firestore';

function* onGoogleSignInConfiguration() {
  GoogleSignin.configure({
    scopes: [GOOGLE_SIGN_IN_SCOPES.EMAIL, GOOGLE_SIGN_IN_SCOPES.PROFILE],
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });
}

function* onGoogleLoginPressed() {
  try {
    yield call(GoogleSignin.hasPlayServices);
    yield call(GoogleSignin.signIn);
    const result = yield call(performGoogleLogin);
    if (result) {
      yield call(onSigninSuccess, result);
      yield put(changeLoginState(LOGIN_TYPE.USER_LOGGED_IN, result));
    }
  } catch (e) {
    reactotron.log(e.toString());
  }
}

function* performGoogleLogin() {
  try {
    const {idToken, accessToken} = yield call(GoogleSignin.getTokens);
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
  } catch (e) {
    reactotron.log(e.toString());
  }
}

function* LoginSaga() {
  yield all([
    takeLatest(
      TYPE_LOGIN.ON_GOOGLE_LOGIN_CONFIGURATION,
      onGoogleSignInConfiguration,
    ),
    takeLatest(TYPE_LOGIN.ON_GOOGLE_LOGIN_PRESS, onGoogleLoginPressed),
  ]);
}

export default LoginSaga;
