import React, {useCallback, useState} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  Text,
} from 'react-native';
import AddFoodItemStyles from './styles/AddFoodItemStyles';
import {foodItemPayload, Strings} from '../redux/CalorieTrackerConstants';
import {isValidElement} from '../../auth/redux/LoginConstants';
import {
  addNewFoodItem,
  autoCompleteFoodItems,
  findCalorieBurnout,
  updateFoodItem,
} from '../redux/CalorieTrackerAction';
import {connect} from 'react-redux';
import {FoodListItem} from './FoodSectionList';
import reactotron from 'reactotron-react-native';

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
  const {updateData, isEdit = false} = route.params;
  const [userText, setUserText] = useState(updateData?.name ?? '');
  const [createdFoodItems, setCreatedFoodItems] = useState([]);
  const [calorieText, setCalorieText] = useState(
    updateData?.calorie?.toString() ?? '',
  );

  const onUserFinish = useCallback(() => {
    reactotron.log({calorieText});
    saveFoodItem({
      name: userText,
      calorie:
        isValidElement(calorieText) && calorieText.length > 0
          ? parseInt(calorieText)
          : 100,
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
    }
  }, [
    addNewFoodItem,
    autoCompleteFoodItems,
    calorieText,
    createdFoodItems,
    isEdit,
    loggedInUserId,
    updateData,
    updateFoodItem,
    userText,
  ]);

  reactotron.log('render:AddFoodItemView');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={Strings.DONE}
          onPress={() => {
            onUserFinish();
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation, onUserFinish]);

  return (
    <SafeAreaView style={AddFoodItemStyles.container}>
      <View style={AddFoodItemStyles.textEntryContainer}>
        <TextInput
          style={AddFoodItemStyles.textEntry}
          placeholder={Strings.MESSAGE_ADD_FOODITEM}
          onChangeText={text => {
            autoCompleteFoodItems(text);
            setUserText(text);
          }}
          autoFocus
          blurOnSubmit={false}
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
                }
              }}
            />
          )}
        />
      ) : (
        <FlatList
          data={createdFoodItems}
          renderItem={({item}) => (
            <FoodListItem data={item} name={item.name} calorie={item.calorie} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

function saveFoodItem({
  name,
  calorie,
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
      updateFoodItem(updateData, name, calorie);
    } else {
      const payload = foodItemPayload(
        new Date(),
        name,
        calorie,
        loggedInUserId,
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
