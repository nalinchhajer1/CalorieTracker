import React, {useEffect, useState} from 'react';
import {Button, SectionList, View} from 'react-native';
import FoodItemStyles from './styles/FoodItemStyles';
import {connect} from 'react-redux';
import {findCalorieBurnout} from '../redux/CalorieTrackerAction';
import {getCurrentDate} from '../redux/CalorieTrackerConstants';
import firestore from '@react-native-firebase/firestore';
import {FIREBASE_CONSTANTS} from '../../auth/redux/LoginConstants';
import CalendarListStyles from './styles/CalendarListStyles';
import FoodSectionList from './FoodSectionList';
import reactotron from 'reactotron-react-native';

const FoodItemList = ({
  findCalorieBurnout,
  navigation,
  loggedInUserId,
  calorieList,
}) => {
  useEffect(() => {
    findCalorieBurnout(getCurrentDate(), getCurrentDate());
  }, [findCalorieBurnout]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      findCalorieBurnout(getCurrentDate(), getCurrentDate());
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [findCalorieBurnout, navigation]);

  useEffect(() => {
    const subscriber = firestore()
      .collection(FIREBASE_CONSTANTS.FOOD_COLLECTION)
      .where(FIREBASE_CONSTANTS.FIELD_USER, '==', loggedInUserId)
      .onSnapshot(documentSnapshot => {
        reactotron.log('User data: ', documentSnapshot);
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [loggedInUserId]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="C"
          onPress={() => {
            navigation.navigate('Calendar');
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View styles={FoodItemStyles.container}>
      <View styles={FoodItemStyles.addItemContainer}>
        <Button
          title={'Button to add'}
          onPress={() => {
            navigation.navigate('Create');
          }}
        />
      </View>
      <View styles={FoodItemStyles.listContainer}>
        <FoodSectionList
          style={CalendarListStyles.listContainer}
          section_data={calorieList}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  loggedInUserId: state.loginState.loggedInUserId,
  calorieList: state.calorieTrackerState.calorieList,
});

const mapDispatchToProps = {
  findCalorieBurnout,
};
export default connect(mapStateToProps, mapDispatchToProps)(FoodItemList);
