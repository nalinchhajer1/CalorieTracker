import React from 'react';
import {SectionList, View, Text, SafeAreaView} from 'react-native';
import FoodSectionListStyles from './styles/FoodSectionListStyles';
import {MAX_CALORIE_LIMIT} from '../redux/CalorieTrackerConstants';

const FoodSectionList = ({section_data = [], style}) => {
  return (
    <SectionList
      sections={section_data}
      keyExtractor={(item, index) => item._path}
      renderItem={section => <ListItem data={section} />}
      renderSectionHeader={({section}) => <HeaderItem section={section} />}
    />
  );
};

const ListItem = ({data}) => {
  const {item} = data;
  return (
    <View style={FoodSectionListStyles.foodItemContainer}>
      <Text style={FoodSectionListStyles.foodItemText}>{item.name}</Text>
      <Text style={FoodSectionListStyles.calorieItemText}>{item.calorie}</Text>
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
