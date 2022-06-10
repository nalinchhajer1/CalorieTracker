import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import IndexSaga from './sagas';
import Reactotron, {sagaMonitor} from '../../../ReactotronConfig';

const sagaMiddleware = createSagaMiddleware({sagaMonitor});
const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), Reactotron.createEnhancer()),
);

sagaMiddleware.run(IndexSaga);
export default store;
