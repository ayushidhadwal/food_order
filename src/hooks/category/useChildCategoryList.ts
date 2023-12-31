import {useEffect} from 'react';
import useSWR from 'swr';

import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../services';
import {ErrMessage} from '../../utils/toastMessages';
import {ChildCategory} from './types';

const fetcher = async (url: string): Promise<ChildCategory[]> => {
  const response = await Axios.get(url);
  const data = response.data.data;
  const status = response.data.status;

  if (status) {
    const childCategory: ChildCategory[] = [];
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        const item = data[property as keyof string];

        childCategory.push({
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
          productExtra: item.extra,
        });
      }
    }
    return childCategory;
  } else {
    throw new Error(response.data.message);
  }
};

export const useChildCategoryList = (id: number) => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.category.getMenuList.replace('{SUBCATEGORY_ID}', String(id)),
    fetcher,
  );
  useEffect(() => {
    if (error?.message) {
      ErrMessage(error.message);
    }
  }, [error?.message]);

  return {
    childCategory: data,
    isError: error,
    isLoading,
  };
};
