import {StyleSheet} from 'react-native';

const AddFoodItemStyles = {
  container: {
    flex: 1,
    padding: 10,
  },
  textEntryContainer: {
    backgroundColor: 'white',
    elevation: 2,
    margin: 10,
    flexDirection: 'row',
    height: 80,
  },
  textEntry: {
    fontSize: 16,
    flex: 1,
    paddingLeft: 10,
  },
  calorieEntry: {
    fontSize: 16,
    width: 80,
    color: '#333',
    textAlign: 'right',
    paddingRight: 10,
  },
};

export default StyleSheet.create(AddFoodItemStyles);
