import React, {useEffect} from 'react';
import LoginScreen from '../auth/view/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect} from 'react-redux';
import {appInitialized} from './redux/CalorieTrackerAction';
import {isUserLoggedIn} from '../auth/redux/LoginConstants';
import AddFoodItemView from './view/AddFoodItemView';
import TabNavigation from './view/TabNavigation';
import {Strings} from './redux/CalorieTrackerConstants';
import AdminFoodList from '../admin/view/AdminFoodList';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({appInitialized, userState}) => {
  useEffect(() => {
    appInitialized();
  }, [appInitialized]);

  return (
    <RootStack.Navigator>
      {isUserLoggedIn(userState) ? (
        <>
          <RootStack.Group>
            <RootStack.Screen
              name="Tab"
              options={{headerShown: false}}
              component={TabNavigation}
            />
            {/*Add modetator check*/}
            <RootStack.Screen name="AdminList" component={AdminFoodList} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{presentation: 'modal'}}>
            <RootStack.Screen
              name={Strings.CREATE}
              component={AddFoodItemView}
            />
            <RootStack.Screen name={Strings.Edit} component={AddFoodItemView} />
          </RootStack.Group>
        </>
      ) : (
        <RootStack.Screen name="Login" component={LoginScreen} />
      )}
    </RootStack.Navigator>
  );
};

const mapStateToProps = state => ({
  userState: state.loginState.userState,
});

const mapDispatchToProps = {
  appInitialized,
};

export default connect(mapStateToProps, mapDispatchToProps)(RootStackScreen);
