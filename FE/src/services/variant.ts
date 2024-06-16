import { IVariant } from "@/interfaces/variant";
import instance from "@/config/instance";

export const createVariant = (data: IVariant) => {
  const uri = "/variant";
  return instance.post(uri, data);
};
