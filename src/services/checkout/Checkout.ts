import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {CheckoutDTO} from './types';

export const Checkout = async ({
  totalPrice,
  addressId,
  instruction,
  payment,
}: CheckoutDTO): Promise<boolean> => {
  const response = await Axios.post(ApiEndpoints.checkout.checkoutUrl, {
    type: payment,
    total: totalPrice,
    instruction: instruction,
    address_id: addressId,
  });

  return response.data.status;
};
