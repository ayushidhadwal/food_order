import {useEffect} from 'react';
import useSWR from 'swr';

import {Axios} from '../../lib/Axios';
import {ErrMessage} from '../../utils/toastMessages';
import {ApiEndpoints} from '../../services';
import {FoodList} from './type';

const fetcher = async (url: string): Promise<FoodList[]> => {
  const response = await Axios.get(url);
  const list = response.data.Data;

  const snacks: FoodList[] = [];
  for (const property in list) {
    if (list.hasOwnProperty(property)) {
      const item = list[property as keyof string];

      snacks.push({
        id: item.id,
        productName: item.product_name,
        productImage: item.product_img,
        productDescription: item.product_des,
        productQuantity: item.qty,
        productPrice: item.price,
        productTax: item.tax,
        productSize: item.size,
        productType: item.type,
        productAddon: item.addon,
        productExtra: JSON.parse(item.extra),
        category: item.categories_name,
        subCategory: item.sub_categories_name,
      });
    }
  }

  return snacks;
};

export const useGetMostPopularList = () => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.snacks.getLatestFoodList,
    fetcher,
  );

  useEffect(() => {
    if (error?.message) {
      ErrMessage(error.message);
    }
  }, [error?.message]);

  return {
    isLoading,
    mostPopularList: data,
    isError: error,
  };
};
