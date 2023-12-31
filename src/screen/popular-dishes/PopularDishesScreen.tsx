import React, {FC} from 'react';
import {FlatList} from 'react-native';
import {Box} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {FoodList, useGetMostPopularList} from '../../hooks/snacks';
import {Loader} from '../../components/common/Loader';
import {
  RootNavigationProps,
  RootStackScreenProps,
} from '../../navigation/types';
import {LatestCard} from '../home/components/LatestCard';

type Props = RootStackScreenProps<'PopularDishes'>;

export const PopularDishesScreen: FC<Props> = ({}: Props) => {
  const {isLoading, mostPopularList} = useGetMostPopularList();
  const navigation = useNavigation<RootNavigationProps>();

  const renderItem = ({item, index}: {item: FoodList; index: number}) => {
    return (
      <LatestCard
        key={index}
        index={index}
        name={item.productName}
        type={item.productType}
        category={item.category}
        onPress={() => navigation.navigate('Customize', item)}
        productImage={item.productImage}
      />
    );
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box flex={1} bg={'white'}>
      <FlatList
        data={mostPopularList}
        keyExtractor={item => String(item)}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </Box>
  );
};
