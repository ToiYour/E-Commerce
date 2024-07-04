import { ICustomer } from "./customer";
import { IProduct } from "./product";
import { IVariantsDetail } from "./variant";

export interface IReviews {
  createdAt: string;
  images: string[];
  likes: string[];
  productId: IProduct;
  rating: number;
  review: string;
  selectedVariant: IVariantsDetail;
  updatedAt: string;
  userId: ICustomer;
  _id: string;
}
