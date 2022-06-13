/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import fs from 'fs';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import TestRunner from './utils/TestRunner';
import {appInitialized} from '../src/calorie-tracker-app/redux/CalorieTrackerAction';
import {TYPE_CALORIE_TRACKER} from '../src/calorie-tracker-app/redux/CalorieTrackerTypes';
import {
  DAY_DATE_FORMAT,
  generateRandomFoodItem,
  getCurrentDate,
  getFormattedDay,
  getMillis,
} from '../src/calorie-tracker-app/redux/CalorieTrackerConstants';
import moment from 'moment-timezone';
import {setUpAutoComplete} from '../src/calorie-tracker-app/redux/CalorieTrackerSaga';
import {getDateForChartDisplay} from '../src/admin/redux/AdminConstants';
import {AutocompleteTrie} from '../src/calorie-tracker-app/utils/AutocompleteTrie';

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

  test('getFormattedDay', () => {
    // performance

    let result = '';
    // for (let i = 1; i < 10000; i++) {
    //   result =
    //     getFormattedDay(new Date(2021, 2, (i % 30) + 1, 9, 9, 9, 1)) +
    //     getCurrentDate() +
    //     getMillis('2014-06-01T00:00:00');
    // }

    expect(getCurrentDate()).toEqual('2022-06-12');
    expect(getFormattedDay(new Date(2021, 2, 1, 9, 9, 9, 1))).toEqual(
      '2021-03-01',
    );
    expect(getFormattedDay(moment('2014-06-01').toDate())).toEqual(
      '2014-06-01',
    );
    let losAnglesTime = moment.tz('2014-06-02T23:00:00', 'America/Los_Angeles');
    expect(getFormattedDay(losAnglesTime.toDate())).toEqual(
      losAnglesTime.utc().format(DAY_DATE_FORMAT),
    );
    expect(getFormattedDay(losAnglesTime.toDate())).toEqual('2014-06-03');

    expect(getMillis('2014-06-01T00:00:00')).toEqual(1401561000000);
  });

  test('getDateForChartDisplay', async () => {
    expect(getDateForChartDisplay('2022-06-02')).toEqual('02 Jun');
    expect(getDateForChartDisplay('2022-06-01', '02 Jun')).toEqual('01');
    expect(getDateForChartDisplay('2022-05-31', '02 Jun')).toEqual('31 May');
  });

  test('generateRandomFoodItem', () => {
    const nutritionData = require('../nutrition_trim.json');
    let autoCompleteTrie = new AutocompleteTrie();
    autoCompleteTrie.setRoot(nutritionData);
    expect(generateRandomFoodItem(10, '1bc', autoCompleteTrie)).toEqual([]);
  });
});
