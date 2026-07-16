import { Brand } from "./brand";
import { Category } from "./category";
export interface Cart {
  _id?: string;
  cartOwner?: string;
  products: CartProduct[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  totalCartPrice: number;
}
export interface CartProduct {
  count: number;
  _id: string;
  product: {
    _id: string;
    title: string;
    slug: string;
    quantity: number;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    id: string;
  };
  price: number;
}
export interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string | null;
  data: Cart;
}