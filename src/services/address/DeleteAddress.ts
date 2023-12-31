import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../ApiEndpoints';

export const DeleteAddress = async (id: number): Promise<boolean> => {
  const response = await Axios.get(
    ApiEndpoints.address.deleteAddress.replace('{ADDRESS_ID}', String(id)),
  );

  const status = response.status;
  return status === 201;
};
