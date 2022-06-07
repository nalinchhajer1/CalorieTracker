import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import IndexSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
sagaMiddleware.run(IndexSaga);
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
export default store;
