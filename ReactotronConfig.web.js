import Reactotron from 'reactotron-react-js';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const reactotron = Reactotron.configure() // controls connection & communication settings
  .use(sagaPlugin())
  .use(reactotronRedux())
  .connect(); // let's connect!

export const sagaMonitor = Reactotron.createSagaMonitor();

export default reactotron;
