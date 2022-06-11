import React, {useState} from 'react';
import {View, SafeAreaView, TextInput, Button, FlatList} from 'react-native';
import AddFoodItemStyles from './styles/AddFoodItemStyles';
import {foodItemPayload, Strings} from '../redux/CalorieTrackerConstants';
import {isValidElement} from '../../auth/redux/LoginConstants';
import {
  addNewFoodItem,
  findCalorieBurnout,
} from '../redux/CalorieTrackerAction';
import {connect} from 'react-redux';
import {FoodListItem} from './FoodSectionList';

const AddFoodItemView = ({navigation, loggedInUserId, addNewFoodItem}) => {
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
          setUserText(text);
        }}
        autoFocus
        blurOnSubmit={false}
        value={userText}
        onSubmitEditing={() => {
          if (isValidElement(userText) && userText.length > 1) {
            const payload = foodItemPayload(
              new Date(),
              userText,
              10,
              loggedInUserId,
            );
            addNewFoodItem(payload);
            setCreatedFoodItems([...createdFoodItems, payload]);
          }

          setUserText('');
        }}
      />
      <FlatList
        data={createdFoodItems}
        renderItem={({item}) => <FoodListItem data={item} />}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loggedInUserId: state.loginState.loggedInUserId,
});

const mapDispatchToProps = {
  addNewFoodItem,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddFoodItemView);
