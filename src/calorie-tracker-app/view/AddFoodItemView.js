import React, {useState} from 'react';
import {SafeAreaView, TextInput, Button} from 'react-native';
import AddFoodItemStyles from './styles/AddFoodItemStyles';

const AddFoodItemView = ({navigation}) => {
  const [userText, setUserText] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Done"
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
        placeholder={'What did you eat for the day?'}
        onChangeText={text => {
          setUserText(text);
        }}
        blurOnSubmit={false}
        value={userText}
        onSubmitEditing={() => {
          setUserText('');
        }}
      />
    </SafeAreaView>
  );
};

export default AddFoodItemView;
