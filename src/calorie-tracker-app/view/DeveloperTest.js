import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {
  onLoginScreenLaunchGoogleLoginConfiguration,
  onPressGoogleLogin,
} from '../../auth/redux/LoginAction';
import {
  addNewFoodItem,
  findCalorieBurnout,
} from '../redux/CalorieTrackerAction';
import {getCurrentDate} from '../redux/CalorieTrackerConstants';

const HomeScreen = ({addNewFoodItem, findCalorieBurnout}) => {
  return (
    <View style={styles.container}>
      <Button
        title={'Add New Food Item'}
        style={styles.buttonStyle}
        onPress={() => {
          // addNewFoodItem(getCurrentDate(), 'Milk', 40);
        }}
      />
      <Button
        title={'Find items consumed in period'}
        style={styles.buttonStyle}
        onPress={() => {
          // findCalorieBurnout(1654713000000, 1655058600000);
        }}
      />

      <Button
        title={'Find last 90 days calorie count and food item count'}
        style={styles.buttonStyle}
        onPress={() => {
          // findCalorieBurnout(30);
        }}
      />
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addNewFoodItem,
  findCalorieBurnout,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    margin: 10,
  },
});
