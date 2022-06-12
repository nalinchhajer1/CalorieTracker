import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FoodItemStyles from './styles/FoodItemStyles';
import {connect} from 'react-redux';
import {
  findCalorieBurnout,
  onReceiveSnapshotUpdate,
} from '../redux/CalorieTrackerAction';
import {getCurrentDate, Strings} from '../redux/CalorieTrackerConstants';
import firestore from '@react-native-firebase/firestore';
import {FIREBASE_CONSTANTS} from '../../auth/redux/LoginConstants';
import CalendarListStyles from './styles/CalendarListStyles';
import FoodSectionList from './FoodSectionList';
import reactotron from 'reactotron-react-native';
import FoodSectionListStyles from './styles/FoodSectionListStyles';
import {Ionicons} from '@expo/vector-icons';

const FoodItemList = ({
  findCalorieBurnout,
  navigation,
  loggedInUserId,
  calorieList,
  onReceiveSnapshotUpdate,
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
        onReceiveSnapshotUpdate(documentSnapshot);
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [loggedInUserId]);

  reactotron.log('render:FoodItemList');

  return (
    <View style={FoodItemStyles.container}>
      <TouchableOpacity
        style={FoodItemStyles.addItemContainer}
        onPress={() => {
          navigation.navigate('Create');
        }}>
        <Ionicons
          style={FoodSectionListStyles.foodImageStyle}
          name={'fast-food-outline'}
          size={30}
          color={'tomato'}
        />
        <Text style={FoodItemStyles.addItemMessageText}>
          {Strings.MESSAGE_ADD_FOODITEM}
        </Text>
      </TouchableOpacity>
      <View style={FoodItemStyles.listContainer}>
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
  onReceiveSnapshotUpdate,
};
export default connect(mapStateToProps, mapDispatchToProps)(FoodItemList);
