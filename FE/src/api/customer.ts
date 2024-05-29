import { ICustomer } from "@/interfaces/customer";
import instance from "./instance";

export const createCustomer = (data: ICustomer) => {
  const uri = "/auth";
  return instance.post(uri, data);
};
export const updateCustomer = (id: string | number, data: ICustomer) => {
  const uri = "/auth/" + id;
  return instance.put(uri, data);
};
export const getAllCustomer = (search: string) => {
  const uri = "/auth" + search;
  return instance.get(uri);
};
export const getByIdCustomer = (id: string | number) => {
  const uri = "/auth/" + id;
  return instance.get(uri);
};
// Xoá vĩnh viễn
export const deleteCustomer = (id: string | number) => {
  const uri = "/auth/" + id;
  return instance.delete(uri);
};
// Xoá vĩnh viễn all
export const deleteAllCustomer = (CustomerIds: string[]) => {
  const uri = "/customer/delete-forever";
  return instance.post(uri, CustomerIds);
};
//Cập nhập account status
export const updateAccountStatus = (CustomerIds: string, data: boolean) => {
  const uri = "/auth/update-status/" + CustomerIds;
  return instance.patch(uri, { status: data });
};
export const loginAccount = (data: ICustomer) => {
  const uri = "/auth/login";
  return instance.post(uri, data);
};
export const accountMe = () => {
  const uri = "/auth/me";
  return instance.post(uri);
};
export const logOut = () => {
  const uri = "/auth/logout";
  return instance.post(uri);
};
export const forgotPassWord = (newData: { user_name: string }) => {
  const uri = "/auth/forgot-password";
  return instance.post(uri, newData);
};
export const compareOTP = (newData: {
  userId: string;
  otp: string | number;
}) => {
  const uri = "/auth/compare-otp";
  return instance.post(uri, newData);
};
export const resetPassword = (newData: {
  userId: string;
  password: string | number;
}) => {
  const uri = "/auth/reset-password";
  return instance.patch(uri, newData);
};
export const changePassword = (newData: {
  password: string;
  newPassword: string;
}) => {
  const uri = "/auth/change-password";
  return instance.patch(uri, newData);
};
export const newPasswordAccountLink = (newData: { newPassword: string }) => {
  const uri = "/auth/newPasswordAccountLink";
  return instance.patch(uri, newData);
};
export const loginWithGoogleOrFacebook = (playload: ICustomer) => {
  const uri = "/auth/loginWithGoogleOrFacebook";
  return instance.post(uri, playload);
};
