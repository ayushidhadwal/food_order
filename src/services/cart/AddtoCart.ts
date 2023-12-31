import {Axios} from '../../lib/Axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {addCart} from './types';

export const AddToCart = async (cartValue: addCart): Promise<boolean> => {
  const {id, quantity, productPrice, obj} = cartValue;

  const response = await Axios.post(ApiEndpoints.cart.addToCart, {
    product_id: id,
    qty: quantity,
    price: productPrice,
    extra: obj,
  });

  if (response.data.status) {
    return true;
  } else {
    throw new Error(response.data.msg);
  }
};
