import {StyleSheet} from 'react-native';

const SettingsScreenStyle = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoutButton: {
    width: 200,
    backgroundColor: 'white',
    marginTop: 50,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoutText: {
    fontSize: 20,
    padding: 10,
    color: 'tomato',
  },
};

export default StyleSheet.create(SettingsScreenStyle);
