import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { downloadExcel } from "react-export-table-to-excel";
import axios from "axios";
import { IVariant } from "@/interfaces/variant";
import { createVariant } from "@/api/variant";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatMoney = (value: number) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(value);
};
export const handleDownloadExcel = (
  header: string[],
  body: { [key: string]: string | number | boolean }[],
  fileName: string,
  sheet: string
) => {
  downloadExcel({
    fileName,
    sheet,
    tablePayload: {
      header,
      body,
    },
  });
};
export const upLoadFiles = async (files: { dataURL: string; file: File }[]) => {
  if (files) {
    const CLOUND_NAME = "dlzhmxsqp";
    const PRESET_NAME = "yhlsqnix";
    const FOLDER_NAME = "e_commerce";

    const api = `https://api.cloudinary.com/v1_1/${CLOUND_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    const urls: string[] = [];
    for (const file of files) {
      formData.append("file", file.file);
      const { data } = await axios.post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      urls.push(data.url);
    }
    return urls;
  }
};
export const upLoadVariants = async (data: IVariant[]) => {
  if (data) {
    const variantIds: string[] = [];
    for (const variant of data) {
      const { data } = await createVariant(variant);
      variantIds.push(data?.data._id);
    }
    return variantIds;
  }
};
