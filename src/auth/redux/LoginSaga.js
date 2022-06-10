import {all, takeLatest, call, fork, put} from 'redux-saga/effects';
import {TYPE_LOGIN} from './LoginType';
import {
  GOOGLE_SIGN_IN_SCOPES,
  GOOGLE_WEB_CLIENT_ID,
  LOGIN_TYPE,
} from './LoginConstants';
import {GoogleSignin} from '@react-native-community/google-signin';
import {changeLoginState} from './LoginAction';
import auth from '@react-native-firebase/auth';
import {NativeModules} from 'react-native';

function* onGoogleSignInConfiguration() {
  GoogleSignin.configure({
    scopes: [GOOGLE_SIGN_IN_SCOPES.EMAIL, GOOGLE_SIGN_IN_SCOPES.PROFILE],
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });
}

function* onGoogleLoginPressed() {
  try {
    yield call(GoogleSignin.hasPlayServices);
    const userInfo = yield call(GoogleSignin.signIn);
    const token = yield GoogleSignin.getTokens();
    const result = yield call(
      performGoogleLogin,
      userInfo,
      token.idToken,
      token.accessToken,
    );
    if (result) {
      yield put(changeLoginState(LOGIN_TYPE.USER_LOGGED_IN, result));
    }
  } catch (e) {}
}

function* performGoogleLogin(userInfo, idToken, accessToken) {
  try {
    // const {idToken, accessToken} = yield GoogleSignin.getTokens();
    const googleCredential = auth.GoogleAuthProvider.credential(
      idToken,
      accessToken,
    );
    const {providerId, token, secret} = googleCredential;

    const RNFBAuthModule = NativeModules.RNFBAuthModule;
    const result = yield call(
      RNFBAuthModule.signInWithCredential,
      '[DEFAULT]',
      providerId,
      token,
      secret,
    );
    return result;
  } catch (e) {
    return null;
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
