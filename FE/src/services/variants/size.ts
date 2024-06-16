import { ISize } from "@/interfaces/size";
import instance from "@/config/instance";
export const createSize = (data: ISize) => {
  const uri = "/size";
  return instance.post(uri, data);
};
export const updateSize = (id: string | number, data: ISize) => {
  const uri = "/size/" + id;
  return instance.put(uri, data);
};
// Khôi phục
export const restoreSize = (id: string | number) => {
  const uri = "/size/" + id + "/restore";
  return instance.put(uri);
};
// Khôi phục
export const restoreAllSize = (ids: string[]) => {
  const uri = "/size/restore/all";
  return instance.put(uri, ids);
};
export const getAllSize = (search: string) => {
  const uri = "/size" + search;
  return instance.get(uri);
};
export const getAllSizeSoft = (search: string) => {
  const uri = "/size/soft" + search;
  return instance.get(uri);
};
export const getByIdSize = (id: string | number) => {
  const uri = "/size/" + id;
  return instance.get(uri);
};
// Xoá mềm
export const deleteSoftSize = (id: string | number) => {
  const uri = "/size/" + id + "/soft";
  return instance.delete(uri);
};
// Xoá mềm all
export const deleteSoftAllSize = (SizeIds: string[]) => {
  const uri = "/size/soft";
  return instance.post(uri, SizeIds);
};
// Xoá vĩnh viễn
export const deleteSize = (id: string | number) => {
  const uri = "/size/" + id;
  return instance.delete(uri);
};
// Xoá vĩnh viễn all
export const deleteAllSize = (SizeIds: string[]) => {
  const uri = "/size/delete-forever";
  return instance.post(uri, SizeIds);
};
// Colors Combobox
export const getComboboxSizes = () => {
  const uri = "/size/combobox";
  return instance.get(uri);
};
