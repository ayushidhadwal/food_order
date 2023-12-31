import {useEffect} from 'react';
import useSWR from 'swr';

import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../services';
import {ErrMessage} from '../../utils/toastMessages';
import {OrderList} from './types';
// import {ChildCategory} from '../category';

const fetcher = async (url: string): Promise<OrderList[]> => {
  const response = await Axios.get(url);
  const data = response.data.Data;

  const order: OrderList[] = [];
  for (const property in data) {
    if (data.hasOwnProperty(property)) {
      const item = data[property as keyof string];

      // const list: ChildCategory[] = [];
      // for (const prop in item.orderItem) {
      //   if (item.orderItem.hasOwnProperty(prop)) {
      //     const ord = item.orderItem[prop as keyof string];

      order.push({
        id: item.id,
        invoiceId: item.invoice_id,
        amount: item.pay_amount,
        status: item.status,
        createdAt: item.created_at,
        orderItem: item.OrderItem,
        //   list.push({
        //   id: ord.id,
        //   productName: ord.product_name,
        //   productImage: ord.product_img,
        //   productDescription: ord.product_des,
        //   productQuantity: ord.qty,
        //   productPrice: ord.price,
        //   productTax: ord.tax,
        //   productSize: ord.size,
        //   productType: ord.type,
        //   productAddon: ord.addon,
        //   productExtra: ord.extra,
        // }),
      });
      //     }
      //   }
    }
  }
  return order;
};

export const useOrderList = () => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.order.getOrderList,
    fetcher,
  );
  useEffect(() => {
    if (error?.message) {
      ErrMessage(error.message);
    }
  }, [error?.message]);

  return {
    orderList: data,
    isError: error,
    isLoading,
  };
};
