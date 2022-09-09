import React from 'react';
import {Text, View} from 'react-native';
import LoginScreenStyle from './styles/LoginScreenStyle';
import {connect} from 'react-redux';
import GoogleSignin from './GoogleSignin';

const appJson = require('../../../app.json');

const LoginScreen = props => {
  return (
    <View style={LoginScreenStyle.container}>
      <Text style={LoginScreenStyle.appText}>{appJson.expo.name}</Text>
      <GoogleSignin />
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
