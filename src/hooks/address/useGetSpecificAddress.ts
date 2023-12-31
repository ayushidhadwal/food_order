import {useEffect} from 'react';
import useSWR from 'swr';

import {Axios} from '../../lib/Axios';
import {AddressDTO, ApiEndpoints} from '../../services';
import {ErrMessage} from '../../utils/toastMessages';

const fetcher = async (url: string): Promise<AddressDTO[]> => {
  const response = await Axios.get(url);
  return response.data.data[0];
};

export const GetSpecificAddress = (id: number) => {
  const {data, error, isLoading} = useSWR(
    ApiEndpoints.address.getParticularAddressList.replace(
      '{ADDRESS_ID}',
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
    address: data,
    isError: error,
    isLoading,
  };
};
