import React, {FC} from 'react';
import {Box, FlatList} from 'native-base';

import {OrderCard} from './components/OrderCard';
import {OrderList, useOrderList} from '../../../hooks/order';
import {Loader} from '../../../components/common/Loader';
import {RootBottomTabScreenProps} from '../../../navigation/types';

type Props = RootBottomTabScreenProps<'Order'>;

export const OrderScreen: FC<Props> = ({navigation}: Props) => {
  const {isLoading, orderList} = useOrderList();

  const renderItem = ({item, index}: {item: OrderList; index: number}) => (
    <OrderCard
      index={index}
      invoiceId={item.invoiceId}
      createdAt={item.createdAt}
      amount={item.amount}
      onPress={() => navigation.navigate('OrderDetail', {id: item.id})}
      status={item.status}
      orderItem={item.orderItem}
    />
  );
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box bgColor={'white'} flex={1}>
      <FlatList
        data={orderList}
        style={{marginBottom: 90}}
        renderItem={renderItem}
        keyExtractor={item => item.invoiceId.toString()}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};
