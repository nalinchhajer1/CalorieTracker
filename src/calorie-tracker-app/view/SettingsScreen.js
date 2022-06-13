import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SettingsScreenStyle from './styles/SettingsScreenStyle';
import {
  deleteFoodItem,
  randomFoodItemGenerator,
} from '../redux/CalorieTrackerAction';
import {connect} from 'react-redux';
import {onLogoutRequest} from '../../auth/redux/LoginAction';

const SettingsScreen = ({
  user_moderator,
  onLogoutRequest,
  randomFoodItemGenerator,
}) => {
  return (
    <View style={SettingsScreenStyle.container}>
      {user_moderator === 'admin' && (
        <DeveloperOption randomFoodItemGenerator={randomFoodItemGenerator} />
      )}
      <TouchableOpacity
        onPress={() => {
          onLogoutRequest();
        }}
        style={SettingsScreenStyle.logoutButton}
        color="tomato">
        <Text style={SettingsScreenStyle.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const DeveloperOption = ({randomFoodItemGenerator}) => {
  return (
    <View>
      <ButtonOption
        title={'Add random 10 items in 14 days'}
        onPress={() => {
          randomFoodItemGenerator();
        }}
      />
    </View>
  );
};

const ButtonOption = ({title, onPress}) => {
  return (
    <View style={SettingsScreenStyle.developeroptionContainer}>
      <Text style={SettingsScreenStyle.developeroptionText}>
        {'Developer Options'}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={SettingsScreenStyle.developerOptionButton}
        color="tomato">
        <Text style={SettingsScreenStyle.logoutText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  user_moderator: state.loginState.user_moderator,
});

const mapDispatchToProps = {
  deleteFoodItem,
  onLogoutRequest,
  randomFoodItemGenerator,
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
