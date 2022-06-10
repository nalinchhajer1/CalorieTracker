import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const reactotron = Reactotron.configure() // controls connection & communication settings
  .use(sagaPlugin())
  .use(reactotronRedux())
  .useReactNative({
    asyncStorage: false,
  }) // add all built-in react native plugins
  .connect(); // let's connect!

export const sagaMonitor = Reactotron.createSagaMonitor();

export default reactotron;
