import {ProductExtra} from '../../hooks/category';

export type CartList = {
  id: number;
  productId: number;
  qty: number;
  price: number;
  productName: string;
  productImg: string;
  productDes?: string;
  productExtra?: ProductExtra;
};

export type FoodQty = {
  id: number;
  qty: number;
};

export type addCart = {
  id: number;
  quantity: number;
  productPrice: number;
  obj: ProductExtra;
};
