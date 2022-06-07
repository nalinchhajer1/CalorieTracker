/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import TestRunner from './utils/TestRunner';
import {appInitialized} from '../src/calorie-tracker-app/redux/CalorieTrackerAction';
import {TYPE_CALORIE_TRACKER} from '../src/calorie-tracker-app/redux/CalorieTrackerTypes';

it('renders correctly', () => {
  renderer.create(<App />);
});

describe('check app core', () => {
  test('redux saga integration', async () => {
    const runner = TestRunner({});
    runner.dispatch(appInitialized());
    expect(runner.getState().calorieTrackerState.appInitialized).toBe(true);
    const result = await runner.waitFor(
      TYPE_CALORIE_TRACKER.APP_INITIALIZED_COMPLETED,
    );
    expect(result).not.toBeFalsy();
  });
});
