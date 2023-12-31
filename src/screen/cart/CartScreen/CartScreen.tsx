import React, {FC, useState, useEffect} from 'react';
import {Box, Button, FlatList, HStack, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';

import {CartItem} from './components/CartItem';
import {RootStackScreenProps} from '../../../navigation/types';
import {useGetCartList} from '../../../hooks/cart';
import {CartList} from '../../../services';
import {Loader} from '../../../components/common/Loader';
import {RemoveCart} from '../../../services/cart/RemoveCart';
import {Empty} from '../../../components/common/Empty';

type Props = RootStackScreenProps<'Cart'>;

export const CartScreen: FC<Props> = ({navigation}: Props) => {
  const {isLoading, cartList, mutate} = useGetCartList();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    let p: number = 0;

    if (cartList && cartList.length > 0) {
      cartList.forEach(c => {
        p += Number(c.price) * Number(c.qty);
      });
    }

    setTotalPrice(p);
  }, [cartList]);

  const removeCart = async (id: number) => {
    try {
      const result = await RemoveCart(id);
      if (result) {
        await mutate(cartList?.filter(cart => Number(cart.id) !== Number(id)));
      }
    } catch (e: any) {
      e?.message;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      edges={['bottom']}>
      {cartList?.length === 0 ? (
        <Empty />
      ) : (
        <>
          <FlatList
            data={cartList}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({item}: {item: CartList}) => (
              <CartItem
                id={item.id}
                productName={item.productName}
                price={item.price}
                productImg={item.productImg}
                qty={item.qty}
                removeCart={removeCart}
                extra={item.productExtra}
              />
            )}
            refreshing={isLoading}
          />
          <Box
            w={'40%'}
            my={2}
            borderTopLeftRadius={5}
            borderBottomLeftRadius={5}
            bgColor={'secondary.300'}
            alignSelf={'flex-end'}>
            <HStack p={3} alignItems={'center'} justifyContent={'center'}>
              <Text fontSize={'md'} color={'white'} bold>
                Total :{' '}
              </Text>
              <Text fontSize={'md'} color={'white'} bold>
                ₹ {totalPrice?.toFixed(2)}
              </Text>
            </HStack>
          </Box>
          <Button
            alignSelf={'center'}
            variant={'solid'}
            colorScheme={'primary'}
            size={'lg'}
            w={'90%'}
            mx={5}
            my={3}
            rounded={8}
            onPress={() =>
              navigation.navigate('ChooseAddress', {totalPrice: totalPrice})
            }>
            Proceed
          </Button>
        </>
      )}
    </SafeAreaView>
  );
};
