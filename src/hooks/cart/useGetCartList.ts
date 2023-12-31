import {useEffect} from 'react';
import useSWR from 'swr';

import {Axios} from '../../lib/Axios';
import {ErrMessage} from '../../utils/toastMessages';
import {ApiEndpoints, CartList} from '../../services';

const fetcher = async (url: string): Promise<CartList[]> => {
  const response = await Axios.get(url);
  const {data} = response.data;
  const list = data.cart_list;

  const cart: CartList[] = [];
  for (const property in list) {
    if (list.hasOwnProperty(property)) {
      const item = list[property as keyof string];

      cart.push({
        id: item.id,
        productId: item.product_id,
        qty: item.qty,
        price: item.price,
        productName: item.product_name,
        productImg: item.product_img,
        productDes: item.product_des,
        productExtra: item.extra,
      });
    }
  }

  return cart;
};

export const useGetCartList = () => {
  const {data, error, isLoading, mutate} = useSWR(
    ApiEndpoints.cart.getCartList,
    fetcher,
  );

  useEffect(() => {
    if (error?.message) {
      ErrMessage(error.message);
    }
  }, [error?.message]);

  return {
    isLoading,
    cartList: data,
    mutate,
  };
};
