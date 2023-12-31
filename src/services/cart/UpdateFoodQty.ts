import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../ApiEndpoints';

export const UpdateFoodQty = async (
  id: number,
  q: number,
): Promise<boolean> => {
  const response = await Axios.post(ApiEndpoints.cart.qtyUpdate, {
    cart_id: id,
    qty: q,
  });

  const status = response.data.status;

  if (status) {
    return status;
  } else {
    throw new Error(response.data.message);
  }
};
