import React, {useState} from 'react';
import {View, SafeAreaView, TextInput, Button, FlatList} from 'react-native';
import AddFoodItemStyles from './styles/AddFoodItemStyles';
import {foodItemPayload, Strings} from '../redux/CalorieTrackerConstants';
import {isValidElement} from '../../auth/redux/LoginConstants';
import {
  addNewFoodItem,
  autoCompleteFoodItems,
  findCalorieBurnout,
} from '../redux/CalorieTrackerAction';
import {connect} from 'react-redux';
import {FoodListItem} from './FoodSectionList';

const AddFoodItemView = ({
  navigation,
  loggedInUserId,
  addNewFoodItem,
  autoCompleteFoodItems,
  autoCompleteResult,
}) => {
  const [userText, setUserText] = useState('');
  const [createdFoodItems, setCreatedFoodItems] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={Strings.DONE}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={AddFoodItemStyles.container}>
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
        onSubmitEditing={() => {
          saveFoodItem({
            name: userText,
            loggedInUserId,
            addNewFoodItem,
            setCreatedFoodItems,
            createdFoodItems,
          });
          autoCompleteFoodItems('');
          setUserText('');
        }}
      />
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
                });
                autoCompleteFoodItems('');
                setUserText('');
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
  calorie = 10,
  loggedInUserId,
  addNewFoodItem,
  setCreatedFoodItems,
  createdFoodItems,
}) {
  if (isValidElement(name) && name.length > 1) {
    const payload = foodItemPayload(new Date(), name, calorie, loggedInUserId);
    addNewFoodItem(payload);
    setCreatedFoodItems([...createdFoodItems, payload]);
  }
}

const mapStateToProps = state => ({
  loggedInUserId: state.loginState.loggedInUserId,
  autoCompleteResult: state.calorieTrackerState.autoCompleteResult,
});

const mapDispatchToProps = {
  addNewFoodItem,
  autoCompleteFoodItems,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddFoodItemView);
