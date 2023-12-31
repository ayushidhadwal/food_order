import React, {useContext} from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';

import AuthStackNavigation from './AuthStackNavigation';
import RootStackNavigation from './RootStackNavigation';
import {Colors} from '../styles';
import {AuthContext} from '../contexts/auth';

const NavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    primary: Colors.primary,
  },
};

export default () => {
  const {state} = useContext(AuthContext);

  return (
    <NavigationContainer theme={NavigationTheme}>
      {state.accessToken && state.expireIn ? (
        <RootStackNavigation />
      ) : (
        <AuthStackNavigation />
      )}
    </NavigationContainer>
  );
};
