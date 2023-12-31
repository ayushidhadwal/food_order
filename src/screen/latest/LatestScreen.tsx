import React, {FC} from 'react';
import {Box, Button, FlatList, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {LatestCard} from '../home/components/LatestCard';
import {
  RootBottomTabScreenProps,
  RootNavigationProps,
} from '../../navigation/types';
import {FoodList, useGetMostPopularList} from '../../hooks/snacks';
import {Loader} from '../../components/common/Loader';

type Props = RootBottomTabScreenProps<'Latest'>;

export const LatestScreen: FC<Props> = ({}: Props) => {
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
    <Box flex={1} bg={'white'}>
      <FlatList
        data={mostPopularList}
        style={{marginBottom: 70}}
        ListHeaderComponent={() => {
          return (
            <>
              <Text px={5} pt={5}>
                Lorem ipsum dolor sit amet
              </Text>
              <Button
                variant={'solid'}
                colorScheme={'primary'}
                size={'sm'}
                w={'30%'}
                mx={5}
                my={7}
                rounded={10}>
                Lorem ipsum
              </Button>
            </>
          );
        }}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default LatestScreen;
