import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store, {persistor} from './src/calorie-tracker-app/core/store';
import RootStackScreen from './src/calorie-tracker-app/AppNavigation';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate bootstrapped={true} persistor={persistor}>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
