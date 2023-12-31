import React, {FC} from 'react';
import {Box, FlatList, Text} from 'native-base';

import {ChildCategoryCard} from './components/ChildCategoryCard';
import {RootStackScreenProps} from '../../../navigation/types';
import {ChildCategory, useChildCategoryList} from '../../../hooks/category';
import {Loader} from '../../../components/common/Loader';

type Props = RootStackScreenProps<'ChildCategory'>;

export const ChildCategoryScreen: FC<Props> = ({navigation, route}: Props) => {
  const id: number = route.params.childCategoryId;

  const {isLoading, childCategory} = useChildCategoryList(id);

  const renderItem = ({item, index}: {item: ChildCategory; index: number}) => (
    <ChildCategoryCard
      key={index}
      id={item.id}
      index={index}
      productName={item.productName}
      productDescription={item.productDescription}
      productPrice={item.productPrice}
      productImage={item.productImage}
      productType={item.productType}
      productQuantity={item.productQuantity}
      onPressHandler={() => navigation.navigate('Customize', item)}
    />
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box flex={1} bg={'white'}>
      <FlatList
        data={childCategory}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        refreshing={isLoading}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text fontSize="md" color="muted.400">
              No Data
            </Text>
          </Box>
        }
      />
    </Box>
  );
};
