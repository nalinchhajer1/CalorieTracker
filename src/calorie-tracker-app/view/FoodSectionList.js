import React from 'react';
import {Alert, SectionList, Text, TouchableOpacity, View} from 'react-native';
import FoodSectionListStyles from './styles/FoodSectionListStyles';
import {MAX_CALORIE_LIMIT, Strings} from '../redux/CalorieTrackerConstants';
import {isValidElement} from '../../auth/redux/LoginConstants';
import {Ionicons} from '@expo/vector-icons';
import {deleteFoodItem} from '../redux/CalorieTrackerAction';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {CTImage} from '../../auth/view/CTImage';

const FoodSectionList = ({section_data = [], ListHeaderComponent}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  if (!isValidElement(section_data)) {
    return null;
  }

  return (
    <SectionList
      sections={section_data}
      keyExtractor={(item, index) => item._path}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={section => (
        <FoodListItem
          data={section.item}
          name={section.item.name}
          calorie={section.item.calorie}
          image={section.item.image}
          onDeleteClick={data => {
            Alert.alert('Are your sure?', 'Are you sure you want to delete?', [
              {
                text: 'Yes',
                onPress: () => {
                  dispatch(deleteFoodItem(data));
                },
              },
              {
                text: 'No',
              },
            ]);
          }}
          onItemClick={data => {
            navigation.navigate(Strings.Edit, {updateData: data, isEdit: true});
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
  image,
  calorie,
  onItemClick,
  onDeleteClick,
}) => {
  // reactotron.log('render:FoodListItem');
  return (
    <TouchableOpacity
      style={FoodSectionListStyles.foodItemContainer}
      onPress={() => {
        isValidElement(onItemClick) && onItemClick(data);
      }}>
      {image ? (
        <CTImage
          style={FoodSectionListStyles.foodImageStyle}
          source={{uri: image}}
        />
      ) : (
        <Ionicons
          style={FoodSectionListStyles.foodImageStyle}
          name={'fast-food-outline'}
          size={30}
          color={'tomato'}
        />
      )}

      <Text style={FoodSectionListStyles.foodItemText}>{name}</Text>
      {isValidElement(serving) && (
        <Text style={FoodSectionListStyles.calorieItemText}>{serving}</Text>
      )}
      <Text style={FoodSectionListStyles.calorieItemText}>{calorie}</Text>
      {isValidElement(onDeleteClick) && (
        <TouchableOpacity
          style={FoodSectionListStyles.deleteIconStyle}
          onPress={() => {
            onDeleteClick(data);
          }}>
          <Ionicons name={'remove-circle-outline'} size={18} color={'tomato'} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
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
