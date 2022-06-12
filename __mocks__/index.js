import './react-native-firebase-mock';

// https://reactnavigation.org/docs/testing/
import 'react-native-gesture-handler/jestSetup';

global.WebSocket = function WebSocket() {};

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-community/google-signin', () => {
  return {
    GoogleSignin: {
      configure: jest.fn(),
    },
    statusCodes: jest.fn(),
    GoogleSigninButton: jest.requireActual(
      '@react-native-community/google-signin',
    ).GoogleSigninButton,
  };
});
