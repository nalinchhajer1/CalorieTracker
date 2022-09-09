import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FoodItemStyles from './styles/FoodItemStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  findCalorieBurnout,
  onReceiveSnapshotUpdate,
} from '../redux/CalorieTrackerAction';
import {getCurrentDate, Strings} from '../redux/CalorieTrackerConstants';
import firestore from '@react-native-firebase/firestore';
import {FIREBASE_CONSTANTS} from '../../auth/redux/LoginConstants';
import CalendarListStyles from './styles/CalendarListStyles';
import FoodSectionList from './FoodSectionList';
import FoodSectionListStyles from './styles/FoodSectionListStyles';
import {Ionicons} from '@expo/vector-icons';

const FoodItemList = ({navigation}) => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector(state => state.loginState.loggedInUserId);
  const calorieList = useSelector(
    state => state.calorieTrackerState.calorieList,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(findCalorieBurnout(getCurrentDate(), getCurrentDate()));
    });

    return unsubscribe;
  }, [dispatch, navigation]);

  useEffect(() => {
    const subscriber = firestore()
      .collection(FIREBASE_CONSTANTS.FOOD_COLLECTION)
      .where(FIREBASE_CONSTANTS.FIELD_USER, '==', loggedInUserId)
      .onSnapshot(documentSnapshot => {
        dispatch(onReceiveSnapshotUpdate(documentSnapshot));
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [dispatch, loggedInUserId]);

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

export default FoodItemList;
