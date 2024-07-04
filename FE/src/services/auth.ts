import { ICustomer } from "@/interfaces/customer";
import instance from "@/config/instance";

export const loginUser = (data: ICustomer) => {
  const uri = "/auth/login";
  return instance.post(uri, data);
};
export const getAccountIsLoggedIn = () => {
  const uri = "/auth/accountIsLoggedIn";
  return instance.get(uri);
};
export const refreshToken = () => {
  const uri = "/auth/refreshToken";
  return instance.post(uri);
};
export const logOutAccount = () => {
  const uri = "/auth/logOutAccount";
  return instance.delete(uri);
};
export const changeProfileInformation = (payload: ICustomer) => {
  const uri = "/auth/changeProfileInformation";
  return instance.post(uri, payload);
};
export const signInWithGoogleAndFacebook = (payload: ICustomer) => {
  const uri = "/auth/signInWithGoogleAndFacebook";
  return instance.post(uri, payload);
};
export interface IChangePassword {
  oldPassword?: string;
  password: string;
  confirmPassword: string;
}
export const changePassword = (payload: IChangePassword) => {
  const uri = "/auth/changePassword";
  return instance.patch(uri, payload);
};
export const setAPasswordForTheLinkedAccount = (payload: IChangePassword) => {
  const uri = "/auth/setAPasswordForTheLinkedAccount";
  return instance.patch(uri, payload);
};
