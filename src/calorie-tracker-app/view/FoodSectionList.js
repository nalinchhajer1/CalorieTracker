import React from 'react';
import {SectionList, View, Text, SafeAreaView} from 'react-native';
import FoodSectionListStyles from './styles/FoodSectionListStyles';
import {MAX_CALORIE_LIMIT} from '../redux/CalorieTrackerConstants';
import reactotron from 'reactotron-react-native';

const FoodSectionList = ({section_data = [], style}) => {
  return (
    <SectionList
      sections={section_data}
      keyExtractor={(item, index) => item._path}
      renderItem={section => <FoodListItem data={section.item} />}
      renderSectionHeader={({section}) => <HeaderItem section={section} />}
    />
  );
};

export const FoodListItem = ({data}) => {
  return (
    <View style={FoodSectionListStyles.foodItemContainer}>
      <Text style={FoodSectionListStyles.foodItemText}>{data.name}</Text>
      <Text style={FoodSectionListStyles.calorieItemText}>{data.calorie}</Text>
    </View>
  );
};

const HeaderItem = ({section}) => {
  return (
    <View style={FoodSectionListStyles.foodSectionItemContainer}>
      <Text style={FoodSectionListStyles.sectionText}>{section.title}</Text>
      <Text style={FoodSectionListStyles.secionCalorieText}>
        {section.sumCalorie}
        <Text style={FoodSectionListStyles.sectionCalorieLimitText}>
          {`/${MAX_CALORIE_LIMIT}`}
        </Text>
      </Text>
    </View>
  );
};

export default FoodSectionList;
