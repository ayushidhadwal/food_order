import React, {FC} from 'react';
import {
  FlatList,
  Heading,
  HStack,
  Text,
  ScrollView,
  Pressable,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {LatestCard} from './LatestCard';
import {FoodList, useGetMostPopularList} from '../../../hooks/snacks';
import {RootNavigationProps} from '../../../navigation/types';
import {Loader} from '../../../components/common/Loader';

type Props = {};
export const LatestFoodList: FC<Props> = ({}: Props) => {
  const {isLoading, mostPopularList} = useGetMostPopularList();
  const navigation = useNavigation<RootNavigationProps>();
  const foodItemHorizontal = ({
    item,
    index,
  }: {
    item: FoodList;
    index: number;
  }) => {
    return (
      <LatestCard
        index={index}
        name={item.productName}
        type={item.productType}
        category={item.category}
        onPress={() => navigation.navigate('Customize', item)}
        productImage={item.productImage}
        productQuantity={item.productQuantity}
        productPrice={item.productPrice}
        id={item.id}
      />
    );
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView>
      <HStack justifyContent={'space-between'}>
        <Heading fontSize={'md'} ml={4}>
          Most Popular
        </Heading>
        <Pressable onPress={() => navigation.navigate('Latest')}>
          <Text bold color={'gray.400'} mr={4}>
            View all
          </Text>
        </Pressable>
      </HStack>
      <FlatList
        data={mostPopularList?.slice(1, 4)}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={foodItemHorizontal}
      />
    </ScrollView>
  );
};
