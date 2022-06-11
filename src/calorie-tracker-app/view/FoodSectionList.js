import React from 'react';
import {SectionList, View, Text, SafeAreaView, Pressable} from 'react-native';
import FoodSectionListStyles from './styles/FoodSectionListStyles';
import {MAX_CALORIE_LIMIT} from '../redux/CalorieTrackerConstants';
import reactotron from 'reactotron-react-native';
import {isValidElement} from '../../auth/redux/LoginConstants';

const FoodSectionList = ({section_data = [], style}) => {
  return (
    <SectionList
      sections={section_data}
      keyExtractor={(item, index) => item._path}
      renderItem={section => (
        <FoodListItem
          data={section.item}
          name={section.item.name}
          calorie={section.item.calorie}
        />
      )}
      renderSectionHeader={({section}) => <HeaderItem section={section} />}
    />
  );
};

export const FoodListItem = ({data, name, serving, calorie, onItemClick}) => {
  return (
    <Pressable
      style={FoodSectionListStyles.foodItemContainer}
      onPress={() => {
        isValidElement(onItemClick) && onItemClick(data);
      }}>
      <Text style={FoodSectionListStyles.foodItemText}>{name}</Text>
      {isValidElement(serving) && (
        <Text style={FoodSectionListStyles.calorieItemText}>{serving}</Text>
      )}
      <Text style={FoodSectionListStyles.calorieItemText}>{calorie}</Text>
    </Pressable>
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
