import React, {FC} from 'react';
import {Box, HStack, Text, VStack} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {RootStackScreenProps} from '../../../navigation/types';

type Props = RootStackScreenProps<'Notification'>;

export const NotificationScreen: FC<Props> = ({}: Props) => {
  return (
    <Box bgColor={'white'} p={4} flex={1}>
      <VStack>
        <HStack mt={3}>
          <FontAwesome name="circle" size={12} color="#87112a" />
          <Text ml={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Text>
        </HStack>
        <HStack mt={3}>
          <FontAwesome name="circle" size={12} color="#87112a" />
          <Text ml={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Text>
        </HStack>
        <HStack mt={3}>
          <FontAwesome name="circle" size={12} color="#87112a" />
          <Text ml={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};
