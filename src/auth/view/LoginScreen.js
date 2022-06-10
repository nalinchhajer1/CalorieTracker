import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import LoginScreenStyle from './styles/LoginScreenStyle';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {connect} from 'react-redux';
import {
  onLoginScreenLaunchGoogleLoginConfiguration,
  onPressGoogleLogin,
} from '../redux/LoginAction';

const appJson = require('../../../app.json');

const LoginScreen = props => {
  const {onPressGoogleLogin, onLoginScreenLaunchGoogleLoginConfiguration} =
    props;

  useEffect(() => {
    onLoginScreenLaunchGoogleLoginConfiguration();
  }, [onLoginScreenLaunchGoogleLoginConfiguration]);

  return (
    <View style={LoginScreenStyle.container}>
      <Text style={LoginScreenStyle.appText}>{appJson.expo.name}</Text>
      <GoogleSigninButton
        style={LoginScreenStyle.googleSignInButton}
        size={GoogleSigninButton?.Size?.Wide}
        color={GoogleSigninButton?.Color?.Dark}
        onPress={onPressGoogleLogin}
      />
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  onLoginScreenLaunchGoogleLoginConfiguration,
  onPressGoogleLogin,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
