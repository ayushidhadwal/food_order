import React, {FC} from 'react';
import {FlatList, Heading, HStack, Text, Box, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {FoodList, useGetPopularList} from '../../../hooks/snacks';
import {Loader} from '../../../components/common/Loader';
import {PopularCard} from './PopularCard';
import {RootNavigationProps} from '../../../navigation/types';

type Props = {};

export const PopularFoodList: FC<Props> = ({}: Props) => {
  const {isLoading, popularSnacksList} = useGetPopularList();
  const navigation = useNavigation<RootNavigationProps>();

  const foodItem = ({item, index}: {item: FoodList; index: number}) => {
    return (
      <PopularCard
        key={index}
        name={item.productName}
        type={item.productType}
        category={item.category}
        index={index}
        onPress={() => navigation.navigate('Customize', item)}
        productImage={item.productImage}
      />
    );
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <HStack mt={2} justifyContent={'space-between'}>
        <Heading fontSize={'md'} ml={4} mb={3}>
          Popular Dishes
        </Heading>
        <Pressable onPress={() => navigation.navigate('PopularDishes')}>
          <Text bold color={'gray.400'} mr={4}>
            View all
          </Text>
        </Pressable>
      </HStack>
      <FlatList
        data={popularSnacksList?.slice(1, 4)}
        renderItem={foodItem}
        horizontal={true}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};
