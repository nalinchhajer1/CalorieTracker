import {StyleSheet} from 'react-native';

const AdminDashboardStyles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  sectionParentContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
  },
  sectionText: {
    fontSize: 20,
    marginBottom: 10,
  },
  sectionChart: {
    height: 250,
    width: '100%',
  },
};

export default StyleSheet.create(AdminDashboardStyles);

export const sectionChartPadding = {
  left: 30,
  top: 10,
  bottom: 30,
  right: 20,
};
