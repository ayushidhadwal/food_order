import React from 'react';
import {Box, Text} from 'native-base';

export const Empty = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="md" color="muted.400">
        No Data
      </Text>
    </Box>
  );
};
