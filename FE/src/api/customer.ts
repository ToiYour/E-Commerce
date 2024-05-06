import { ICustomer } from "@/interfaces/customer";
import instance from "./instance";

export const createCustomer = (data: ICustomer) => {
  const uri = "/customer";
  return instance.post(uri, data);
};
export const updateCustomer = (id: string | number, data: ICustomer) => {
  const uri = "/customer/" + id;
  return instance.put(uri, data);
};
export const getAllCustomer = (search: string) => {
  const uri = "/customer" + search;
  return instance.get(uri);
};
export const getByIdCustomer = (id: string | number) => {
  const uri = "/customer/" + id;
  return instance.get(uri);
};
// Xoá vĩnh viễn
export const deleteCustomer = (id: string | number) => {
  const uri = "/customer/" + id;
  return instance.delete(uri);
};
// Xoá vĩnh viễn all
export const deleteAllCustomer = (CustomerIds: string[]) => {
  const uri = "/customer/delete-forever";
  return instance.post(uri, CustomerIds);
};
//Cập nhập account status
export const updateAccountStatus = (CustomerIds: string, data: boolean) => {
  const uri = "/customer/update-status/" + CustomerIds;
  return instance.patch(uri, { status: data });
};
