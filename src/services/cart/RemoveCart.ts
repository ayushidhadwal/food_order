import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../ApiEndpoints';

export const RemoveCart = async (id: number): Promise<boolean> => {
  const response = await Axios.post(ApiEndpoints.cart.removeCart, {
    cart_id: id,
  });

  return response.data.status;
};
