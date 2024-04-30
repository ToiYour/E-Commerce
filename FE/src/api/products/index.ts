import { IProduct } from "@/interfaces/product";
import instance from "../instance";
export const createProduct = (data: IProduct) => {
  const uri = "/product";
  return instance.post(uri, data);
};
export const getAllProduct = (search: string = "") => {
  const uri = "/product" + search;
  return instance.get(uri);
};
export const getDetailProduct = (id: string) => {
  const uri = "/product/detail/" + id;
  return instance.get(uri);
};
// Xoá mềm
export const deleteSoftProduct = (id: string | number) => {
  const uri = "/product/" + id + "/soft";
  return instance.delete(uri);
};
// Xoá mềm all
export const deleteSoftAllProduct = (ProductIds: string[]) => {
  const uri = "/product/soft";
  return instance.post(uri, ProductIds);
};
export const getAllProductSoft = (search: string) => {
  const uri = "/product/soft" + search;
  return instance.get(uri);
};
// Xoá vĩnh viễn
export const deleteProduct = (id: string | number) => {
  const uri = "/product/" + id;
  return instance.delete(uri);
};
// Xoá vĩnh viễn all
export const deleteAllProduct = (ProductIds: string[]) => {
  const uri = "/product/delete-forever";
  return instance.post(uri, ProductIds);
};
export const restoreProduct = (id: string | number) => {
  const uri = "/product/" + id + "/restore";
  return instance.put(uri);
};
// Khôi phục
export const restoreAllProduct = (ids: string[]) => {
  const uri = "/product/restore/all";
  return instance.put(uri, ids);
};
// Lấy dữ liệu sản phẩm update
export const getByIdUpdateProduct = (id: string | number) => {
  const uri = "/product/take-update/" + id;
  return instance.get(uri);
};
export const updateProduct = (id: string | number, data: IProduct) => {
  const uri = "/product/" + id;
  return instance.put(uri, data);
};
