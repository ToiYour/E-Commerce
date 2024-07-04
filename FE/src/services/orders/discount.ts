import instance from "@/config/instance";
import { IDiscount } from "@/interfaces/order";
export const createDiscount = (data: IDiscount) => {
  const uri = "/discount";
  return instance.post(uri, data);
};
export const getDiscountStillValidByIdUser = () => {
  const uri = "/discount/getDiscountStillValidByIdUser";
  return instance.get(uri);
};
