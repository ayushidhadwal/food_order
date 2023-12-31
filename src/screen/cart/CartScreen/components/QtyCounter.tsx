import React, {FC, useState} from 'react';
import {HStack, Pressable, Text} from 'native-base';
import {ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {FoodQty, UpdateFoodQty} from '../../../../services';
import {ErrMessage} from '../../../../utils/toastMessages';
import {useGetCartList} from '../../../../hooks/cart';

export const QtyCounter: FC<FoodQty> = ({id, qty}: FoodQty) => {
  const {cartList, mutate} = useGetCartList();
  const [loading, setLoading] = useState<boolean>(false);

  const updateQty = async (value: string) => {
    setLoading(true);
    let q: number;
    if (value === 'add') {
      q = qty + 1;
    } else {
      q = qty - 1;
    }
    try {
      const result = await UpdateFoodQty(id, q);
      if (result && cartList) {
        const index: number | undefined = cartList?.findIndex(
          a => Number(a.id) === Number(id),
        );
        if (index && index > -1) {
          cartList[index].qty = q;
        }
        await mutate([...cartList]);
      }
    } catch (e: any) {
      setLoading(false);
      ErrMessage(e.message);
    }
    setLoading(false);
  };

  return (
    <HStack
      bg={'secondary.400'}
      alignItems={'center'}
      rounded={10}
      position="absolute"
      bottom={0}
      right={0}
      py={1}>
      <Pressable px={1} onPress={() => updateQty('add')}>
        <Ionicons name={'add'} size={20} color={'white'} />
      </Pressable>
      {loading ? (
        <ActivityIndicator color={'white'} size={'small'} />
      ) : (
        <Text color={'white'} px={1} fontSize={'sm'}>
          {qty}
        </Text>
      )}
      <Pressable
        px={1}
        rounded={10}
        onPress={() => qty >= 1 && updateQty('sub')}>
        <AntDesign name="minus" size={20} color="white" />
      </Pressable>
    </HStack>
  );
};
