import {ChildCategory, ProductExtra} from '../category';

type order = {
  id: number;
  product_id: number;
  qty: number;
  base_price: number;
  extra: ProductExtra;
  product_name: string;
  product_img: string;
};

export type OrderList = {
  id: number;
  invoiceId: number;
  amount: number;
  status: string;
  createdAt: string;
  orderItem: order[];
};

export type OrderDetailsList = {
  id: number;
  paymentMode: string;
  amount: number;
  txnId: string;
  invoiceId: string;
  status: string;
  instruction: string;
  createdAt: string;
  userName: string;
  usersPhone: string;
  city: string;
  state: string;
  house: string;
  street: string;
  apartment: string;
  crossStreet: string;
  orderItem: order[];
};
