import React from 'react';

import { createAppContainer } from 'react-navigation';
import AppNavigator from './app/navigation';

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  console.disableYellowBox = true;
  return <AppContainer />;
};

export default App;
