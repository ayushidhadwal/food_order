import React from 'react';
import {Box} from 'native-base';
import {ActivityIndicator} from 'react-native';
import {Colors} from '../../styles';

export const Loader = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator color={Colors.primary} />
    </Box>
  );
};
