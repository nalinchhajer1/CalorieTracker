import SagaTester from 'redux-saga-tester';
import {runSaga} from 'redux-saga';
import rootReducer from '../../src/calorie-tracker-app/core/reducers';
import IndexSaga from '../../src/calorie-tracker-app/core/sagas';

const UPDATE_STATE_TYPE = '@@UPDATE_TESTER_STATE';

const TestRunner = function ({initialState = {}}) {
  this.sagaTester = new SagaTester({
    reducers: updateReducer,
    initialState: {...updateStateOnInitialState(rootReducer, initialState)},
  });
  this.sagaTester.start(IndexSaga);

  let _runner = {};
  _runner = Object.assign(_runner, this.sagaTester);
  _runner.sagaTester = this.sagaTester;
  _runner.store = this.sagaTester.store;
  _runner.dispatch = function (...args) {
    return _runner.sagaTester.dispatch(...args);
  };
  _runner.waitFor = function (...args) {
    return _runner.sagaTester.waitFor(...args);
  };
  _runner.getState = function (...args) {
    return _runner.sagaTester.getState(...args);
  };
  _runner.getCalledActions = function (...args) {
    return _runner.sagaTester.getCalledActions(...args);
  };
  _runner.resetAction = function (...args) {
    _runner.sagaTester.calledActions = [];
    _runner.sagaTester.actionLookups = {};
  };
  _runner.getLatestCalledAction = function (...args) {
    return _runner.sagaTester.getLatestCalledAction(...args);
  };
  _runner.updateState = function (newState) {
    return _runner.dispatch({
      type: UPDATE_STATE_TYPE,
      payload: newState,
    });
  };
  _runner.runSaga = function (saga, ...args) {
    return runSaga(
      {
        dispatch: action => _runner.dispatch(action),
        getState: () => _runner.getState(),
      },
      saga,
      ...args,
    ).toPromise();
  };
  return _runner;
};

const updateReducer = (state, action) => {
  if (action.type === UPDATE_STATE_TYPE) {
    if (typeof action.payload === 'object') {
      return {...patchState(state, action.payload)};
    }
  }
  return rootReducer(state, action);
};

function updateStateOnInitialState(reducer, diffState = {}) {
  let initialState = {...reducer(undefined, {})};
  return patchState(initialState, diffState);
}

function patchState(state, newState) {
  let initialState = {...state};
  let newPatchState = {};
  let key;
  for (key of Object.keys(newState)) {
    newPatchState = {
      ...patchState,
      [key]: {...initialState[key], ...newState[key]},
    };
  }
  initialState = {...initialState, ...newPatchState};
  return initialState;
}

export default TestRunner;
