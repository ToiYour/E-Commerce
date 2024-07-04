import { IProduct } from "./product";
import { IVariantsDetail } from "./variant";

export interface ICart {
  _id: string;
  totalPrice: number;
  totalQuantity: number;
  userId: string;
  items: ICartItem[];
  createdAt: string;
  updatedAt: string;
}
export interface ICartItem {
  productId: IProduct;
  quantity: number;
  selectedVariant: IVariantsDetail;
  _id: string;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  totalQuantity: number;
}
