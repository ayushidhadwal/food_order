import React, {FC, useCallback} from 'react';
import {Box, FlatList} from 'native-base';

import {SubCategoryCard} from './components/SubCategoryCard';
import {RootStackScreenProps} from '../../../navigation/types';
import {SubCategory, useSubCategoryList} from '../../../hooks/category';
import {Empty} from '../../../components/common/Empty';
import {Loader} from '../../../components/common/Loader';

type Props = RootStackScreenProps<'SubCategories'>;

export const SubCategoriesScreen: FC<Props> = ({navigation, route}: Props) => {
  const id: number = route.params.categoryId;
  const {isLoading, subCategory} = useSubCategoryList(id);

  const renderItem = useCallback(
    ({item, index}: {item: SubCategory; index: number}) => {
      return (
        <SubCategoryCard
          id={item.id}
          index={index}
          subCategoryName={item.subCategoryName}
          subCategoryImage={item.subCategoryImage}
          onPressHandler={() =>
            navigation.navigate('ChildCategory', {
              screenName: item.subCategoryName,
              childCategoryId: item.id,
            })
          }
        />
      );
    },
    [navigation],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box flex={1} bg={'white'}>
      <FlatList
        data={subCategory}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListEmptyComponent={<Empty />}
        refreshing={isLoading}
      />
    </Box>
  );
};
