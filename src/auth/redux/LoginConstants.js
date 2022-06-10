export const GOOGLE_SIGN_IN_SCOPES = {
  EMAIL: 'https://www.googleapis.com/auth/userinfo.email',
  PROFILE: 'https://www.googleapis.com/auth/userinfo.profile',
};

export const GOOGLE_WEB_CLIENT_ID =
  '828973697751-98gie99qoh5ph565c4jglll1hha8sje7.apps.googleusercontent.com';

export const LOGIN_TYPE = {
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  ADMIN_LOGGED_IN: 'ADMIN_LOGGED_IN',
};

export const FIREBASE_CONSTANTS = {
  USER_COLLECTION: 'Users',
};

export function isUserLoggedIn(userState) {
  return (
    userState === LOGIN_TYPE.USER_LOGGED_IN ||
    userState === LOGIN_TYPE.ADMIN_LOGGED_IN
  );
}
