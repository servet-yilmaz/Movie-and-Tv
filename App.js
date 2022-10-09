import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigationContainer from './src/Router/AppNavigationContainer';
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={ MyTheme }>
      <AppNavigationContainer />
    </NavigationContainer>
  )
}

export default App;
