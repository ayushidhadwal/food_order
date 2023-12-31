import React, {FC} from 'react';
import {HStack, IconButton, Pressable, Text, VStack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {format} from 'date-fns';

import {ProductExtra} from '../../../../hooks/category';

type order = {
  id: number;
  product_id: number;
  qty: number;
  base_price: number;
  extra: ProductExtra;
  product_name: string;
  product_img: string;
};

type Props = {
  index: number;
  invoiceId: number;
  status: string;
  amount: number;
  createdAt: string;
  onPress: () => void;
  orderItem: order[];
};
export const OrderCard: FC<Props> = ({
  invoiceId,
  amount,
  createdAt,
  onPress,
  index,
  orderItem,
}: Props) => {
  return (
    <Pressable
      p={2}
      alignSelf={'center'}
      mt={index === 0 ? 5 : 0}
      mb={4}
      borderRadius={8}
      bgColor={'white'}
      w={'90%'}
      shadow={2}
      onPress={onPress}>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <HStack>
          <VStack ml={2}>
            <Text fontSize={'xs'}>Invoice Id : #{invoiceId}</Text>
            <Text bold fontSize={'sm'} color={'black'}>
              {orderItem.length} Items
            </Text>
            {orderItem.map(o => (
              <Text fontSize={'xs'} color={'black'}>
                {o.product_name + ' '}
              </Text>
            ))}
            <Text fontSize={'xs'} color={'gray.400'}>
              Order Placed on {format(new Date(createdAt), 'd MMM y , hh:mm a')}
            </Text>
          </VStack>
        </HStack>
        <HStack alignItems={'center'}>
          <Text color={'secondary.300'} fontSize={'md'} bold mr={3}>
            <FontAwesome name="rupee" size={15} color="#002868" />
            {amount}
          </Text>
          <IconButton
            _icon={{
              as: MaterialIcons,
              name: 'arrow-forward-ios',
              color: 'secondary.400',
            }}
            variant="solid"
            bg={'white'}
            size={'sm'}
            colorScheme={'white'}
            alignItems={'flex-end'}
            shadow={4}
            mr={-5}
            borderRadius="full"
          />
        </HStack>
      </HStack>
    </Pressable>
  );
};
