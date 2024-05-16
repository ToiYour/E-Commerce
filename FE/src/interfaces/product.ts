import { ICategory } from "./category";
import { IVariant, IVariantsDetail } from "./variant";

export interface IFormProduct {
  category?: string;
  desc?: string;
  images?: FileList;
  name?: string;
  price?: number;
  variants?: IVariant[];
  status?: boolean;
  brand?: string;
}
export interface IProduct {
  status?: boolean;
  slug?: string;
  _id?: string;
  brand?: string;
  name?: string;
  category?: ICategory[];
  desc?: string;
  price?: number;
  images?: string[];
  variants: IVariantsDetail[];
  views?: number;
  deleted?: boolean;
  totalStock?: number;
  createdAt?: string;
  updatedAt?: string;
}
