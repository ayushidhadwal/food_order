import {useEffect} from 'react';
import useSWR from 'swr';

import {Axios} from '../../lib/Axios';
import {AddressDTO, ApiEndpoints} from '../../services';
import {ErrMessage} from '../../utils/toastMessages';

const fetcher = async (url: string): Promise<AddressDTO[]> => {
  const response = await Axios.get(url);

  const data = response.data.address;

  const address: AddressDTO[] = [];
  for (const property in data) {
    if (data.hasOwnProperty(property)) {
      const item = data[property as keyof string];

      address.push({
        addressId: item.id,
        userCity: item.city,
        userState: item.state,
        userHouse: item.house,
        userStreet: item.street,
        userApartment: item.apartment,
        crossStreet: item.cross_street,
      });
    }
  }

  return address;
};

export const useAddressList = () => {
  const {data, error, isLoading, mutate} = useSWR(
    ApiEndpoints.address.getAddressList,
    fetcher,
  );

  useEffect(() => {
    if (error?.message) {
      ErrMessage(error.message);
    }
  }, [error?.message]);

  return {
    addressList: data,
    mutate,
    isError: error,
    isLoading,
  };
};
