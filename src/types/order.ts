import { CartProduct } from "./cart";

export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartProduct[];
  createdAt: string;
  updatedAt: string;
  id: number;
}
export interface ShippingAddress {
  city: string;
  details: string;
  phone: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export type OrdersResponse = Order[];
