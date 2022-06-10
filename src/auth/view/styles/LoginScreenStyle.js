import {StyleSheet} from 'react-native';

const LoginScreenStyle = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  appText: {
    fontSize: 32,
    padding: 20,
  },
  googleSignInButton: {
    marginTop: 40,
    width: 192,
    height: 48,
  },
};
export default StyleSheet.create(LoginScreenStyle);
