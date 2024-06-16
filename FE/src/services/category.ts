import { ICategory } from "@/interfaces/category";
import instance from "@/config/instance";
export const createCategory = (data: ICategory) => {
  const uri = "/category";
  return instance.post(uri, data);
};
export const updateCategory = (id: string | number, data: ICategory) => {
  const uri = "/category/" + id;
  return instance.put(uri, data);
};
// Khôi phục
export const restoreCategory = (id: string | number) => {
  const uri = "/category/" + id + "/restore";
  return instance.put(uri);
};
// Khôi phục
export const restoreAllCategory = (ids: string[]) => {
  const uri = "/category/restore/all";
  return instance.put(uri, ids);
};
export const getAllCategory = (search: string) => {
  const uri = "/category" + search;
  return instance.get(uri);
};
export const getAllCategorySoft = (search: string) => {
  const uri = "/category/soft" + search;
  return instance.get(uri);
};
export const getByIdCategory = (id: string | number) => {
  const uri = "/category/" + id;
  return instance.get(uri);
};
// Xoá mềm
export const deleteSoftCategory = (id: string | number) => {
  const uri = "/category/" + id + "/soft";
  return instance.delete(uri);
};
// Xoá mềm all
export const deleteSoftAllCategory = (CategoryIds: string[]) => {
  const uri = "/category/soft";
  return instance.post(uri, CategoryIds);
};
// Xoá vĩnh viễn
export const deleteCategory = (id: string | number) => {
  const uri = "/category/" + id;
  return instance.delete(uri);
};
// Xoá vĩnh viễn all
export const deleteAllCategory = (CategoryIds: string[]) => {
  const uri = "/category/delete-forever";
  return instance.post(uri, CategoryIds);
};
// Colors Combobox
export const getComboboxCategory = () => {
  const uri = "/category/combobox";
  return instance.get(uri);
};
export const getBySlugCategory = (slug: string) => {
  const uri = "/category/by_slug/" + slug;
  return instance.get(uri);
};
