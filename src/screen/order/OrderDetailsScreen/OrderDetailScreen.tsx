import React, {FC} from 'react';
import {Box} from 'native-base';

import {OrderDetailCard} from './components/OrderDetailCard';
import {useOrderDetails} from '../../../hooks/order';
import {Loader} from '../../../components/common/Loader';
import {RootStackScreenProps} from '../../../navigation/types';

type Props = RootStackScreenProps<'OrderDetail'>;

export const OrderDetailScreen: FC<Props> = ({route}: Props) => {
  const id: number = route.params.id;
  const {isLoading, orderDetails} = useOrderDetails(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box bgColor={'white'} flex={1} p={3}>
      <OrderDetailCard
        amount={orderDetails?.amount}
        apartment={orderDetails?.apartment}
        city={orderDetails?.city}
        createdAt={orderDetails?.createdAt}
        crossStreet={orderDetails?.crossStreet}
        house={orderDetails?.house}
        id={orderDetails?.id}
        instruction={orderDetails?.instruction}
        invoiceId={orderDetails?.invoiceId}
        paymentMode={orderDetails?.paymentMode}
        state={orderDetails?.state}
        status={orderDetails?.status}
        street={orderDetails?.street}
        txnId={orderDetails?.txnId}
        userName={orderDetails?.userName}
        orderItem={orderDetails?.orderItem}
        usersPhone={orderDetails?.usersPhone}
      />
    </Box>
  );
};
