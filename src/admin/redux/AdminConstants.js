import moment from 'moment-timezone';
import {
  convertDayDateFormatToUserDateFormat,
  DAY_DATE_FORMAT,
} from '../../calorie-tracker-app/redux/CalorieTrackerConstants';
import {isValidElement} from '../../auth/redux/LoginConstants';

export const getChartDataFromAnalyticsFirebase = (analyticsQuery, dates) => {
  let avg_calories = {
    newDates: [],
    newValue: [],
    oldValue: [],
    today: 0,
  };
  let entries = {
    newDates: [],
    newValue: [],
    oldValue: [],
    today: 0,
  };

  let analyticsMaster = {};
  for (const analyticsDoc of analyticsQuery.docs) {
    analyticsMaster[analyticsDoc.id] = analyticsDoc.data();
  }

  let iter_date = moment();
  let lastUsedDate = null;
  for (let i = 0; i < 7; i++) {
    const dateString = iter_date.format(DAY_DATE_FORMAT);
    let currentDate = convertDayDateFormatToUserDateFormat(dateString);
    iter_date.subtract(1, 'days');
    if (analyticsMaster[dateString]) {
      let analytics = analyticsMaster[dateString];
      avg_calories.newDates.push(
        getDateForChartDisplay(currentDate, lastUsedDate),
      );
      avg_calories.newValue.push(caloriePerUserValue(analytics));
      entries.newDates.push(getDateForChartDisplay(currentDate, lastUsedDate));
      entries.newValue.push(analytics?.count ?? 0);
    } else {
      avg_calories.newDates.push(
        getDateForChartDisplay(currentDate, lastUsedDate),
      );
      avg_calories.newValue.push(0);
      entries.newDates.push(getDateForChartDisplay(currentDate, lastUsedDate));
      entries.newValue.push(0);
    }
    lastUsedDate = currentDate;
  }

  for (let i = 0; i < 7; i++) {
    const dateString = iter_date.format(DAY_DATE_FORMAT);
    iter_date.subtract(1, 'days');
    if (analyticsMaster[dateString]) {
      let analytics = analyticsMaster[dateString];
      avg_calories.oldValue.push(caloriePerUserValue(analytics));
      entries.oldValue.push(analytics?.count ?? 0);
    } else {
      avg_calories.oldValue.push(0);
      entries.oldValue.push(0);
    }
  }

  avg_calories.newDates = avg_calories.newDates.reverse();
  avg_calories.newValue = avg_calories.newValue.reverse();
  avg_calories.oldValue = avg_calories.oldValue.reverse();
  avg_calories.today = avg_calories.newValue[avg_calories.newValue.length - 1];
  entries.newDates = entries.newDates.reverse();
  entries.newValue = entries.newValue.reverse();
  entries.oldValue = entries.oldValue.reverse();
  entries.today = entries.newValue[entries.newValue.length - 1];

  return {
    avg_calories: avg_calories,
    entries: entries,
  };
};

export function getDateForChartDisplay(currentDate, lastUsedDate) {
  if (isValidElement(lastUsedDate)) {
    let lastMonth = lastUsedDate.slice(3, 6);
    let currentMonth = currentDate.slice(3, 6);
    if (lastMonth === currentMonth) {
      return currentDate.slice(0, 2);
    }
    return currentDate;
  }
  return currentDate;
}

export function caloriePerUserValue(analytics) {
  let calorie = analytics?.calorie ?? 0;
  let user = analytics?.user?.length ?? 0;
  if (user > 1) {
    return calorie / user;
  }
  return calorie;
}

export const getAnalyticsDateQuery = (numberDays = 14) => {
  const days = [];
  let date = moment();
  for (let i = 0; i < numberDays; i++) {
    days.push(date.format(DAY_DATE_FORMAT));
    date.subtract(1, 'days');
  }
  return days;
};
