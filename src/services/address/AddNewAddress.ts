import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {AddressDTO, AddressFormValues} from './types';

export const AddNewAddress = async (
  addressValues: AddressFormValues,
): Promise<AddressDTO> => {
  const {
    userCity,
    userState,
    userHouse,
    userStreet,
    userApartment,
    crossStreet,
  } = addressValues;

  const response = await Axios.post(ApiEndpoints.address.addNewAddress, {
    city: userCity,
    state: userState,
    house: userHouse,
    street: userStreet,
    apartment: userApartment,
    cross_street: crossStreet,
  });
  const {message, data} = response.data;

  if (response.status === 201) {
    return {
      addressId: Number(data.id),
      userCity: data.city,
      userState: data.state,
      userHouse: data.house,
      userStreet: data.street,
      userApartment: data.apartment,
      crossStreet: data.cross_street,
    };
  } else {
    throw new Error(message);
  }
};
