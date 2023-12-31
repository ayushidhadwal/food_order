import React, {FC} from 'react';
import {FlatList, ScrollView} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {FoodList, useGetSnacksList} from '../../../hooks/snacks';
import {SnacksCard} from './SnacksCard';
import {Loader} from '../../../components/common/Loader';
import {RootNavigationProps} from '../../../navigation/types';

type Props = {};

export const SnackList: FC<Props> = ({}: Props) => {
  const {isLoading, snacksList} = useGetSnacksList();
  const navigation = useNavigation<RootNavigationProps>();

  const renderItem = ({item, index}: {item: FoodList; index: number}) => (
    <SnacksCard
      key={index}
      index={index}
      productName={item.productName}
      productImage={item.productImage}
      onPress={() => navigation.navigate('Customize', item)}
    />
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView>
      <FlatList
        data={snacksList}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        horizontal={true}
      />
    </ScrollView>
  );
};
