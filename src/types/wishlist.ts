import { Product } from "./product";

export interface wishlistResponse {
  status: string;
  message?: string;
  count: number;
  data: Product[] | string[];
}
