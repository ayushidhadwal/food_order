import React, {FC} from 'react';
import {Divider, Heading, HStack, Text, VStack} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
  id?: number;
  paymentMode?: string;
  amount?: number;
  txnId?: string;
  invoiceId?: string;
  status?: string;
  instruction?: string;
  createdAt?: string | Date;
  userName?: string;
  usersPhone?: string;
  city?: string;
  state?: string;
  house?: string;
  street?: string;
  apartment?: string;
  crossStreet?: string;
  orderItem?: order[];
};
export const OrderDetailCard: FC<Props> = ({
  paymentMode,
  amount,
  txnId,
  invoiceId,
  instruction,
  createdAt,
  usersPhone,
  city,
  state,
  house,
  street,
  apartment,
  crossStreet,
  orderItem,
}: Props) => {
  return (
    <>
      <KeyboardAwareScrollView>
        <Text color={'black'} fontSize={'md'} textTransform={'capitalize'}>
          Your Order
        </Text>
        <VStack p={2} alignSelf={'center'} mt={2} bgColor={'gray.200'}>
          {orderItem?.map(m => (
            <HStack
              p={1}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Text
                fontSize={'sm'}
                w={'45%'}
                textAlign={'left'}
                numberOfLines={2}>
                {m.product_name}
              </Text>
              <Text fontSize={'sm'} w={'20%'} textAlign={'center'}>
                {m.qty}
              </Text>
              <Text
                bold
                fontSize={'sm'}
                color={'secondary.300'}
                w={'35%'}
                textAlign={'right'}>
                ₹ {m.base_price}
              </Text>
            </HStack>
          ))}
        </VStack>
        <HStack mt={5} justifyContent={'space-between'} alignItems={'center'}>
          <Heading fontSize={'sm'}>Sub Total</Heading>
          <Text mr={4} fontSize={'sm'} bold color={'primary.300'}>
            ₹ {amount}
          </Text>
        </HStack>
        <HStack mt={1} justifyContent={'space-between'} alignItems={'center'}>
          <Heading fontSize={'sm'}>Delivery Cost</Heading>
          <Text fontSize={'sm'} bold color={'primary.300'}>
            ₹ {amount}
          </Text>
        </HStack>
        <Divider my={1} alignSelf={'center'} />
        <HStack my={3} justifyContent={'space-between'} alignItems={'center'}>
          <Heading fontSize={'sm'}>Grand Total</Heading>
          <Text fontSize={'md'} bold color={'primary.300'}>
            ₹ {amount}
          </Text>
        </HStack>
        <Divider my={1} alignSelf={'center'} />
        <Text
          color={'black'}
          fontSize={'md'}
          my={3}
          textTransform={'capitalize'}>
          Order Detail
        </Text>
        <Text color={'gray.500'} fontSize={'xs'} bold>
          Order Number
        </Text>
        <Text color={'black'} mb={2} fontSize={'sm'}>
          {invoiceId}
        </Text>
        <Text color={'gray.500'} fontSize={'xs'} bold>
          Date
        </Text>
        <Text color={'black'} mb={2} fontSize={'sm'}>
          {format(new Date(createdAt as string), 'd MMM y , hh:mm a')}
        </Text>
        <Text color={'gray.500'} fontSize={'xs'} bold>
          Transaction Id
        </Text>
        <Text color={'black'} mb={2} fontSize={'sm'}>
          {txnId}
        </Text>
        {usersPhone && (
          <>
            <Text color={'gray.500'} fontSize={'xs'} bold>
              Contact No
            </Text>
            <Text color={'black'} mb={2} fontSize={'sm'}>
              {usersPhone}
            </Text>
          </>
        )}
        <Text color={'gray.500'} fontSize={'xs'} bold>
          Delivery Address
        </Text>
        <Text color={'black'} mb={2} fontSize={'sm'}>
          {house +
            ', ' +
            apartment +
            ', ' +
            street +
            ', ' +
            crossStreet +
            ', ' +
            city +
            ', ' +
            state}
        </Text>
        <Text color={'gray.500'} fontSize={'xs'} bold>
          Payment
        </Text>
        <Text color={'black'} mb={2} fontSize={'sm'}>
          {paymentMode}
        </Text>
        {instruction && (
          <>
            <Text color={'gray.500'} fontSize={'xs'} bold>
              Delivery Instructions
            </Text>
            <Text color={'black'} mb={2} fontSize={'sm'}>
              {instruction}
            </Text>
          </>
        )}
      </KeyboardAwareScrollView>
    </>
  );
};
