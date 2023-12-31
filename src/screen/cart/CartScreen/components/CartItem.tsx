import React, {FC, useState} from 'react';
import {
  Box,
  Divider,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Config from '../../../../config';
import {QtyCounter} from './QtyCounter';
import {ProductExtra} from '../../../../hooks/category';

type Props = {
  id: number;
  productName: string;
  price: number;
  productImg: string;
  qty: number;
  removeCart: (cartId: number) => Promise<void>;
  extra?: ProductExtra;
};
export const CartItem: FC<Props> = ({
  id,
  productName,
  price,
  productImg,
  qty,
  removeCart,
  extra,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [itemId, setItemId] = useState<number>(0);

  return (
    <HStack justifyContent={'center'}>
      <Box
        p={2}
        alignSelf={'center'}
        mt={4}
        borderRadius={8}
        bgColor={'white'}
        w={'90%'}
        shadow={2}>
        <HStack>
          <Image
            borderRadius={8}
            source={{
              uri: Config.IMG_URL + '/' + productImg,
            }}
            alt={'no img'}
            resizeMode={'cover'}
            size={'sm'}
          />
          <HStack w={'60%'} justifyContent={'space-between'}>
            <VStack ml={3}>
              <Text fontWeight={500} mt={2} fontSize={'sm'} numberOfLines={2}>
                {productName}
              </Text>
              <Text fontSize={'md'} bold color={'secondary.300'} pt={2}>
                {'₹ ' + price}
              </Text>
            </VStack>
          </HStack>
          <QtyCounter qty={qty} id={id} />
          <AntDesign
            name="closecircle"
            size={20}
            color={'#bf0a30'}
            style={{position: 'absolute', top: 0, right: 0}}
            onPress={() => removeCart(id)}
          />
        </HStack>
        {extra && (
          <>
            <Divider mt={2} />
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Text color={'gray.500'} bold py={1}>
                Extra's
              </Text>
              <IconButton
                size={'xs'}
                variant="solid"
                colorScheme={'muted'}
                bg={'gray.400'}
                p={1}
                _icon={{
                  as: MaterialIcons,
                  name: show ? 'keyboard-arrow-up' : 'keyboard-arrow-down',
                  size: 4,
                }}
                onPress={() => {
                  setShow(!show);
                  setItemId(id);
                }}
              />
            </HStack>
            {show && itemId === id && (
              <VStack mb={2}>
                {Object.entries(extra).map(([key, value]) => (
                  <Text fontSize={'xs'} key={key}>
                    {key}: {value}
                  </Text>
                ))}
              </VStack>
            )}
          </>
        )}
      </Box>
    </HStack>
  );
};
