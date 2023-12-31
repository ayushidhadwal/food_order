import React, {FC, useCallback, useState} from 'react';
import {Box, Button, HStack, Image, Text, VStack} from 'native-base';

import Config from '../../../../config';
import {AddToCart} from '../../../../services';
import {ErrMessage, SuccessMessage} from '../../../../utils/toastMessages';
import {Messages} from '../../../../constants';

type Props = {
  id: number;
  index: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
  productType: string;
  onPressHandler: () => void;
};

export const ChildCategoryCard: FC<Props> = ({
  index,
  productName,
  productDescription,
  productPrice,
  productImage,
  productType,
  onPressHandler,
  id,
  productQuantity,
}: Props) => {
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
    <Box
      w={'90%'}
      alignSelf={'center'}
      bg={'white'}
      mt={index === 0 ? 6 : 0}
      py={2}
      shadow={2}
      mb={2}
      rounded={10}>
      <HStack alignItems={'center'} pl={2}>
        <Box w={'25%'} h={90}>
          <Image
            source={{uri: Config.API_URL + productImage}}
            w={'100%'}
            h={'100%'}
            rounded={10}
            resizeMode={'cover'}
            alt={'img'}
          />
        </Box>
        <Box pl={2} w={'75%'}>
          <HStack>
            <VStack w={'60%'}>
              <Text fontWeight={'700'} fontSize={'lg'} color={'primary.600'}>
                {productName}
              </Text>
              <Text fontWeight={'400'} fontSize={'xs'} numberOfLines={2}>
                {productDescription}
              </Text>
              <Text fontWeight={'400'} fontSize={'sm'} color={'black'}>
                Type: {productType}
              </Text>
              <Text
                mt={1}
                fontWeight={'700'}
                fontSize={'lg'}
                color={'green.800'}>
                ₹ {productPrice}
              </Text>
            </VStack>
            <VStack justifyContent={'space-between'} my={2} w={'40%'}>
              <Button
                size={'xs'}
                onPress={onPressHandler}
                variant={'Subtle'}
                rounded={0}
                bg={'gray.300'}
                alignSelf={'flex-end'}>
                customize +
              </Button>
              {!added ? (
                <Button
                  size={'xs'}
                  onPress={() => addHandler()}
                  w={'60%'}
                  rounded={0}
                  isDisabled={loading}
                  isLoading={loading}
                  alignSelf={'flex-end'}
                  variant={'solid'}
                  colorScheme={'primary'}>
                  Add +
                </Button>
              ) : (
                <Button
                  size={'xs'}
                  w={'60%'}
                  rounded={0}
                  isDisabled={loading}
                  isLoading={loading}
                  alignSelf={'flex-end'}
                  variant={'solid'}
                  colorScheme={'green'}>
                  Added
                </Button>
              )}
            </VStack>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};
