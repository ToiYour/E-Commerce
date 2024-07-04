import { IColor } from "@/interfaces/color";
import instance from "@/config/instance";
export const createColor = (data: IColor) => {
  const uri = "/color";
  return instance.post(uri, data);
};
export const updateColor = (id: string | number, data: IColor) => {
  const uri = "/color/" + id;
  return instance.put(uri, data);
};
// Khôi phục
export const restoreColor = (id: string | number) => {
  const uri = "/color/" + id + "/restore";
  return instance.put(uri);
};
// Khôi phục
export const restoreAllColor = (ids: string[]) => {
  const uri = "/color/restore/all";
  return instance.put(uri, ids);
};
export const getAllColor = (search: string) => {
  const uri = "/color" + search;
  return instance.get(uri);
};
export const getAllColorSoft = (search: string) => {
  const uri = "/color/soft" + search;
  return instance.get(uri);
};
export const getByIdColor = (id: string | number) => {
  const uri = "/color/" + id;
  return instance.get(uri);
};
// Xoá mềm
export const deleteSoftColor = (id: string | number) => {
  const uri = "/color/" + id + "/soft";
  return instance.delete(uri);
};
// Xoá mềm all
export const deleteSoftAllColor = (colorIds: string[]) => {
  const uri = "/color/soft";
  return instance.post(uri, colorIds);
};
// Xoá vĩnh viễn
export const deleteColor = (id: string | number) => {
  const uri = "/color/" + id;
  return instance.delete(uri);
};
// Xoá vĩnh viễn all
export const deleteAllColor = (colorIds: string[]) => {
  const uri = "/color/delete-forever";
  return instance.post(uri, colorIds);
};
// Colors Combobox
export const getComboboxColors = () => {
  const uri = "/color/combobox";
  return instance.get(uri);
};
