import React, {useCallback, useEffect, useState} from 'react';
import LoginScreenStyle from './styles/LoginScreenStyle';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {
  GOOGLE_SIGN_IN_SCOPES,
  GOOGLE_WEB_CLIENT_ID,
} from '../redux/LoginConstants';
import {registerUserUsingGoogleSignIn} from '../redux/LoginAction';
import {connect} from 'react-redux';

const GoogleSigninNative = ({registerUserUsingGoogleSignIn}) => {
  const [disableSignIn, setDisableSingin] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [GOOGLE_SIGN_IN_SCOPES.EMAIL, GOOGLE_SIGN_IN_SCOPES.PROFILE],
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  const onLoginPressed = useCallback(async () => {
    try {
      setDisableSingin(true);
      const hasPlayService = await GoogleSignin.hasPlayServices();
      if (hasPlayService) {
        await GoogleSignin.signIn();
        const {idToken, accessToken} = await GoogleSignin.getTokens();
        registerUserUsingGoogleSignIn({idToken, accessToken});
      } else {
        // to show error
      }
      setDisableSingin(false);
    } catch (e) {
      // to show error
      setDisableSingin(false);
    }
  }, [registerUserUsingGoogleSignIn]);

  return (
    <GoogleSigninButton
      style={LoginScreenStyle.googleSignInButton}
      size={GoogleSigninButton?.Size?.Wide}
      color={GoogleSigninButton?.Color?.Dark}
      onPress={onLoginPressed}
      disabled={disableSignIn}
    />
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  registerUserUsingGoogleSignIn,
};
export default connect(mapStateToProps, mapDispatchToProps)(GoogleSigninNative);
