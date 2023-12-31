import React, {FC, useCallback, useState} from 'react';
import {Button, HStack, Icon, Pressable, Text, VStack} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {ImageBackground} from 'react-native';

import Config from '../../../config';
import {AddToCart} from '../../../services';
import {ErrMessage, SuccessMessage} from '../../../utils/toastMessages';
import {Messages} from '../../../constants';

type Props = {
  name: string;
  type: string;
  category: string;
  productImage: String;
  onPress: () => void;
  index: number;
  productQuantity: number;
  productPrice: number;
  id: number;
};

export const LatestCard: FC<Props> = ({
  index,
  name,
  type,
  category,
  productImage,
  onPress,
  productQuantity,
  productPrice,
  id,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);
  // const [cartId, setCartId] = useState<number>(0);

  // const {isLoading, cartList} = useGetCartList();

  const quantity = productQuantity === 0 ? 1 : productQuantity;

  const addHandler = useCallback(async () => {
    setLoading(true);
    const obj = {};
    try {
      const result = await AddToCart({
        id,
        quantity,
        productPrice,
        obj,
      });
      setLoading(false);
      if (result) {
        // if (cartList) {
        //   const x = cartList?.findIndex(
        //     cart => Number(cart.productId) === Number(id),
        //   );
        //   console.log('x', x);
        //   if (x > -1) {
        //     console.log('cartList[x].id', cartList[x].id);
        //     setCartId(cartList[x].id);
        //   }
        // }
        SuccessMessage(Messages.AddToCart);
        setAdded(true);
      }
    } catch (e: any) {
      setLoading(false);
      setAdded(false);
      ErrMessage(e.message);
    }
  }, [id, productPrice, quantity]);
  return (
    <Pressable
      onPress={onPress}
      w={'90%'}
      alignSelf={'center'}
      mb={3}
      mt={index === 0 ? 5 : 0}>
      <ImageBackground
        source={{uri: Config.API_URL + productImage}}
        resizeMode={'cover'}
        style={{width: '100%', height: 175, borderRadius: 20}}>
        <VStack justifyContent={'space-between'} h={'100%'} py={2}>
          <Button
            alignSelf={'flex-end'}
            variant={'Subtle'}
            rounded={0}
            bg={'gray.300'}
            size={'sm'}
            w={'30%'}
            onPress={onPress}>
            Customise +
          </Button>
          {!added ? (
            <Button
              onPress={() => addHandler()}
              alignSelf={'flex-end'}
              size={'sm'}
              variant={'solid'}
              colorScheme={'primary'}
              right={0}
              w={'20%'}
              rounded={0}>
              Add +
            </Button>
          ) : (
            <Button
              alignSelf={'flex-end'}
              size={'sm'}
              variant={'solid'}
              colorScheme={'green'}
              right={0}
              w={'20%'}
              rounded={0}>
              Added
            </Button>
          )}
        </VStack>
      </ImageBackground>
      <Text fontWeight={'700'} my={0.5} color={'secondary.400'}>
        {name}
      </Text>
      <HStack alignItems={'center'}>
        <Text color={'muted.600'} fontWeight={'500'}>
          {type}
        </Text>
        <Icon as={Entypo} name={'dot-single'} color={'primary.400'} />
        <Text color={'muted.600'} fontWeight={'500'}>
          {category}
        </Text>
      </HStack>
    </Pressable>
  );
};
