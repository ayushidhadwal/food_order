import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {LoginScreen} from '../screen/auth/LoginScreen';
import {RegisterScreen} from '../screen/auth/RegisterScreen';
import {GetStartedScreen} from '../screen/get-started/GetStartedScreen';
import {WelcomeScreen} from '../screen/get-started/WelcomeScreen';
import ForgotPasswordScreen from '../screen/forgot-password/forgotpasswordScreen/ForgotPasswordScreen';
import NewPasswordScreen from '../screen/forgot-password/NewpasswordScreen/NewPasswordScreen';
import VerifyScreen from '../screen/forgot-password/VerifyScreen/VerifyScreen';

import {AuthStackParamsList} from './types';

const Stack = createNativeStackNavigator<AuthStackParamsList>();

function AuthStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={'GetStarted'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigation;
