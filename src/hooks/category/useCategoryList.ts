import {useEffect} from 'react';
import useSWR from 'swr';

import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../services';
import {ErrMessage} from '../../utils/toastMessages';
import {Category} from './types';

const fetcher = async (url: string): Promise<Category[]> => {
  const response = await Axios.get(url);
  const {data} = response.data;

  const category: Category[] = [];
  for (const property in data) {
    if (data.hasOwnProperty(property)) {
      const item = data[property as keyof string];

      category.push({
        id: item.id,
        categoryName: item.cate_name,
        categoryImage: item.cate_img,
      });
    }
  }
  return category;
};

export const useCategoryList = () => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.category.getCategoryList,
    fetcher,
  );
  useEffect(() => {
    if (error?.message) {
      ErrMessage(error.message);
    }
  }, [error?.message]);

  return {
    category: data,
    isError: error,
    isLoading,
  };
};
