import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Button title={'Add New Food Item'} style={styles.buttonStyle} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    padding: 10,
  },
});
