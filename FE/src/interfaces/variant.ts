import { IColor } from "./color";
import { ISize } from "./size";

export interface IVariant {
  _id?: string;
  colorId?: string;
  extra_price?: number;
  sizeId?: string;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface IVariantsDetail {
  _id?: string;
  extra_price?: number;
  stock?: number;
  deleted?: boolean;
  colorId?: IColor;
  sizeId?: ISize;
}
