import moment from 'moment-timezone';
import {isValidElement} from '../../auth/redux/LoginConstants';
import firestore from '@react-native-firebase/firestore';

export const MAX_CALORIE_LIMIT = 2100;

export const DAY_DATE_FORMAT = 'YYYY-MM-DD';
export const USER_DAY_DATE_FORMAT = 'DD MMM';

export const Strings = {
  MESSAGE_ADD_FOODITEM: 'What did you eat?',
  DONE: 'Done',
  HOME_TAB: 'Home',
  CALENDAR_TAB: 'Calendar',
  SETTINGS_TAB: 'Settings',
  CREATE: 'Create',
  ADMIN_TAB: 'Admin',
  Edit: 'Edit',
  CALORIE: 'Calorie',
};

export function convertDayDateFormatToUserDateFormat(date) {
  return moment(date).format(USER_DAY_DATE_FORMAT);
}

export function convertDatesToUnixFormat(start_date, end_date) {
  return {
    start_time: getMillis(start_date + 'T00:00:00'),
    end_time: getMillis(end_date + 'T23:59:59'),
  };
}

export function getMillis(dateString) {
  return moment(dateString).valueOf();
}

export function getDateInUserDisplayFormat(timeInMillis) {
  return moment(parseInt(timeInMillis)).format(USER_DAY_DATE_FORMAT);
}

export function getDayInMillis(dayString) {
  return new Date(dayString).getTime();
}

export function getCurrentDate() {
  return getFormattedDay(new Date());
}

export function getFormattedDay(dateObj) {
  let month = dateObj.getMonth() + 1; //months from 1-12
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();
  return year + '-' + fixedSizeofTwo(month) + '-' + fixedSizeofTwo(day);
}

export function fixedSizeofTwo(number) {
  let result = number.toFixed(0).toString();
  if (result.length < 2) {
    return '0' + result;
  }
  return result;
}

export function convertFirestoreObjectToFoodItemModal(foodItemQueryResult) {
  const sections = {};
  for (const foodItem of foodItemQueryResult.docs) {
    const data = {...foodItem.data(), _path: foodItem.ref.path};
    const dateInMillis = getDayInMillis(data.date);
    if (!isValidElement(sections[dateInMillis])) {
      sections[dateInMillis] = [];
    }
    sections[dateInMillis].push(data);
  }

  const foodItemModals = [];
  const sortedDates = Object.keys(sections).sort((a, b) => b - a);
  for (let i = 0; i < sortedDates.length; i++) {
    foodItemModals.push({
      title: getDateInUserDisplayFormat(sortedDates[i]),
      dateInMillis: sortedDates[i],
      sumCalorie: sections[sortedDates[i]].reduce((sum, current) => {
        return sum + current.calorie;
      }, 0),
      data: sections[sortedDates[i]],
    });
  }
  return foodItemModals;
}

export function foodItemPayload(date, name, calorie, loggedInUserId, image) {
  return {
    name,
    calorie,
    date: getFormattedDay(date),
    createdAt: firestore.Timestamp.fromDate(date),
    user: loggedInUserId,
    image: image,
  };
}

export function userItemPayload(user_name, user_email, user_moderator) {
  return {
    user_name,
    user_email,
    user_moderator,
  };
}

export function performLocalDeleteForFoodItem(calorieList, data) {
  if (isValidElement(data)) {
    for (let i = 0; i < calorieList.length; i++) {
      if (calorieList[i].data.indexOf(data) > -1) {
        const newArray = calorieList[i].data;
        const indexOfItem = calorieList[i].data.indexOf(data);
        calorieList[i].sumCalorie =
          calorieList[i].sumCalorie - calorieList[i].data[indexOfItem].calorie;
        newArray.splice(indexOfItem, 1);
        calorieList[i].data = newArray;
        return [...calorieList];
      }
    }
  }
  return calorieList;
}

export function performLocalUpdateForFoodItem(calorieList, data, newData) {
  if (isValidElement(data)) {
    for (let i = 0; i < calorieList.length; i++) {
      if (calorieList[i].data.indexOf(data) > -1) {
        const indexOfItem = calorieList[i].data.indexOf(data);

        const existingCalorie = calorieList[i].data[indexOfItem].calorie;
        const calorieDiff = newData.calorie - existingCalorie;
        calorieList[i].sumCalorie = calorieList[i].sumCalorie + calorieDiff;

        return calorieList.map((listItem, index) => {
          if (index === i) {
            return {
              ...listItem,
              data: listItem.data.map((individualItem, dataIndex) => {
                if (dataIndex === indexOfItem) {
                  return {
                    ...individualItem,
                    name: newData.name,
                    calorie: newData.calorie,
                    image: newData.image,
                  };
                }
                return individualItem;
              }),
            };
          }
          return listItem;
        });
      }
    }
  }
  return calorieList;
}
