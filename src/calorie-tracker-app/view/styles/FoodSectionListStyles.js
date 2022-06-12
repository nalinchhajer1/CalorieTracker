import {StyleSheet} from 'react-native';

const FoodSectionListStyles = {
  sectionText: {
    fontSize: 20,
    padding: 4,
    flex: 1,
  },
  secionCalorieText: {
    fontSize: 20,
    padding: 4,
    marginRight: 20,
  },
  sectionCalorieLimitText: {
    fontSize: 12,
    color: '#888888',
  },
  foodItemContainer: {
    flexDirection: 'row',
    elevation: 2,
    backgroundColor: 'white',
    margin: 2,
    padding: 8,
    alignItems: 'center',
  },
  foodSectionItemContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#f6f6f6',
  },
  foodItemText: {
    marginLeft: 8,
    fontSize: 16,
    padding: 4,
    flex: 1,
  },
  calorieItemText: {
    fontSize: 14,
    padding: 4,
    marginRight: 20,
  },
  deleteIconStyle: {
    width: 30,
    height: 30,
    justifyContent: 'center',
  },
  foodImageStyle: {
    width: 40,
    height: 40,
    padding: 4,
  },
};

export default StyleSheet.create(FoodSectionListStyles);
