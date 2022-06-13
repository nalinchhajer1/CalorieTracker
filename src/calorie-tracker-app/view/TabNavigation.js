import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import FoodItemList from './FoodItemList';
import FoodCalendarList from './FoodCalendarList';
import SettingsScreen from './SettingsScreen';
import {Strings} from '../redux/CalorieTrackerConstants';
import reactotron from 'reactotron-react-native';
import {connect} from 'react-redux';
import AdminDashboardView from '../../admin/view/AdminDashboardView';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

const TabNavigation = ({user_moderator}) => {
  reactotron.log('render:TabNavigation');
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === Strings.HOME_TAB) {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === Strings.SETTINGS_TAB) {
            return (
              <Ionicons
                name={focused ? 'ios-settings' : 'ios-settings-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === Strings.CALENDAR_TAB) {
            return (
              <Ionicons
                name={focused ? 'calendar' : 'calendar-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === Strings.ADMIN_TAB) {
            return (
              <Ionicons
                name={focused ? 'body-sharp' : 'body-outline'}
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
      {user_moderator === 'admin' && (
        <Tab.Screen name={Strings.ADMIN_TAB} component={AdminDashboardView} />
      )}
      <Tab.Screen name={Strings.SETTINGS_TAB} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const AdminStack = createNativeStackNavigator();

const mapStateToProps = state => ({
  user_moderator: state.loginState.user_moderator,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigation);
