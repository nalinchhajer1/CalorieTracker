import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import FoodItemList from './FoodItemList';
import FoodCalendarList from './FoodCalendarList';
import SettingsScreen from './SettingsScreen';
import {Strings} from '../redux/CalorieTrackerConstants';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Settings') {
            return (
              <Ionicons
                name={focused ? 'ios-settings' : 'ios-settings-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Calendar') {
            return (
              <Ionicons
                name={focused ? 'calendar' : 'calendar-outline'}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'tomato',
      })}>
      <Tab.Screen name={Strings.HOME_TAB} component={FoodItemList} />
      <Tab.Screen name={Strings.CALENDAR_TAB} component={FoodCalendarList} />
      <Tab.Screen name={Strings.SETTINGS_TAB} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
