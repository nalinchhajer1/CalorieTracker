import {StyleSheet} from 'react-native';

const SettingsScreenStyle = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  logoutButton: {
    backgroundColor: 'white',
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoutText: {
    fontSize: 20,
    padding: 10,
    color: 'tomato',
  },
  developeroptionContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
  },
  developeroptionText: {
    fontSize: 14,
  },
  developerOptionButton: {
    marginTop: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
  },
};

export default StyleSheet.create(SettingsScreenStyle);
