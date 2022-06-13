import React, {useCallback, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AddFoodItemStyles from './styles/AddFoodItemStyles';
import {foodItemPayload, Strings} from '../redux/CalorieTrackerConstants';
import {isValidElement} from '../../auth/redux/LoginConstants';
import {
  addNewFoodItem,
  autoCompleteFoodItems,
  updateFoodItem,
} from '../redux/CalorieTrackerAction';
import {connect} from 'react-redux';
import {FoodListItem} from './FoodSectionList';
import FoodImageContainer from './FoodImageContainer';
import {Ionicons} from '@expo/vector-icons';

let validCalorie = new RegExp(/^\d*$/);

const AddFoodItemView = ({
  navigation,
  loggedInUserId,
  addNewFoodItem,
  autoCompleteFoodItems,
  autoCompleteResult,
  updateFoodItem,
  route,
}) => {
  const {updateData, isEdit = false} = route?.params ?? {};
  const [userText, setUserText] = useState(updateData?.name ?? '');
  const [createdFoodItems, setCreatedFoodItems] = useState([]);
  const [calorieText, setCalorieText] = useState(
    updateData?.calorie?.toString() ?? '',
  );
  const [foodImagePath, setFoodImagePath] = useState(updateData?.image ?? null);
  const [imageUploading, setImageUploading] = useState(false);

  const onUserFinish = useCallback(() => {
    if (imageUploading === true) {
      Alert.alert('Please wait!', 'Image is getting uploaded');
      return;
    }
    saveFoodItem({
      name: userText,
      calorie:
        isValidElement(calorieText) && calorieText.length > 0
          ? parseInt(calorieText)
          : 100,
      image: foodImagePath,
      loggedInUserId,
      addNewFoodItem,
      setCreatedFoodItems,
      createdFoodItems,
      isEdit,
      updateData,
      updateFoodItem,
    });
    autoCompleteFoodItems('');
    if (isEdit !== true) {
      setUserText('');
      setFoodImagePath(null);
    }
  }, [
    addNewFoodItem,
    autoCompleteFoodItems,
    calorieText,
    createdFoodItems,
    foodImagePath,
    imageUploading,
    isEdit,
    loggedInUserId,
    updateData,
    updateFoodItem,
    userText,
  ]);

  const onDoneButtonPressed = useCallback(() => {
    onUserFinish();
    if (imageUploading !== true) {
      navigation.goBack();
    }
  }, [imageUploading, navigation, onUserFinish]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{padding: 6}}>
          <Ionicons name={'close'} size={30} color={'black'} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <Button title={Strings.DONE} onPress={onDoneButtonPressed} />
      ),
    });
  }, [navigation, onDoneButtonPressed]);

  return (
    <SafeAreaView style={AddFoodItemStyles.container}>
      <View style={AddFoodItemStyles.textEntryContainer}>
        <FoodImageContainer
          onUserAddedImage={imagePath => {
            setFoodImagePath(imagePath);
          }}
          serverImage={foodImagePath}
          onChangeImageUploadingState={newState => {
            setImageUploading(newState);
          }}
        />
        <TextInput
          style={AddFoodItemStyles.textEntry}
          placeholder={Strings.MESSAGE_ADD_FOODITEM}
          onChangeText={text => {
            autoCompleteFoodItems(text);
            setUserText(text);
          }}
          autoFocus
          blurOnSubmit={false}
          multiline={true}
          numberOfLines={3}
          value={userText}
          onSubmitEditing={onUserFinish}
        />
        <TextInput
          style={AddFoodItemStyles.calorieEntry}
          placeholder={Strings.CALORIE}
          value={calorieText}
          onChangeText={text => {
            if (validCalorie.test(text)) {
              setCalorieText(text);
            }
          }}
          blurOnSubmit={false}
          keyboardType={'number-pad'}
          onSubmitEditing={onUserFinish}
        />
      </View>
      {autoCompleteResult && autoCompleteResult.length > 0 ? (
        <FlatList
          data={autoCompleteResult}
          renderItem={({item}) => (
            <FoodListItem
              name={item['1']}
              calorie={item['3']}
              serving={item['2']}
              data={item}
              onItemClick={foodItem => {
                saveFoodItem({
                  name: foodItem['1'],
                  calorie: foodItem['3'],
                  image: foodImagePath,
                  loggedInUserId,
                  addNewFoodItem,
                  setCreatedFoodItems,
                  createdFoodItems,
                  isEdit,
                  updateData,
                  updateFoodItem,
                });
                autoCompleteFoodItems('');
                if (isEdit !== true) {
                  setUserText('');
                  setFoodImagePath(null);
                }
              }}
            />
          )}
        />
      ) : (
        <FlatList
          data={createdFoodItems}
          renderItem={({item}) => (
            <FoodListItem
              data={item}
              name={item.name}
              calorie={item.calorie}
              image={item.image}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

function saveFoodItem({
  name,
  calorie,
  image,
  loggedInUserId,
  addNewFoodItem,
  setCreatedFoodItems,
  createdFoodItems,
  isEdit,
  updateData,
  updateFoodItem,
}) {
  if (isValidElement(name) && name.length >= 1) {
    if (isEdit === true) {
      updateFoodItem(updateData, name, calorie, image);
    } else {
      const payload = foodItemPayload(
        new Date(),
        name,
        calorie,
        loggedInUserId,
        image,
      );
      addNewFoodItem(payload);
      setCreatedFoodItems([...createdFoodItems, payload]);
    }
  }
}

const mapStateToProps = state => ({
  loggedInUserId: state.loginState.loggedInUserId,
  autoCompleteResult: state.calorieTrackerState.autoCompleteResult,
});

const mapDispatchToProps = {
  addNewFoodItem,
  autoCompleteFoodItems,
  updateFoodItem,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddFoodItemView);
