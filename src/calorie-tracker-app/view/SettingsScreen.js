import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SettingsScreenStyle from './styles/SettingsScreenStyle';
import {deleteFoodItem} from '../redux/CalorieTrackerAction';
import {connect} from 'react-redux';
import {onLogoutRequest} from '../../auth/redux/LoginAction';

const SettingsScreen = ({onLogoutRequest}) => {
  return (
    <View style={SettingsScreenStyle.container}>
      <TouchableOpacity
        onPress={() => {
          onLogoutRequest();
        }}
        style={SettingsScreenStyle.logoutButton}
        title="Logout"
        color="tomato">
        <Text style={SettingsScreenStyle.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteFoodItem,
  onLogoutRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
