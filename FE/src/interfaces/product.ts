import { ICategory } from "./category";
import { IColor } from "./color";
import { ISize } from "./size";
import { IVariant } from "./variant";

export interface IFormProduct {
  category?: string;
  desc?: string;
  images?: FileList;
  name?: string;
  price?: number;
  variants?: IVariant[];
}
export interface IProduct {
  status?: boolean;
  _id?: string;
  name?: string;
  category?: ICategory[];
  desc?: string;
  price?: number;
  images?: string[];
  variants: {
    _id?: string;
    extra_price?: number;
    stock?: number;
    colorId?: IColor;
    sizeId?: ISize;
  }[];
  views?: number;
  deleted?: boolean;
  totalStock?: number;
  createdAt?: string;
  updatedAt?: string;
}
