import React, {FC} from 'react';
import {HStack, Icon, Input, ScrollView, Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import {RootBottomTabScreenProps} from '../../navigation/types';
import {SnackList} from './components/SnackList';
import {PopularFoodList} from './components/PopularFoodList';
import {LatestFoodList} from './components/LatestFoodList';

type Props = RootBottomTabScreenProps<'Home'>;

export const HomeScreen: FC<Props> = ({}: Props) => {
  return (
    <ScrollView mb={12} flex={1} bgColor={'white'}>
      <Text color={'gray.400'} ml={4} mt={2} fontSize={'sm'}>
        Delivering To
      </Text>
      <HStack>
        <Text bold fontSize={'md'} ml={4} color={'gray.400'}>
          Current Location
        </Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" />
      </HStack>
      <Input
        InputLeftElement={
          <Icon
            as={<Octicons name="search" size={17} style={{paddingLeft: 8}} />}
          />
        }
        w={'90%'}
        variant="filled"
        mt={2}
        size={'lg'}
        alignSelf={'center'}
        placeholder="Search food"
        bgColor={'gray.100'}
      />
      <SnackList />
      <LatestFoodList />
      <PopularFoodList />
    </ScrollView>
  );
};
