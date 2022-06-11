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
  },
  foodSectionItemContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  foodItemText: {
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
};

export default StyleSheet.create(FoodSectionListStyles);
