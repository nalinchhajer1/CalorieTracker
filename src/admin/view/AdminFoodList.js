import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import {
  FIREBASE_CONSTANTS,
  isValidElement,
} from '../../auth/redux/LoginConstants';
import firestore from '@react-native-firebase/firestore';
import {FoodListItem} from '../../calorie-tracker-app/view/FoodSectionList';
import {deleteFoodItem} from '../../calorie-tracker-app/redux/CalorieTrackerAction';
import {connect} from 'react-redux';
import {Strings} from '../../calorie-tracker-app/redux/CalorieTrackerConstants';
import reactotron from '../../../ReactotronConfig';

function LoadData(lastDocument, setLastDocument, foodData, setFoodData) {
  if (this.fetching_from_server === true) {
    return;
  }
  let query = firestore()
    .collection(FIREBASE_CONSTANTS.FOOD_COLLECTION)
    .orderBy('createdAt', 'desc'); // sort the data
  if (isValidElement(lastDocument)) {
    query = query.startAfter(lastDocument); // fetch data following the last document accessed
  }

  this.fetching_from_server = true;
  query
    .limit(20) // limit to your page size, 3 is just an example
    .get()
    .then(querySnapshot => {
      if (querySnapshot.docs.length > 0) {
        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        MakeUserData(querySnapshot.docs, foodData, setFoodData);
      }
      this.fetching_from_server = false;
    })
    .catch(e => {
      // this.fetching_from_server = false;
      reactotron.log('failure' + e.toString());
    });
}

function MakeUserData(docs, foodData, setFoodData) {
  let templist = [...foodData];
  docs.forEach(doc => {
    templist.push({...doc.data(), _path: doc.ref.path});
  });
  setFoodData(templist);
}

const AdminFoodList = ({deleteFoodItem, navigation}) => {
  const [lastDocument, setLastDocument] = useState(null);
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    LoadData(lastDocument, setLastDocument, foodData, setFoodData);
  }, [foodData, lastDocument]);

  return (
    <View>
      <FlatList
        data={foodData}
        renderItem={({item}) => (
          <FoodListItem
            data={item}
            name={item.name}
            calorie={item.calorie}
            image={item.image}
            onItemClick={data => {
              navigation.navigate(Strings.Edit, {
                updateData: data,
                isEdit: true,
              });
            }}
            onDeleteClick={data => {
              Alert.alert(
                'Are your sure?',
                'Are you sure you want to delete?',
                [
                  {
                    text: 'Yes',
                    onPress: () => {
                      let index = foodData.indexOf(data);
                      let newFoodItem = [...foodData];
                      newFoodItem.splice(index, 1);
                      setFoodData(newFoodItem);
                      deleteFoodItem(data);
                    },
                  },
                  {
                    text: 'No',
                  },
                ],
              );
            }}
          />
        )}
        onEndReached={() => {
          LoadData(lastDocument, setLastDocument, foodData, setFoodData);
        }}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteFoodItem,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminFoodList);
