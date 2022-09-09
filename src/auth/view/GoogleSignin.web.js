import React from 'react';
import GoogleLogin from 'react-google-login';
import {GOOGLE_WEB_CLIENT_ID, isValidElement} from '../redux/LoginConstants';
import {useCallback} from 'react';
import {registerUserUsingGoogleSignIn} from '../redux/LoginAction';
import {connect} from 'react-redux';

const GoogleSignin = ({registerUserUsingGoogleSignIn}) => {
  const responseGoogle = useCallback(
    response => {
      console.log({response});
      if (isValidElement(response) && isValidElement(response.profileObj)) {
        let payload = {
          email: response.profileObj.email,
          idToken: response.profileObj.googleId,
          accessToken: response.profileObj.accessToken,
        };
        registerUserUsingGoogleSignIn(payload);
      }
    },
    [registerUserUsingGoogleSignIn],
  );

  return (
    <GoogleLogin
      clientId={GOOGLE_WEB_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  registerUserUsingGoogleSignIn,
};
export default connect(mapStateToProps, mapDispatchToProps)(GoogleSignin);
