import {useEffect} from 'react';
import useSWR from 'swr';

import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../../services';
import {ErrMessage} from '../../utils/toastMessages';
import {SubCategory} from './types';

const fetcher = async (url: string): Promise<SubCategory[]> => {
  const response = await Axios.get(url);
  const {data} = response.data;

  const subCategory: SubCategory[] = [];
  for (const property in data) {
    if (data.hasOwnProperty(property)) {
      const item = data[property as keyof string];

      subCategory.push({
        id: item.id,
        subCategoryName: item.name,
        categoryId: item.cate_id,
        subCategoryImage: item.image,
      });
    }
  }
  return subCategory;
};

export const useSubCategoryList = (id: number) => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.category.getSubCategoryList.replace(
      '{CATEGORY_ID}',
      String(id),
    ),
    fetcher,
  );
  useEffect(() => {
    if (error?.message) {
      ErrMessage(error.message);
    }
  }, [error?.message]);

  return {
    subCategory: data,
    isError: error,
    isLoading,
  };
};
