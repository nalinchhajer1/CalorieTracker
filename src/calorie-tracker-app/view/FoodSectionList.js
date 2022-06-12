import React from 'react';
import {
  SectionList,
  View,
  Text,
  SafeAreaView,
  Pressable,
  Alert,
} from 'react-native';
import FoodSectionListStyles from './styles/FoodSectionListStyles';
import {MAX_CALORIE_LIMIT} from '../redux/CalorieTrackerConstants';
import reactotron from 'reactotron-react-native';
import {isValidElement} from '../../auth/redux/LoginConstants';
import {Ionicons} from '@expo/vector-icons';
import {
  addNewFoodItem,
  autoCompleteFoodItems,
  deleteFoodItem,
} from '../redux/CalorieTrackerAction';
import {connect} from 'react-redux';

const FoodSectionList = ({section_data = [], deleteFoodItem}) => {
  reactotron.log('render:FoodSectionList');
  return (
    <SectionList
      sections={section_data}
      keyExtractor={(item, index) => item._path}
      renderItem={section => (
        <FoodListItem
          data={section.item}
          name={section.item.name}
          calorie={section.item.calorie}
          onDeleteClick={data => {
            Alert.alert('Are your sure?', 'Are you sure you want to delete?', [
              {
                text: 'Yes',
                onPress: () => {
                  deleteFoodItem(data);
                },
              },
              {
                text: 'No',
              },
            ]);
          }}
        />
      )}
      renderSectionHeader={({section}) => <HeaderItem section={section} />}
    />
  );
};

export const FoodListItem = ({
  data,
  name,
  serving,
  calorie,
  onItemClick,
  onDeleteClick,
}) => {
  reactotron.log('render:FoodListItem');
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
      {isValidElement(onDeleteClick) && (
        <Pressable
          style={FoodSectionListStyles.deleteIconStyle}
          onPress={() => {
            onDeleteClick(data);
          }}>
          <Ionicons name={'remove-circle-outline'} size={18} color={'tomato'} />
        </Pressable>
      )}
    </Pressable>
  );
};

const HeaderItem = ({section}) => {
  reactotron.log('render:HeaderItem');
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteFoodItem,
};
export default connect(mapStateToProps, mapDispatchToProps)(FoodSectionList);
