const Parse = require('parse/react-native.js');
import AsyncStorage from '@react-native-async-storage/async-storage';
Parse.setAsyncStorage(AsyncStorage);

export default Parse;
