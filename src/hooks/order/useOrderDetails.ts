import {useEffect} from 'react';
import useSWR from 'swr';

import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../services';
import {ErrMessage} from '../../utils/toastMessages';
import {OrderDetailsList} from './types';

const fetcher = async (url: string): Promise<OrderDetailsList> => {
  const response = await Axios.get(url);

  if (response.data.status) {
    const {
      id,
      payment_mode,
      pay_amount,
      txn_id,
      invoice_id,
      status,
      instruction,
      created_at,
      uname,
      users_phone,
      city,
      state,
      house,
      street,
      apartment,
      cross_street,
      OrderItem,
    } = response.data.Data;

    return {
      id: id,
      paymentMode: payment_mode,
      amount: pay_amount,
      txnId: txn_id,
      invoiceId: invoice_id,
      status: status,
      instruction: instruction,
      createdAt: created_at,
      userName: uname,
      city: city,
      state: state,
      usersPhone: users_phone,
      house: house,
      street: street,
      apartment: apartment,
      crossStreet: cross_street,
      orderItem: OrderItem,
    };
  } else {
    throw new Error('No data');
  }
};

export const useOrderDetails = (id: number) => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.order.getOrderDetails.replace('{ORDER_ID}', String(id)),
    fetcher,
  );
  useEffect(() => {
    if (error?.message) {
      ErrMessage(error.message);
    }
  }, [error?.message]);

  return {
    orderDetails: data,
    isError: error,
    isLoading,
  };
};
