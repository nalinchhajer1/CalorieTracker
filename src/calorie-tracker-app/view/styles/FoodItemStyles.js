import {StyleSheet} from 'react-native';

const FoodItemStyles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  addItemContainer: {
    flexDirection: 'row',
    margin: 10,
    height: 80,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  listContainer: {
    flex: 1,
  },
  addItemMessageText: {
    elevation: 2,
    padding: 10,
    flex: 1,
    fontSize: 16,
  },
};

export default StyleSheet.create(FoodItemStyles);
